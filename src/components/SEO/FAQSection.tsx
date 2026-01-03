import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  title?: string;
}

const FAQSection = ({ faqs, title = "Frequently Asked Questions" }: FAQSectionProps) => {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              {title}
            </h2>
          </div>
          
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`faq-${index}`}
                className="bg-secondary/30 border border-border rounded-xl px-6 data-[state=open]:bg-secondary/50 transition-colors"
              >
                <AccordionTrigger className="text-left text-foreground hover:text-primary py-5 text-base font-medium hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Additional SEO Text */}
          <div className="mt-10 p-6 bg-primary/5 rounded-xl border border-primary/20">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Still have questions?</strong> Our tools are designed to be intuitive and easy to use. 
              If you need additional help, check out our <a href="/blog" className="text-primary hover:underline">blog</a> for 
              tutorials and guides, or <a href="/contact" className="text-primary hover:underline">contact us</a> directly. 
              We're here to help you convert files quickly and securely.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
