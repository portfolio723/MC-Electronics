'use client';

import { useState, useMemo } from 'react';
import { products, categories } from '@/lib/data';
import type { Product } from '@/lib/types';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PageProps {
  params: { categorySlug: string };
}

export default function CategoryPage({ params }: PageProps) {
  const { categorySlug } = params;

  const category = categories.find((c) => c.slug === categorySlug) || { name: 'All Products' };

  const initialProducts =
    categorySlug === 'all'
      ? products
      : products.filter((p) => p.category === categorySlug);

  const [sortOption, setSortOption] = useState('popularity');
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  const availableBrands = useMemo(
    () => [...new Set(initialProducts.map((p) => p.brand))],
    [initialProducts]
  );

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRatings((prev) =>
      prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]
    );
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = initialProducts.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) => selectedBrands.includes(product.brand));
    }

    if (selectedRatings.length > 0) {
      filtered = filtered.filter((product) => selectedRatings.some(r => product.rating >= r));
    }

    switch (sortOption) {
      case 'price-asc':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return filtered.sort((a, b) => b.price - a.price);
      case 'latest':
        return filtered; // Assuming original order is latest
      case 'popularity':
      default:
        return filtered.sort((a, b) => b.rating - a.rating);
    }
  }, [initialProducts, priceRange, selectedBrands, selectedRatings, sortOption]);

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <header className="mb-8">
        <h1 className="font-headline text-4xl font-bold tracking-tight">
          {category.name}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Browse and find the perfect appliance for your home.
        </p>
      </header>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <aside className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-headline text-lg font-semibold">Filters</h3>
              <div className="mt-6 space-y-6">
                <div>
                  <Label className="font-semibold">Price Range</Label>
                  <Slider
                    min={0}
                    max={1500}
                    step={50}
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value)}
                    className="mt-4"
                  />
                  <div className="mt-2 flex justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold">Brand</h4>
                  <div className="mt-4 space-y-2">
                    {availableBrands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                          id={`brand-${brand}`}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={() => handleBrandChange(brand)}
                        />
                        <Label htmlFor={`brand-${brand}`}>{brand}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold">Rating</h4>
                  <div className="mt-4 space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox
                          id={`rating-${rating}`}
                          checked={selectedRatings.includes(rating)}
                          onCheckedChange={() => handleRatingChange(rating)}
                        />
                        <Label htmlFor={`rating-${rating}`}>{rating} & Up</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>

        <main className="lg:col-span-3">
          <div className="flex items-center justify-between rounded-lg bg-secondary p-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredAndSortedProducts.length} of {initialProducts.length} products
            </p>
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Popularity</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="latest">Latest</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {filteredAndSortedProducts.length === 0 && (
             <div className="mt-10 text-center">
                <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
              </div>
          )}
        </main>
      </div>
    </div>
  );
}
