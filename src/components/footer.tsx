
import Link from 'next/link';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Twitter, Facebook, Instagram } from 'lucide-react';

const paymentMethods = [
    '/payment-methods/visa.svg',
    '/payment-methods/mastercard.svg',
    '/payment-methods/paypal.svg',
    '/payment-methods/maestro.svg',
];

const MCElectronicsLogo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 11a8 8 0 0 1 8 8" />
        <path d="M4 4a15 15 0 0 1 15 15" />
        <path d="M4 18a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
        <path d="M12 11v4" />
        <path d="m14 13-2 2-2-2" />
        <path d="M20 4h-4" />
        <path d="M18 6V2" />
    </svg>
  );

export function Footer() {
  return (
    <footer className="border-t bg-secondary">
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-start lg:col-span-1">
             <Link href="/" className="mb-4 flex items-center gap-2">
                 <MCElectronicsLogo />
                 <span className="font-headline text-2xl font-bold">MC Electronics</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Smart Living, Made Simple.
            </p>
             <div className="mt-4 flex space-x-2">
                <Button variant="ghost" size="icon" asChild><Link href="#"><Twitter className="h-5 w-5" /></Link></Button>
                <Button variant="ghost" size="icon" asChild><Link href="#"><Facebook className="h-5 w-5" /></Link></Button>
                <Button variant="ghost" size="icon" asChild><Link href="#"><Instagram className="h-5 w-5" /></Link></Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:col-span-1 lg:col-span-2 lg:grid-cols-3">
              <div>
                <h3 className="font-headline font-semibold">Shop</h3>
                <ul className="mt-4 space-y-2">
                  <li><Link href="/products/large-appliances" className="text-sm text-muted-foreground hover:text-primary">Large Appliances</Link></li>
                  <li><Link href="/products/small-appliances" className="text-sm text-muted-foreground hover:text-primary">Small Appliances</Link></li>
                  <li><Link href="/products/smart-home" className="text-sm text-muted-foreground hover:text-primary">Smart Home</Link></li>
                  <li><Link href="/products/entertainment" className="text-sm text-muted-foreground hover:text-primary">Entertainment</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-headline font-semibold">Support</h3>
                <ul className="mt-4 space-y-2">
                  <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact Us</Link></li>
                  <li><Link href="/faq" className="text-sm text-muted-foreground hover:text-primary">FAQs</Link></li>
                  <li><Link href="/return-policy" className="text-sm text-muted-foreground hover:text-primary">Return Policy</Link></li>
                  <li><Link href="/warranty-info" className="text-sm text-muted-foreground hover:text-primary">Warranty Info</Link></li>
                </ul>
              </div>
               <div>
                <h3 className="font-headline font-semibold">Company</h3>
                <ul className="mt-4 space-y-2">
                  <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary">About Us</Link></li>
                   <li><Link href="/account" className="text-sm text-muted-foreground hover:text-primary">My Account</Link></li>
                  <li><Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
                  <li><Link href="/terms-of-service" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link></li>
                </ul>
              </div>
          </div>
           <div className="lg:col-span-1">
                <h3 className="font-headline font-semibold">Stay Connected</h3>
                <p className="mt-4 text-sm text-muted-foreground">Get the latest deals & appliance tips in your inbox.</p>
                <form className="mt-4 flex w-full max-w-sm items-center space-x-2">
                    <Input type="email" placeholder="Enter your email" className="flex-1"/>
                    <Button type="submit">Subscribe</Button>
                </form>
           </div>
        </div>
        <div className="mt-8 border-t pt-4 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} MC Electronics. All Rights Reserved.</p>
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
               <p>Pay securely with</p>
               <div className="flex items-center gap-2">
                <svg className="h-8 w-auto" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" opacity=".07"></path><path d="M23 18H15V6h8c1.7 0 3 1.3 3 3s-1.3 3-3 3-3 1.3-3 3v3z" fill="#fff"></path></svg>
                 <svg className="h-8 w-auto" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" opacity=".07"></path><path d="M12 12c0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6-6-2.7-6-6zm11.4 0c0-2.8-2-5-4.6-5-.9 0-1.8.3-2.5.8-.7-.5-1.6-.8-2.5-.8-2.6 0-4.7 2.2-4.7 5s2 5 4.6 5c.9 0 1.8-.3 2.5-.8.7.5 1.6.8 2.5.8 2.6 0 4.7-2.2 4.7-5z" fill="#fff"></path><circle cx="18" cy="12" r="5.4" fill="#EB001B"></circle><path d="M12 12c0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6-6-2.7-6-6zm11.4 0c0-2.8-2-5-4.6-5-.9 0-1.8.3-2.5.8-.7-.5-1.6-.8-2.5-.8-2.6 0-4.7 2.2-4.7 5s2 5 4.6 5c.9 0 1.8-.3 2.5-.8.7.5 1.6.8 2.5.8 2.6 0 4.7-2.2 4.7-5z" fill="#F79E1B"></path></svg>
                 <svg className="h-8 w-auto" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" opacity=".07"></path><path d="M22.6 12.2c0-2.4 1-4 2.8-4s2.8 1.6 2.8 4-1 4-2.8 4-2.8-1.6-2.8-4zm11-3.6c-1.3 0-2.2.6-2.6 1-.2-.3-.5-.5-.8-.5-.8 0-1.3.6-1.3 1.5 0 .8.6 1.2 1.5 1.5.8.3 1 .4 1 .6 0 .2-.3.3-.6.3-.5 0-.8-.2-1-.4l-.2-.1-.2-.5h-1c.1.6.6 1.1 1.4 1.1.9 0 1.6-.5 1.6-1.3 0-.6-.4-.9-1.4-1.3-.8-.3-1-.4-1-.6 0-.2.3-.3.6-.3.4 0 .7.2.8.3l.1.1.2.4h1v-1.6c.2-.1.4-.1.6-.1.6 0 1.1.3 1.1.9zm-22.3.1c0-.5.4-.8 1-.8.6 0 1 .3 1 .8s-.4.8-1 .8c-.6 0-1-.3-1-.8zm-3 0c0-.5.4-.8 1-.8.6 0 1 .3 1 .8s-.4.8-1 .8c-.6 0-1-.3-1-.8zm-3 0c0-.5.4-.8 1-.8.6 0 1 .3 1 .8s-.4.8-1 .8c-.6 0-1-.3-1-.8zm-3 0c0-.5.4-.8 1-.8.6 0 1 .3 1 .8s-.4.8-1 .8c-.6 0-1-.3-1-.8z" fill="#fff"></path></svg>
               </div>
            </div>
        </div>
      </div>
    </footer>
  );
}
