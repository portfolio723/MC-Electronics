import Image from 'next/image';
import { notFound } from 'next/navigation';
import { products } from '@/lib/data';
import { Star, StarHalf, ShieldCheck, Truck, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductDetailsClient } from '@/components/product-details-client';
import SimilarProducts from '@/components/similar-products';

interface PageProps {
  params: { productId: string };
}

const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
      <div className="flex items-center gap-1">
        {Array(fullStars).fill(0).map((_, i) => (
            <Star key={`full-${i}`} className="h-5 w-5 fill-accent text-accent" />
        ))}
        {halfStar && <StarHalf className="h-5 w-5 fill-accent text-accent" />}
        {Array(emptyStars).fill(0).map((_, i) => (
            <Star key={`empty-${i}`} className="h-5 w-5 text-gray-300" />
        ))}
         <span className="ml-2 text-sm text-muted-foreground">({rating} rating)</span>
      </div>
    );
};

export default function ProductPage({ params }: PageProps) {
  const product = products.find((p) => p.id === params.productId);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
        <div className="grid gap-4">
            <Image
              src={product.image}
              alt={product.name}
              width={800}
              height={800}
              className="aspect-square w-full rounded-lg border object-cover"
              data-ai-hint={`${product.category.split('-')[0] ?? ''} ${product.category.split('-')[1] ?? ''}`}
            />
            <div className="hidden grid-cols-4 gap-4 md:grid">
                {product.images.slice(0,4).map((img, i) => (
                    <button key={i} className="overflow-hidden rounded-lg border-2 border-transparent hover:border-primary">
                        <Image src={img} alt={`${product.name} view ${i+1}`} width={200} height={200} className="aspect-square w-full object-cover" />
                    </button>
                ))}
            </div>
        </div>

        <div className="grid gap-4">
            <div>
                <Badge variant="outline">{product.brand}</Badge>
                <h1 className="mt-2 font-headline text-3xl font-bold lg:text-4xl">{product.name}</h1>
                <div className="mt-2 flex items-center gap-4">
                    {renderStars(product.rating)}
                </div>
            </div>
            
            <p className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</p>

            <ProductDetailsClient product={product} />
            
            <div className="mt-4 grid gap-3 text-sm">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-green-600" />
                    <span>{product.warranty}</span>
                </div>
                 <div className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-blue-600" />
                    <span>Free Shipping & Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-orange-600" />
                    <span>In Stock: {product.stock > 0 ? `${product.stock} items left` : 'Out of Stock'}</span>
                </div>
            </div>
        </div>
      </div>
      
      <div className="mt-12">
        <Tabs defaultValue="description">
            <TabsList>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specs">Specifications</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4 text-muted-foreground">{product.description}</TabsContent>
            <TabsContent value="specs" className="mt-4">
                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                    {Object.entries(product.specs).map(([key, value]) => (
                        <li key={key}><strong>{key}:</strong> {value}</li>
                    ))}
                </ul>
            </TabsContent>
             <TabsContent value="features" className="mt-4">
                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                    {product.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                    ))}
                </ul>
            </TabsContent>
        </Tabs>
      </div>

      <div className="mt-16">
        <h2 className="font-headline text-2xl font-bold tracking-tight md:text-3xl">You Might Also Like</h2>
        <SimilarProducts productDescription={product.description} />
      </div>
    </div>
  );
}
