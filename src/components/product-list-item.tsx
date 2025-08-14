
'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, Share2 } from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { useWishlist } from '@/hooks/use-wishlist';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';

interface ProductListItemProps {
  product: Product;
}

export function ProductListItem({ product }: ProductListItemProps) {
    const originalPrice = product.price * 1.2; // Assuming a 20% markup for display
    const discount = Math.round(((originalPrice - product.price) / originalPrice) * 100);

    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const { checkAuthAndExecute } = useAuth();
    const inWishlist = isInWishlist(product.id);

    const handleWishlistClick = () => {
        checkAuthAndExecute(() => {
            if (inWishlist) {
                removeFromWishlist(product.id);
            } else {
                addToWishlist(product);
            }
        });
    };

  return (
    <Card className="flex w-full flex-col items-center gap-4 p-4 transition-shadow duration-300 hover:shadow-lg md:flex-row">
        <Link href={`/product/${product.id}`} className="block w-full flex-shrink-0 md:w-48">
            <Image
                src={product.image}
                alt={product.name}
                width={200}
                height={200}
                className="aspect-square w-full rounded-md object-contain"
            />
        </Link>
      <div className="flex-1">
        <h3 className="text-lg font-semibold leading-tight">
          <Link href={`/product/${product.id}`} className="hover:text-primary">
            {product.name}
          </Link>
        </h3>
        <div className="mt-2 flex items-center gap-4">
            <div className="flex items-center space-x-2">
                <Checkbox id={`compare-${product.id}`} />
                <Label htmlFor={`compare-${product.id}`} className="text-sm font-medium">Add to Compare</Label>
            </div>
            <Button variant="ghost" size="icon">
                <Share2 className="h-5 w-5" />
            </Button>
        </div>

        <div className="mt-4 flex items-baseline gap-2">
          <p className="text-2xl font-bold text-primary">₹{product.price.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground line-through">₹{originalPrice.toLocaleString()}</p>
          <p className="text-sm font-semibold text-green-600">{discount}% Off</p>
        </div>
        <div className="mt-2">
            <p className="text-xs text-muted-foreground">EMI options available</p>
        </div>
      </div>
      <div className="flex w-full flex-col items-end justify-between md:w-auto">
         <Button variant="ghost" size="icon" onClick={handleWishlistClick}>
            <Heart className={cn("h-6 w-6", inWishlist && "fill-destructive text-destructive")} />
         </Button>
      </div>
    </Card>
  );
}
