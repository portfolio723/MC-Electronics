import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit and debit cards (Visa, MasterCard, American Express), Net Banking, UPI, and popular digital wallets. All transactions are securely processed.",
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 10-day return policy for most items. The product must be in its original condition with all accessories and packaging. Please visit our Return Policy page for more details.",
  },
    {
    question: "How can I track my order?",
    answer: "Once your order is shipped, you will receive an email with a tracking number and a link to the courier's website. You can also track your order from the 'My Orders' section in your account.",
  },
  {
    question: "Is there a warranty on your products?",
    answer: "Yes, all our products come with a manufacturer's warranty. The duration and terms of the warranty vary by product and brand. You can find specific warranty information on each product's detail page.",
  },
  {
    question: "Do you offer installation services?",
    answer: "Installation services are available for large appliances in select cities. You can check for availability and schedule an installation during the checkout process.",
  }
];

export default function FaqPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-center font-headline text-3xl font-bold md:text-4xl">
          Frequently Asked Questions
        </h1>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
