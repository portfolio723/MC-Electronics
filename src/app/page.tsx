
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Refrigerator, Zap, HomeIcon, Tv, Award, ShieldCheck, Truck } from 'lucide-react';
import { categories, products } from '@/lib/data';
import { ProductCard } from '@/components/product-card';
import { FlashSaleCountdown } from '@/components/flash-sale-countdown';

const BrandLogos: React.FC<{ brand: string }> = ({ brand }) => {
    const logos: { [key: string]: React.ReactNode } = {
        Samsung: <svg className="h-8 w-auto text-muted-foreground group-hover:text-accent-foreground" viewBox="0 0 128 128" fill="currentColor"><path d="M119.53,82.88a10.8,10.8,0,0,0,8.1-10.27V55.4a10.8,10.8,0,0,0-8.1-10.27L93.6,39.11,85.29,19a10.74,10.74,0,0,0-9.89-6.68H52.6a10.74,10.74,0,0,0-9.89,6.68L34.4,39.11,8.47,45.13a10.8,10.8,0,0,0-8.1,10.27V72.61a10.8,10.8,0,0,0,8.1,10.27L34.4,88.9,42.71,109a10.74,10.74,0,0,0,9.89,6.68H85.4a10.74,10.74,0,0,0,9.89-6.68L103.6,88.9ZM60,78.36a3.83,3.83,0,0,1-3.13-1.89L44.25,57.19a3.84,3.84,0,0,1,.87-4.66L58,42.33a3.83,3.83,0,0,1,4.91-.42l11.4,8.19L60,78.36Zm29.47-5.32L78.07,64.85l23.51,3.48a3.8,3.8,0,0,1,3.28,4.24l-2.47,14.3a3.82,3.82,0,0,1-4.24,3.27L74.8,86.66,89.43,73Zm-34-31L66.82,34.4,51.65,24.16a3.84,3.84,0,0,1-1.74-5l4.3-10.14a3.84,3.84,0,0,1,4.9-2.31l12.59,4.3,2.4,14.47-24,16.59a3.83,3.83,0,0,1-4.66.87Z"/></svg>,
        LG: <svg className="h-12 w-auto text-muted-foreground group-hover:text-accent-foreground" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2.5-11.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm5 0c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM12 14c-2.33 0-4.32 1.45-5.12 3.5h10.24c-.8-2.05-2.79-3.5-5.12-3.5z"/></svg>,
        Philips: <svg className="h-8 w-auto text-muted-foreground group-hover:text-accent-foreground" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM8.5 8.5h7v2h-7zm0 3h7v2h-7zm0 3h7v2h-7z"/></svg>,
        Kent: <svg className="h-8 w-auto text-muted-foreground group-hover:text-accent-foreground" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.71 14.71L12 12.41l-4.71 4.3-1.42-1.42L10.59 11 6.29 6.71l1.42-1.42L12 9.59l4.29-4.3 1.42 1.42L13.41 11l4.3 4.29-1.42 1.42z"/></svg>,
        Sony: <svg className="h-8 w-auto text-muted-foreground group-hover:text-accent-foreground" viewBox="0 0 24 24" fill="currentColor"><path d="M4.6,18.4V5.6h14.8v12.8H4.6z M5.6,6.6v10.8h12.8V6.6H5.6z M8,15h8v-2H8V15z M8,11h8V9H8V11z"/></svg>,
        boAt: <svg className="h-8 w-auto text-muted-foreground group-hover:text-accent-foreground" viewBox="0 0 24 24" fill="currentColor"><path d="M21.9,11.2c-0.6-2.9-2.7-5-5.4-5.7C15.1,5,13.6,4.5,12,4.5s-3.1,0.5-4.5,1c-2.7,0.7-4.8,2.8-5.4,5.7 c-0.2,0.8-0.2,1.7,0,2.5c0.6,2.9,2.7,5,5.4,5.7c1.4,0.5,2.9,1,4.5,1s3.1-0.5,4.5-1c2.7-0.7,4.8-2.8,5.4-5.7 C22.1,12.9,22.1,12.1,21.9,11.2z M12,17.5c-3,0-5.5-2.5-5.5-5.5S9,6.5,12,6.5s5.5,2.5,5.5,5.5S15,17.5,12,17.5z M12,8.5 c-2,0-3.5,1.6-3.5,3.5s1.6,3.5,3.5,3.5s3.5-1.6,3.5-3.5S14,8.5,12,8.5z"/></svg>,
    };
    return logos[brand] || <span className="font-headline text-xl font-semibold text-muted-foreground group-hover:text-accent-foreground">{brand}</span>;
}

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
                    fill
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
                    <BrandLogos brand={brand} />
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
