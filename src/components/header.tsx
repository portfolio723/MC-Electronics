"use client";

import Link from 'next/link';
import {
  Menu,
  Search,
  ShoppingCart,
  User,
  Heart,
  ChevronDown,
  X,
  Home,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useCart } from '@/hooks/use-cart';
import { categories } from '@/lib/data';
import { Badge } from './ui/badge';
import React, { useState } from 'react';
import type { Category } from '@/lib/types';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const mainNav: { title: string; href: string; type: 'link' | 'dropdown', slug?: string }[] = [
    { title: 'Home', href: '/', type: 'link' },
    { title: 'Large Appliances', href: '/products/large-appliances', type: 'dropdown', slug: 'large-appliances' },
    { title: 'Small Appliances', href: '/products/small-appliances', type: 'dropdown', slug: 'small-appliances' },
    { title: 'Smart Home', href: '/products/smart-home', type: 'dropdown', slug: 'smart-home' },
    { title: 'Entertainment', href: '/products/entertainment', type: 'dropdown', slug: 'entertainment' },
    { title: 'Offers', href: '/products/offers', type: 'link' },
    { title: 'Support', href: '/contact', type: 'link' },
];

export function Header() {
  const { cartCount } = useCart();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const getSubcategories = (parentSlug: string): Category[] => {
    return categories.filter(c => c.parent === parentSlug);
  };
  
  const NavMenu = ({ isMobile = false }) => (
    <>
      {mainNav.map((item) => {
        const subcategories = item.slug ? getSubcategories(item.slug) : [];
        const isActive = pathname === item.href || (item.slug && pathname.startsWith(`/products/${item.slug}`));

        if (item.type === 'dropdown' && subcategories.length > 0) {
          if (isMobile) {
            return (
              <Collapsible key={item.title}>
                <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-lg font-medium">
                  {item.title}
                  <ChevronDown className="h-5 w-5" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pb-2 pl-4">
                  <Link href={item.href} onClick={() => setMobileMenuOpen(false)} className={cn("block py-2 text-muted-foreground", isActive && "text-primary")}>All {item.title}</Link>
                  {subcategories.map((sub) => (
                    <Link key={sub.id} href={`/products/${sub.slug}`} onClick={() => setMobileMenuOpen(false)} className="block py-2 text-muted-foreground">{sub.name}</Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            );
          }
          return (
            <DropdownMenu key={item.title}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={cn("flex items-center gap-1 text-sm font-semibold", isActive ? "text-primary" : "text-foreground")}>
                  {item.title} <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem asChild><Link href={item.href}>All {item.title}</Link></DropdownMenuItem>
                {subcategories.map((sub) => (
                  <DropdownMenuItem key={sub.id} asChild>
                    <Link href={`/products/${sub.slug}`}>{sub.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        }

        return (
          <Link
            key={item.title}
            href={item.href}
            onClick={() => isMobile && setMobileMenuOpen(false)}
            className={cn(
              "font-semibold transition-colors hover:text-primary",
              isActive ? "text-primary" : "text-foreground",
              isMobile ? "py-2 text-lg" : "text-sm",
            )}
          >
            {item.title}
          </Link>
        );
      })}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="mr-6 flex items-center gap-2">
          <Home className="h-6 w-6 text-primary" />
          <span className="font-headline text-xl font-bold">ApplianceVerse</span>
        </Link>

        <div className="ml-auto flex items-center gap-2 md:gap-4">
           <div className="hidden sm:flex flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full rounded-full bg-secondary pl-9"
              />
            </div>
          </div>

          <div className="hidden items-center gap-2 md:flex">
             <Button variant="ghost" size="icon" asChild>
                <Link href="/login"><User className="h-5 w-5" /><span className="sr-only">Login</span></Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
                <Link href="/account/wishlist"><Heart className="h-5 w-5" /><span className="sr-only">Wishlist</span></Link>
            </Button>
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 justify-center rounded-full p-0">
                    {cartCount}
                  </Badge>
                )}
                <span className="sr-only">Shopping Cart</span>
              </Link>
            </Button>
          </div>

          <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex w-full max-w-sm flex-col md:hidden">
              <div className="flex items-center justify-between border-b pb-4">
                 <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                    <Home className="h-6 w-6 text-primary" />
                    <span className="font-headline text-xl font-bold">ApplianceVerse</span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                    <X className="h-6 w-6" />
                  </Button>
              </div>
              <div className="my-4">
                  <Input placeholder="Search..." />
              </div>
              <nav className="flex flex-col gap-2">
                <NavMenu isMobile={true} />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <nav className="hidden border-t bg-background py-2 md:block">
          <div className="container mx-auto flex items-center justify-center gap-6 px-4 md:px-6">
            <NavMenu />
          </div>
      </nav>
    </header>
  );
}
