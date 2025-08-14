
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ReturnPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-center font-headline text-3xl font-bold md:text-4xl">
          Return & Refund Policy
        </h1>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">10-Day Return Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              At ApplianceVerse, we are committed to ensuring your satisfaction with every purchase. We offer a 10-day return policy for most items, which means you have 10 days after receiving your item to request a return.
            </p>
            
            <h3 className="font-semibold text-foreground pt-4">Eligibility for a Return</h3>
            <p>To be eligible for a return, your item must meet the following criteria:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The item must be in the same condition that you received it: unused, with tags, and in its original packaging.</li>
              <li>All accessories, manuals, and warranty cards that were included with the product must be returned.</li>
              <li>The product must not be damaged, altered, or tampered with.</li>
              <li>You must have the receipt or proof of purchase.</li>
            </ul>

            <h3 className="font-semibold text-foreground pt-4">How to Initiate a Return</h3>
            <p>
              To start a return, please contact our customer support team through our <a href="/contact" className="text-primary underline">Contact Us</a> page. If your return is accepted, we’ll send you instructions on how and where to send your package. Items sent back to us without first requesting a return will not be accepted.
            </p>
            
            <h3 className="font-semibold text-foreground pt-4">Damages and Issues</h3>
            <p>
              Please inspect your order upon reception and contact us immediately if the item is defective, damaged, or if you receive the wrong item, so that we can evaluate the issue and make it right.
            </p>

            <h3 className="font-semibold text-foreground pt-4">Exceptions / Non-Returnable Items</h3>
            <p>
              Certain types of items cannot be returned, like perishable goods, custom products (such as special orders or personalized items), and personal care goods. We also do not accept returns for hazardous materials, flammable liquids, or gases. Please get in touch if you have questions or concerns about your specific item. Unfortunately, we cannot accept returns on sale items or gift cards.
            </p>
            
            <h3 className="font-semibold text-foreground pt-4">Refunds</h3>
            <p>
              We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method. Please remember it can take some time for your bank or credit card company to process and post the refund too.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
