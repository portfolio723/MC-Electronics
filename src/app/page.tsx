import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Refrigerator, Zap, Home as HomeIcon, Tv } from 'lucide-react';
import { categories, products } from '@/lib/data';
import { ProductCard } from '@/components/product-card';

export default function Home() {
  const categoryIcons: { [key: string]: React.ElementType } = {
    'large-appliances': Refrigerator,
    'small-appliances': Zap,
    'smart-home': HomeIcon,
    'entertainment': Tv,
  };

  const featuredProducts = products.slice(0, 4);

  return (
    <div className="space-y-12 md:space-y-16 lg:space-y-20">
      <section className="relative h-[60vh] min-h-[400px] w-full bg-gradient-to-r from-primary/80 to-primary">
        <div className="container mx-auto flex h-full flex-col items-center justify-center text-center text-primary-foreground">
          <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Upgrade Your Home
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl">
            Best Deals on Premium Home Appliances and Electronics!
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/products/all">Shop Now</Link>
          </Button>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6">
        <h2 className="font-headline text-center text-3xl font-bold tracking-tight">
          Featured Categories
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {categories.map((category) => {
            const Icon = categoryIcons[category.slug] || Refrigerator;
            return (
              <Link key={category.id} href={`/products/${category.slug}`}>
                <Card className="group flex h-full transform flex-col items-center justify-center p-6 text-center transition-transform duration-300 hover:scale-105 hover:bg-secondary">
                  <CardContent className="p-0">
                    <Icon className="mb-4 h-12 w-12 text-primary transition-colors group-hover:text-accent" />
                    <h3 className="font-headline text-lg font-semibold">{category.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6">
        <h2 className="font-headline text-center text-3xl font-bold tracking-tight">
          Top-Selling Products
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4 text-center md:px-6">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-secondary-foreground">
            Festive Sale – Up to 40% Off!
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Don't miss out on our limited-time offers. Perfect gifts for every home.
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/products/all">Explore Deals</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
