
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useWishlist } from '@/hooks/use-wishlist';
import { ProductCard } from '@/components/product-card';

export default function AccountPage() {
  const { wishlistItems } = useWishlist();

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="mx-auto max-w-5xl">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-3xl font-bold md:text-4xl">My Wishlist</CardTitle>
              <CardDescription>Your saved items for later.</CardDescription>
            </CardHeader>
            <CardContent>
                {wishlistItems.length === 0 ? (
                    <p className="text-muted-foreground">Your wishlist is empty.</p>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {wishlistItems.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </CardContent>
          </Card>
        </div>
    </div>
  );
}
