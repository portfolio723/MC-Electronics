'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, StarHalf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Product } from '@/lib/types';
import { useCart } from '@/hooks/use-cart';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
      <div className="flex items-center">
        {Array(fullStars).fill(0).map((_, i) => (
            <Star key={`full-${i}`} className="h-4 w-4 fill-accent text-accent" />
        ))}
        {halfStar && <StarHalf className="h-4 w-4 fill-accent text-accent" />}
        {Array(emptyStars).fill(0).map((_, i) => (
            <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
        ))}
         <span className="ml-2 text-xs text-muted-foreground">({rating})</span>
      </div>
    );
  };

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        <Link href={`/product/${product.id}`} className="block">
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
            data-ai-hint={`${product.category.split('-')[0] ?? ''} ${product.category.split('-')[1] ?? ''}`}
          />
        </Link>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <p className="text-sm text-muted-foreground">{product.brand}</p>
        <CardTitle className="mt-1 text-lg leading-tight">
          <Link href={`/product/${product.id}`} className="hover:text-primary">
            {product.name}
          </Link>
        </CardTitle>
        <div className="mt-2 flex items-center justify-between">
            <p className="text-xl font-bold text-primary">${product.price.toFixed(2)}</p>
            {renderStars(product.rating)}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={() => addToCart(product)}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
