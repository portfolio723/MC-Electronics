
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { products, categories } from '@/lib/data';
import type { Product, Category } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"


interface SearchResult {
  products: Product[];
  categories: Category[];
  brands: string[];
}

const SearchInput = ({ query, onQueryChange, onFocus, isMobile = false } : { query: string, onQueryChange: (q: string) => void, onFocus: () => void, isMobile?: boolean}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isMobile && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isMobile]);

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        ref={inputRef}
        type="search"
        placeholder="Search for products, brands..."
        className="w-full rounded-full bg-slate-100 pl-9 focus:bg-background focus:ring-2 focus:ring-primary"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        onFocus={onFocus}
      />
    </div>
  );
};


const SearchResultsDropdown = ({ results, query }: { results: SearchResult, query: string }) => {
  const hasResults = results.products.length > 0 || results.categories.length > 0 || results.brands.length > 0;
  if (!query || !hasResults) return null;

  return (
    <div className="absolute top-full mt-2 w-full rounded-md border bg-background shadow-lg z-50 max-h-[70vh] overflow-y-auto">
      {results.products.length > 0 && (
        <div className="p-2">
          <h4 className="px-2 py-1 text-xs font-semibold text-muted-foreground">Products</h4>
          <ul>
            {results.products.map(product => (
              <li key={product.id}>
                <Link href={`/product/${product.id}`} className="flex items-center gap-4 rounded-md p-2 hover:bg-secondary">
                  <Image src={product.image} alt={product.name} width={40} height={40} className="rounded" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{product.name}</p>
                    <p className="text-sm text-primary">${product.price.toFixed(2)}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {results.categories.length > 0 && (
        <div className="p-2">
          <h4 className="px-2 py-1 text-xs font-semibold text-muted-foreground">Categories</h4>
           <ul>
            {results.categories.map(cat => (
              <li key={cat.id}>
                <Link href={`/products/${cat.slug}`} className="block rounded-md p-2 text-sm hover:bg-secondary">
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {results.brands.length > 0 && (
        <div className="p-2">
          <h4 className="px-2 py-1 text-xs font-semibold text-muted-foreground">Brands</h4>
          <ul>
            {results.brands.map(brand => (
              <li key={brand}>
                <Link href={`/products/all?brands=${brand}`} className="block rounded-md p-2 text-sm hover:bg-secondary">
                  {brand}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}


export function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult>({ products: [], categories: [], brands: [] });
  const [isFocused, setIsFocused] = useState(false);
  const [isMobileModalOpen, setMobileModalOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setQuery('');
    setIsFocused(false);
    setMobileModalOpen(false);
  }, [pathname]);

  const performSearch = useCallback((currentQuery: string) => {
    if (currentQuery.length < 2) {
      setResults({ products: [], categories: [], brands: [] });
      return;
    }

    const lowerCaseQuery = currentQuery.toLowerCase();
    
    const filteredProducts = products
      .filter(p => 
        p.name.toLowerCase().includes(lowerCaseQuery) || 
        p.description.toLowerCase().includes(lowerCaseQuery)
      )
      .slice(0, 5);
      
    const filteredCategories = categories
      .filter(c => c.name.toLowerCase().includes(lowerCaseQuery) && c.parent)
      .slice(0, 3);
      
    const filteredBrands = [...new Set(products
      .filter(p => p.brand.toLowerCase().includes(lowerCaseQuery))
      .map(p => p.brand))]
      .slice(0, 3);

    setResults({ products: filteredProducts, categories: filteredCategories, brands: filteredBrands });
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query) {
        performSearch(query);
      } else {
        setResults({ products: [], categories: [], brands: [] });
      }
    }, 200);

    return () => {
      clearTimeout(handler);
    };
  }, [query, performSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const SearchContainer = ({ isMobile = false } : { isMobile?: boolean }) => (
    <div className="relative w-full" ref={isMobile ? null : searchRef}>
      <SearchInput 
        query={query} 
        onQueryChange={setQuery} 
        onFocus={() => setIsFocused(true)}
        isMobile={isMobile}
      />
      {isFocused && !isMobile && <SearchResultsDropdown results={results} query={query} />}
      {isMobile && <SearchResultsDropdown results={results} query={query} />}
    </div>
  );

  return (
    <>
      {/* Desktop Search */}
      <div className="hidden md:block w-full">
        <div ref={searchRef}>
          <SearchContainer />
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden">
        <Dialog open={isMobileModalOpen} onOpenChange={setMobileModalOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Search className="h-5 w-5" />
                    <span className="sr-only">Search</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="p-4 top-0 translate-y-0 sm:top-[10%] sm:-translate-y-[10%] h-auto max-h-[80vh] overflow-y-auto">
                 <SearchContainer isMobile={true} />
            </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
