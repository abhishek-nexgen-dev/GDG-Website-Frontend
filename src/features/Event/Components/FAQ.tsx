import { ChevronDown } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      question: "Who can participate?",
      answer: "Anyone who meets the event eligibility requirements can participate.",
    },
    {
      question: "Is registration required?",
      answer: "Yes. Participants must complete registration within the registration period.",
    },
    {
      question: "What should I bring?",
      answer: "Bring your laptop, valid ID card, Git/GitHub account and other required items.",
    },
    {
      question: "How does judging work?",
      answer:
        "Projects are evaluated by the event judging panel according to the event rules and criteria.",
    },
  ];

  return (
    <div className="divide-y divide-white/[0.07]">
      {faqs.map((faq) => (
        <details key={faq.question} className="group py-4 first:pt-0 last:pb-0">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-xs font-medium text-white/60">
            {faq.question}

            <ChevronDown
              size={15}
              className="shrink-0 text-white/25 transition duration-300 group-open:rotate-180"
            />
          </summary>

          <p className="mt-3 max-w-xl text-[11px] leading-5 text-white/30">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
};

export default FAQ
