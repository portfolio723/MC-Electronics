
import { products, categories } from '@/lib/data';
import { ProductFilters } from '@/components/product-filters';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const allCategories = categories.map((c) => ({
    categorySlug: c.slug,
  }));
  
  // Add the 'all' products page
  allCategories.push({ categorySlug: 'all' });

  return allCategories;
}

export default function CategoryPage({ params }: { params: { categorySlug: string } }) {
  const { categorySlug } = params;

  const category = categories.find((c) => c.slug === categorySlug);
  const subcategories = categories.filter(c => c.parent === categorySlug);

  const initialProducts = (() => {
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
    const prods = products.filter((p) => p.category === categorySlug);
    if (!category && prods.length === 0) {
        notFound();
    }
    return prods;
  })();

  const pageTitle = category?.name || "All Products";

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <header className="mb-8">
        <h1 className="font-headline text-4xl font-bold tracking-tight">
          {pageTitle}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Browse and find the perfect appliance for your home.
        </p>
      </header>
      <ProductFilters initialProducts={initialProducts} />
    </div>
  );
}
