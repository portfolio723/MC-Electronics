
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Refrigerator, Zap, HomeIcon, Tv, Award, ShieldCheck, Truck } from 'lucide-react';
import { categories, products } from '@/lib/data';
import { ProductCard } from '@/components/product-card';
import { FlashSaleCountdown } from '@/components/flash-sale-countdown';

export default function Home() {
  const categoryInfo: { [key: string]: { icon: React.ElementType, description: string } } = {
    'large-appliances': { icon: Refrigerator, description: 'Refrigerators, washing machines, and more to power your home.'},
    'small-appliances': { icon: Zap, description: 'Kitchen gadgets and home helpers for everyday convenience.' },
    'smart-home': { icon: HomeIcon, description: 'Automate your life with intelligent, connected devices.' },
    'entertainment': { icon: Tv, description: 'Build your ultimate home theater with our TVs and sound systems.' },
  };

  const featuredProducts = products.slice(0, 4);
  const mainCategories = categories.filter(c => !c.parent && c.slug !== 'offers');
  const brands = [...new Set(products.map(p => p.brand))].slice(0, 6);
  
  // Set a future date for the flash sale countdown
  const saleEndDate = new Date();
  saleEndDate.setDate(saleEndDate.getDate() + 3);

  const shopByNeed = [
    {
      title: 'Kitchen Essentials',
      href: '/products/small-appliances',
      image: 'https://images.unsplash.com/photo-1600585152225-3579fe9d7ae2?q=80&w=2070&auto=format&fit=crop',
      hint: 'modern kitchen',
    },
    {
      title: 'Smart Home Upgrade',
      href: '/products/smart-home',
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2070&auto=format&fit=crop',
      hint: 'smart home technology',
    },
    {
      title: 'Entertainment Hub',
      href: '/products/entertainment',
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=2070&auto=format&fit=crop',
      hint: 'living room entertainment',
    },
  ];


  return (
    <div className="space-y-12 md:space-y-16 lg:space-y-20">
      <section className="relative h-[60vh] min-h-[400px] w-full bg-gradient-to-r from-primary/80 to-primary">
        <div className="container mx-auto flex h-full flex-col items-center justify-center text-center text-primary-foreground">
          <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Smart Living, Made Simple
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
          {mainCategories.map((category) => {
            const info = categoryInfo[category.slug];
            const Icon = info?.icon || Refrigerator;
            return (
              <Link key={category.id} href={`/products/${category.slug}`}>
                <Card className="group flex h-full transform flex-col items-center justify-center p-6 text-center transition-transform duration-300 hover:scale-105 hover:bg-secondary">
                  <CardContent className="p-0 flex flex-col items-center">
                    <Icon className="mb-4 h-12 w-12 text-primary transition-colors group-hover:text-accent" />
                    <h3 className="font-headline text-lg font-semibold">{category.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{info?.description}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
      
      <section className="container mx-auto px-4 md:px-6">
        <h2 className="font-headline text-center text-3xl font-bold tracking-tight">
          Shop by Need
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shopByNeed.map((need) => (
            <Link key={need.title} href={need.href}>
              <Card className="group overflow-hidden rounded-lg">
                <div className="relative h-64 w-full">
                  <Image
                    src={need.image}
                    alt={need.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={need.hint}
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="font-headline text-2xl font-bold text-white">
                      {need.title}
                    </h3>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
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

       <section className="container mx-auto px-4 md:px-6">
        <h2 className="font-headline text-center text-3xl font-bold tracking-tight">
          Shop By Brand
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {brands.map((brand) => (
             <Link key={brand} href={`/products/all?brands=${brand}`}>
                <Card className="group flex h-24 items-center justify-center p-4 transition-all duration-300 hover:bg-accent hover:text-accent-foreground">
                    <span className="font-headline text-xl font-semibold text-muted-foreground group-hover:text-accent-foreground">{brand}</span>
                </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-accent py-16">
        <div className="container mx-auto px-4 text-center md:px-6">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-accent-foreground">
            Festive Sale – Up to 40% Off!
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-accent-foreground/90">
            Don't miss out on our limited-time offers. Perfect gifts for every home.
          </p>
          <FlashSaleCountdown targetDate={saleEndDate.toISOString()} />
          <Button asChild size="lg" className="mt-8 bg-background text-foreground hover:bg-background/90">
            <Link href="/products/all?filter=offers">Explore Deals</Link>
          </Button>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <h2 className="font-headline text-center text-3xl font-bold tracking-tight">
          Why Shop With Us?
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-8 text-center md:grid-cols-3">
            <div className="flex flex-col items-center">
                <Award className="mb-4 h-12 w-12 text-accent"/>
                <h3 className="font-headline text-xl font-semibold">Quality Assured</h3>
                <p className="mt-2 text-muted-foreground">We only source the highest quality appliances from trusted brands.</p>
            </div>
            <div className="flex flex-col items-center">
                <Truck className="mb-4 h-12 w-12 text-accent"/>
                <h3 className="font-headline text-xl font-semibold">Fast & Free Shipping</h3>
                <p className="mt-2 text-muted-foreground">Enjoy fast and free delivery on all major appliances, right to your doorstep.</p>
            </div>
            <div className="flex flex-col items-center">
                <ShieldCheck className="mb-4 h-12 w-12 text-accent"/>
                <h3 className="font-headline text-xl font-semibold">Guaranteed Warranty</h3>
                <p className="mt-2 text-muted-foreground">Every product comes with a comprehensive manufacturer's warranty.</p>
            </div>
        </div>
      </section>
    </div>
  );
}
