
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FAQ() {
  return (
    <section className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible>
        <AccordionItem value="free">
          <AccordionTrigger>
            Is Text Tweaker completely free to use?
          </AccordionTrigger>
          <AccordionContent>
            Yes! All our text formatting tools are 100% free and available online.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="signup">
          <AccordionTrigger>
            Do I need to sign up to use the tools?
          </AccordionTrigger>
          <AccordionContent>
            No sign-up is required—just visit our website and start formatting
            your text instantly.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="request">
          <AccordionTrigger>How do I request a new tool?</AccordionTrigger>
          <AccordionContent>
            Simply send us a message using the form above, and we'll consider
            adding it!
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  )
}
