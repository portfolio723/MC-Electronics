'use client';

import { useState } from 'react';
import type { Product } from '@/lib/types';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ProductDetailsClientProps {
    product: Product;
}

export function ProductDetailsClient({ product }: ProductDetailsClientProps) {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    const handleQuantityChange = (change: number) => {
        setQuantity(prev => {
            const newQuantity = prev + change;
            if (newQuantity < 1) return 1;
            if (newQuantity > product.stock) return product.stock;
            return newQuantity;
        });
    }

    return (
        <div className="grid gap-4">
            <div className="flex items-center gap-4">
                <div className="grid w-28 gap-1">
                    <Label htmlFor="quantity">Quantity</Label>
                    <div className="flex items-center">
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(-1)}>-</Button>
                        <Input id="quantity" type="number" value={quantity} readOnly className="h-8 w-12 border-0 bg-transparent text-center focus-visible:ring-0" />
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(1)}>+</Button>
                    </div>
                </div>
            </div>
            <div className="flex gap-4">
                <Button size="lg" className="flex-1" onClick={() => addToCart(product, quantity)}>
                    Add to Cart
                </Button>
                <Button size="lg" variant="outline" className="flex-1">
                    Buy Now
                </Button>
            </div>
        </div>
    );
}
