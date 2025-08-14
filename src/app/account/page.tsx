
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useWishlist } from '@/hooks/use-wishlist';
import { ProductCard } from '@/components/product-card';

export default function AccountPage() {
  const { wishlistItems } = useWishlist();

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <h1 className="mb-8 font-headline text-3xl font-bold md:text-4xl">My Account</h1>
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>User Profile</CardTitle>
              <CardDescription>Manage your personal information.</CardDescription>
            </CardHeader>
            <CardContent>
              <p><strong>Name:</strong> John Doe</p>
              <p><strong>Email:</strong> john.doe@example.com</p>
              <Button variant="outline" className="mt-4 w-full">Edit Profile</Button>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>View your past orders and their status.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">You have no recent orders.</p>
            </CardContent>
          </Card>
          <Separator className="my-8" />
          <Card>
            <CardHeader>
              <CardTitle>Wishlist</CardTitle>
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
           <Separator className="my-8" />
          <Card>
            <CardHeader>
              <CardTitle>Manage Addresses</CardTitle>
              <CardDescription>Update your shipping addresses.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">No addresses saved.</p>
                <Button className="mt-4">Add New Address</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
