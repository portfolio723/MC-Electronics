
'use client';

import { useMemo } from 'react';
import { products, categories } from '@/lib/data';
import { ProductFilters } from '@/components/product-filters';
import { useSearchParams, useParams } from 'next/navigation';
import type { Category } from '@/lib/types';

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.categorySlug as string;
  const searchParams = useSearchParams();

  const category = useMemo(() => categories.find((c) => c.slug === categorySlug), [categorySlug]);
  const subcategories = useMemo(() => categories.filter(c => c.parent === categorySlug), [categorySlug]);
  
  const initialProducts = useMemo(() => {
    // Handle special "offers" filter
    if (searchParams.get('filter') === 'offers') {
        // This is just an example. You'd likely have a specific flag on products for offers.
        // For now, let's return a random slice of products.
        return [...products].sort(() => 0.5 - Math.random()).slice(0, 10);
    }
      
    // Handle brand filter from search
    const brandQuery = searchParams.get('brands');
    if (brandQuery) {
        return products.filter(p => p.brand.toLowerCase() === brandQuery.toLowerCase());
    }

    if (categorySlug === 'all') {
      return products;
    }
    // If it's a parent category, get all products from its subcategories
    if (subcategories.length > 0) {
        const subcategorySlugs = subcategories.map(s => s.slug);
        return products.filter(p => {
            const productCategory = categories.find(c => c.slug === p.category);
            return productCategory?.parent === categorySlug || subcategorySlugs.includes(p.category);
        });
    }
    // It's a subcategory
    return products.filter((p) => p.category === categorySlug);
  }, [categorySlug, subcategories, searchParams]);

  const getPageTitle = () => {
    if (searchParams.get('filter') === 'offers') return "Special Offers";
    const brandQuery = searchParams.get('brands');
    if (brandQuery) return `Products by ${brandQuery}`;
    return category?.name || "All Products";
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <header className="mb-8">
        <h1 className="font-headline text-4xl font-bold tracking-tight">
          {getPageTitle()}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Browse and find the perfect appliance for your home.
        </p>
      </header>
      <ProductFilters initialProducts={initialProducts} />
    </div>
  );
}
