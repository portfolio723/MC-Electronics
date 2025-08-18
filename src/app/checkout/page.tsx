
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';

const shippingFormSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  zip: z.string().min(5, 'Valid ZIP code is required'),
});

const paymentFormSchema = z.object({
    cardName: z.string().min(2, 'Name on card is required'),
    cardNumber: z.string().length(16, 'Card number must be 16 digits'),
    cardExpiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid expiry date (MM/YY)'),
    cardCvc: z.string().length(3, 'CVC must be 3 digits'),
});

const checkoutFormSchema = shippingFormSchema.merge(paymentFormSchema);


export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { isLoggedIn } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  const form = useForm<z.infer<typeof checkoutFormSchema>>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      name: '', email: '', address: '', city: '', zip: '',
      cardName: '', cardNumber: '', cardExpiry: '', cardCvc: '',
    },
  });

  const onSubmit = (values: z.infer<typeof checkoutFormSchema>) => {
    console.log('Order placed:', values);
    toast({
      title: 'Order Successful!',
      description: 'Thank you for your purchase. Your order is being processed.',
    });
    clearCart();
    router.push('/');
  };

  if (!isClient) {
    return null; // or a loading spinner
  }

  if (cartItems.length === 0) {
    return (
        <div className="container mx-auto px-4 py-8 text-center md:px-6 md:py-12">
            <h1 className="font-headline text-3xl font-bold">Checkout</h1>
            <p className="mt-4 text-muted-foreground">Your cart is empty. Please add items before checking out.</p>
            <Button asChild className="mt-6"><Link href="/">Return to Shop</Link></Button>
        </div>
    )
  }

  const renderGuestAuthStep = () => (
    <Card className="mx-auto max-w-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Checkout</CardTitle>
        <CardDescription>Please sign in to continue.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button className="w-full" onClick={() => router.push('/login?redirect=/checkout')}>Login</Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or</span>
          </div>
        </div>
        <Button variant="outline" className="w-full" onClick={() => router.push('/register?redirect=/checkout')}>Create Account</Button>
      </CardContent>
    </Card>
  );


  const renderShippingAndPayment = () => (
     <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="address" render={({ field }) => (
                    <FormItem><FormLabel>Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <div className="flex gap-4">
                    <FormField control={form.control} name="city" render={({ field }) => (
                        <FormItem className="flex-1"><FormLabel>City</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="zip" render={({ field }) => (
                        <FormItem className="w-1/3"><FormLabel>ZIP Code</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Payment Details</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <FormField control={form.control} name="cardName" render={({ field }) => (
                    <FormItem><FormLabel>Name on Card</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="cardNumber" render={({ field }) => (
                    <FormItem><FormLabel>Card Number</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                 <div className="flex gap-4">
                    <FormField control={form.control} name="cardExpiry" render={({ field }) => (
                        <FormItem className="flex-1"><FormLabel>Expiry (MM/YY)</FormLabel><FormControl><Input placeholder="MM/YY" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="cardCvc" render={({ field }) => (
                        <FormItem className="w-1/3"><FormLabel>CVC</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                </div>
              </CardContent>
            </Card>

            <Button type="submit" size="lg" className="w-full">Place Order</Button>
          </form>
        </Form>
        
        <div>
            <Card>
              <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.name} x {item.quantity}</span>
                        <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                ))}
                 <div className="flex justify-between border-t pt-4 font-bold text-lg">
                  <span>Total</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
        </div>
      </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      {!isLoggedIn && (
        <div className="mb-8">
            {renderGuestAuthStep()}
        </div>
      )}
      {isLoggedIn && (
        <>
            <h1 className="mb-8 font-headline text-3xl font-bold md:text-4xl text-center">Checkout</h1>
            {renderShippingAndPayment()}
        </>
      )}
    </div>
  );
}
