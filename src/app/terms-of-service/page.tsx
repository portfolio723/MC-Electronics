
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-center font-headline text-3xl font-bold md:text-4xl">
          Terms of Service
        </h1>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Agreement Between User and ApplianceVerse</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground">
            <p>
              Welcome to ApplianceVerse. The ApplianceVerse website (the "Site") is comprised of various web pages operated by ApplianceVerse. Your use of the Site is conditioned on your acceptance without modification of the terms, conditions, and notices contained herein (the "Terms").
            </p>
            
            <div>
              <h3 className="font-semibold text-foreground mb-2">1. Use of the Site</h3>
              <p>
                You agree to use the Site only for lawful purposes. You are prohibited from any use of the Site that would constitute an illegal offense, give rise to liability, or otherwise violate any applicable local, state, national or international law or regulation.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">2. User Accounts</h3>
              <p>
                To access some features of the Site, you may have to create an account. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account or password.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">3. Products and Pricing</h3>
              <p>
                All prices displayed on the Site are quoted in Indian Rupees (INR). ApplianceVerse reserves the right to change prices for products displayed on the Site at any time, and to correct pricing errors that may inadvertently occur. All product descriptions are subject to change at any time without notice, at our sole discretion.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-2">4. Intellectual Property</h3>
              <p>
                All content included on the Site, such as text, graphics, logos, images, as well as the compilation thereof, and any software used on the Site, is the property of ApplianceVerse or its suppliers and protected by copyright and other laws.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-2">5. Limitation of Liability</h3>
              <p>
                In no event shall ApplianceVerse, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
              </p>
            </div>

            <p className="pt-4">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. Your continued use of the Site after any such changes constitutes your acceptance of the new Terms.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
