
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Eye } from 'lucide-react';

export default function AboutUsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-center font-headline text-4xl font-bold md:text-5xl">
          About ApplianceVerse
        </h1>
        <p className="mb-12 text-center text-lg text-muted-foreground">
          Smart Living, Made Simple.
        </p>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 font-headline text-2xl">
              <Users className="h-8 w-8 text-primary" />
              Who We Are
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Founded in 2024, ApplianceVerse was born from a simple idea: to make modern living easier and more enjoyable for everyone. We noticed that while technology was advancing rapidly, buying home appliances was still a complicated and often overwhelming process. We set out to change that by creating a single destination for the best appliances, backed by expert advice and world-class customer service.
            </p>
            <p>
              We are a team of tech enthusiasts, home experts, and customer service professionals passionate about helping you build a smarter, more efficient home. We believe that the right appliances can do more than just perform a task—they can simplify your life, save you time, and bring your family closer together.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 font-headline text-2xl">
                  <Target className="h-8 w-8 text-primary" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  Our mission is to simplify the journey of creating a smart and efficient home. We are dedicated to curating a selection of high-quality, innovative, and reliable home appliances. We strive to empower our customers with the knowledge and products they need to enhance their daily lives, save energy, and embrace the future of home technology with confidence.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 font-headline text-2xl">
                  <Eye className="h-8 w-8 text-primary" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  We envision a future where every home is a smart home, seamlessly integrated to anticipate and meet the needs of its inhabitants. We aim to be the most trusted partner for homeowners in their transition to a more connected and sustainable lifestyle, leading the way in the e-commerce space for home appliances through innovation, integrity, and an unwavering commitment to our customers.
                </p>
              </CardContent>
            </Card>
        </div>

      </div>
    </div>
  );
}
