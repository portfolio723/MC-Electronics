import Link from 'next/link';
import { Zap, Twitter, Facebook, Instagram } from 'lucide-react';
import { Button } from './ui/button';

export function Footer() {
  return (
    <footer className="border-t bg-secondary">
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="flex flex-col items-start">
             <Link href="/" className="mb-4 flex items-center gap-2">
                <Zap className="h-6 w-6 text-primary" />
                <span className="font-headline text-xl font-bold">ElectroHive</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Smart Living, Made Simple.
            </p>
          </div>
          <div>
            <h3 className="font-headline font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/products/all" className="text-sm text-muted-foreground hover:text-primary">All Products</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact Us</Link></li>
              <li><Link href="/faq" className="text-sm text-muted-foreground hover:text-primary">FAQs</Link></li>
              <li><Link href="/account" className="text-sm text-muted-foreground hover:text-primary">My Account</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold">Policies</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Return Policy</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Warranty Info</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold">Contact Us</h3>
            <address className="mt-4 not-italic text-sm text-muted-foreground">
              <p>123 Tech Street, Silicon Valley, 94001</p>
              <p>Email: <a href="mailto:support@electrohive.com" className="hover:text-primary">support@electrohive.com</a></p>
              <p>Phone: <a href="tel:+1234567890" className="hover:text-primary">+1 (234) 567-890</a></p>
            </address>
            <div className="mt-4 flex space-x-2">
                <Button variant="ghost" size="icon" asChild><Link href="#"><Twitter className="h-5 w-5" /></Link></Button>
                <Button variant="ghost" size="icon" asChild><Link href="#"><Facebook className="h-5 w-5" /></Link></Button>
                <Button variant="ghost" size="icon" asChild><Link href="#"><Instagram className="h-5 w-5" /></Link></Button>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} ElectroHive. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
