
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-center font-headline text-3xl font-bold md:text-4xl">
          Privacy Policy
        </h1>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Our Commitment to Your Privacy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground">
            <p>
              Your privacy is important to us. It is MC Electronics's policy to respect your privacy regarding any information we may collect from you across our website, and other sites we own and operate.
            </p>
            
            <div>
              <h3 className="font-semibold text-foreground mb-2">1. Information We Collect</h3>
              <p>
                We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used. This information may include your name, email address, shipping address, phone number, and payment details.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">2. How We Use Your Information</h3>
              <p>
                We use the information we collect to process your orders, manage your account, and personalize your experience on our site. We may also use it to communicate with you about your orders, our products, services, and promotional offers.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">3. Data Security</h3>
              <p>
                We protect the data we store within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification. We don’t share any personally identifying information publicly or with third-parties, except when required to by law.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-2">4. Cookies</h3>
              <p>
                We use cookies to help improve your experience of our website. A cookie is a small piece of data that our website stores on your computer, and accesses each time you visit, so we can understand how you use our site and serve you content based on preferences you have specified.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">5. Your Rights</h3>
              <p>
                You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services. Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information.
              </p>
            </div>

            <p className="pt-4">
              This policy is effective as of 1 August 2024. If you have any questions about how we handle user data and personal information, feel free to contact us.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
