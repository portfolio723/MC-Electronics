
"use client";

import Link from 'next/link';
import {
  Menu,
  ShoppingCart,
  User,
  Heart,
  ChevronDown,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { SearchBar } from './search-bar';
import { useWishlist } from '@/hooks/use-wishlist';

const mainNav: { title: string; href: string; type: 'link' | 'dropdown', slug?: string }[] = [
    { title: 'Home', href: '/', type: 'link' },
    { title: 'Large Appliances', href: '/products/large-appliances', type: 'dropdown', slug: 'large-appliances' },
    { title: 'Small Appliances', href: '/products/small-appliances', type: 'dropdown', slug: 'small-appliances' },
    { title: 'Smart Home', href: '/products/smart-home', type: 'dropdown', slug: 'smart-home' },
    { title: 'Entertainment', href: '/products/entertainment', type: 'dropdown', slug: 'entertainment' },
];

export function Header() {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
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
                <Button variant="ghost" className={cn("flex items-center gap-1 text-sm font-semibold", isActive ? "text-primary-active" : "text-foreground")}>
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
              isActive ? "text-primary-active" : "text-foreground",
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
        {/* Mobile Menu Trigger */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden mr-4">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex w-full max-w-sm flex-col p-0">
             <div className="flex h-16 items-center justify-between border-b px-4">
               <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
                  <span className="font-headline text-xl font-bold">ElectroHive</span>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                  <X className="h-6 w-6" />
                </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
               <nav className="flex flex-col gap-4">
                <NavMenu isMobile={true} />
              </nav>
              <div className="mt-6 flex flex-col gap-4">
                  <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="font-semibold text-foreground transition-colors hover:text-primary">Contact Us</Link>
                  <Link href="/faq" onClick={() => setMobileMenuOpen(false)} className="font-semibold text-foreground transition-colors hover:text-primary">FAQs</Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        
        {/* Logo */}
        <Link href="/" className="hidden md:flex items-center gap-2 mr-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
          <span className="font-headline text-2xl font-bold">ElectroHive</span>
        </Link>
        
        {/* Centered Search Bar (Desktop) */}
        <div className="hidden flex-1 md:flex justify-center">
            <div className="w-full max-w-lg">
                <SearchBar />
            </div>
        </div>

        <div className="flex flex-1 items-center justify-end gap-2 md:gap-4">
           <div className="md:hidden">
                <SearchBar />
           </div>
           
           <div className="hidden items-center gap-1 md:flex">
             <Button variant="ghost" size="icon" asChild>
                <Link href="/login"><User className="h-5 w-5" /><span className="sr-only">Login</span></Link>
            </Button>
            <Link href="/account" passHref>
                <Button variant="ghost" size="icon" className="relative">
                    <Heart className="h-5 w-5" />
                    {wishlistCount > 0 && (
                      <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 justify-center rounded-full p-0">
                        {wishlistCount}
                      </Badge>
                    )}
                    <span className="sr-only">Wishlist</span>
                </Button>
            </Link>
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

            <Link href="/account" passHref className="md:hidden">
                <Button variant="ghost" size="icon" className="relative">
                    <Heart className="h-5 w-5" />
                    {wishlistCount > 0 && (
                      <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 justify-center rounded-full p-0">
                        {wishlistCount}
                      </Badge>
                    )}
                    <span className="sr-only">Wishlist</span>
                </Button>
            </Link>
         
          <Button variant="ghost" size="icon" className="relative md:hidden" asChild>
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
      </div>
      <nav className="hidden border-t bg-background py-2 md:block">
          <div className="container mx-auto flex items-center justify-center gap-6 px-4 md:px-6">
            <NavMenu />
             <Link href="/contact" className="text-sm font-semibold text-foreground transition-colors hover:text-primary">Contact Us</Link>
             <Link href="/faq" className="text-sm font-semibold text-foreground transition-colors hover:text-primary">FAQs</Link>
          </div>
      </nav>
    </header>
  );
}
