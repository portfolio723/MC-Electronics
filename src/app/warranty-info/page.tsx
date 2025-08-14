
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function WarrantyInfoPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-center font-headline text-3xl font-bold md:text-4xl">
          Warranty Information
        </h1>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Manufacturer's Warranty</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              All products sold on ApplianceVerse are covered by the manufacturer's warranty. The duration and terms of the warranty can vary depending on the product and the brand. We encourage you to check the specific warranty details provided on each product's page.
            </p>
            
            <h3 className="font-semibold text-foreground pt-4">What Does the Warranty Cover?</h3>
            <p>
                Typically, a manufacturer's warranty covers defects in materials and workmanship that occur during normal use of the product. It does not usually cover:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Damage caused by accident, misuse, abuse, or other external causes.</li>
              <li>Damage caused by operating the product outside the permitted or intended uses described by the manufacturer.</li>
              <li>A product or part that has been modified to alter functionality or capability without the written permission of the manufacturer.</li>
              <li>Cosmetic damage, including but not limited to scratches and dents.</li>
            </ul>

            <h3 className="font-semibold text-foreground pt-4">How to Claim Warranty</h3>
            <p>
              To claim a warranty, you will generally need to contact the manufacturer's authorized service center directly. You can find their contact information in the warranty card or user manual that comes with the product.
            </p>
            <p>
                You will need to provide your proof of purchase (the invoice from ApplianceVerse) and the product's serial number. The service center will guide you through the process, which may involve an inspection of the product.
            </p>
            
            <h3 className="font-semibold text-foreground pt-4">Installation and Extended Warranty</h3>
            <p>
              For large appliances, installation services may be offered by the brand. You can typically request this service at the time of purchase or by contacting the brand after delivery.
            </p>
            <p>
                Extended warranty plans may also be available for purchase for certain products. This information, if available, will be mentioned on the product page.
            </p>

            <h3 className="font-semibold text-foreground pt-4">Our Commitment</h3>
            <p>
              While the warranty is provided by the manufacturer, ApplianceVerse is here to assist you. If you face any issues claiming your warranty, please do not hesitate to contact our customer support team, and we will do our best to help you.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
