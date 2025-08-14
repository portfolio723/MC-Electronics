"use client";

import Link from 'next/link';
import {
  Menu,
  Refrigerator,
  Search,
  ShoppingCart,
  User,
  Zap,
  Home,
  Tv,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCart } from '@/hooks/use-cart';
import { categories } from '@/lib/data';
import { Badge } from './ui/badge';
import React from 'react';

const categoryIcons: { [key: string]: React.ElementType } = {
  'large-appliances': Refrigerator,
  'small-appliances': Zap,
  'smart-home': Home,
  'entertainment': Tv,
};

export function Header() {
  const { cartCount } = useCart();
  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const NavLinks = () => (
    <>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/products/${category.slug}`}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          onClick={() => setMobileMenuOpen(false)}
        >
          {category.name}
        </Link>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="mr-6 flex items-center gap-2">
          <Zap className="h-6 w-6 text-primary" />
          <span className="font-headline text-xl font-bold">ApplianceVerse</span>
        </Link>
        <nav className="hidden gap-6 md:flex">
          <NavLinks />
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <div className="hidden sm:flex">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full rounded-full pl-9"
              />
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">User account</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild><Link href="/login">Login</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link href="/account">Profile</Link></DropdownMenuItem>
              <DropdownMenuItem>Wishlist</DropdownMenuItem>
              <DropdownMenuItem>Order History</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 justify-center rounded-full p-0"
                  >
                    {cartCount}
                  </Badge>
                )}
                <span className="sr-only">Shopping Cart</span>
              </Button>
            </SheetTrigger>
            {/* Implement CartSheet content here */}
            <SheetContent>
                <p>Your cart is here.</p>
            </SheetContent>
          </Sheet>

          <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="md:hidden">
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b pb-4">
                   <Link href="/" className="mr-6 flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                      <Zap className="h-6 w-6 text-primary" />
                      <span className="font-headline text-xl font-bold">ApplianceVerse</span>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                </div>
                <nav className="mt-8 flex flex-col gap-6">
                  <NavLinks />
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
