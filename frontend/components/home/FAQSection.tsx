// FAQSection.tsx
'use client';
import { useState } from 'react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What exactly is NExplain?",
      answer: "Different engines are optimized for specific tasks. Our platform offers multiple AI engines including GPT-4 for complex reasoning, Claude for detailed analysis, and custom models for specialized industry needs. Each engine has unique strengths in processing speed, accuracy, and context understanding."
    },
    {
      question: "How it is different?",
      answer: "There are three reasons for it, for a lot of cases, for example sales, the result is not awaited but to screen. In similar way to Intercom, sometimes you need to create incentives for simple cases; our aim is to create human augmentation rather than replacement."
    },
    {
      question: "What is subscription for notes?",
      answer: "You can cancel your subscription at any time from your account settings. Go to Billing > Subscription Management and click 'Cancel Subscription'. Your access will continue until the end of your current billing period, and you won't be charged again."
    },
    {
      question: "What happens after the Free quota?",
      answer: "Once you exceed your free quota, you'll need to upgrade to a paid plan to continue using the service. We'll notify you when you're approaching your limit. You can choose from our flexible pricing plans based on your usage needs, or contact sales for custom enterprise solutions."
    }
  ];

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <div className="grid md:grid-cols-[300px_1fr] gap-8">
        
        {/* Left side - Header */}
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently<br />Asked<br />Questions
          </h2>
          <p className="text-gray-600 mb-6">
            Find answers to frequently asked questions.
          </p>
          <button className="bg-gray-900 hover:bg-gray-800 text-white font-medium px-6 py-3 rounded-lg transition-colors">
            Contact us
          </button>
        </div>

        {/* Right side - FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border-b border-gray-200 pb-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between text-left py-2 hover:text-gray-600 transition-colors"
              >
                <span className="text-lg font-medium text-gray-900">
                  {faq.question}
                </span>
                <span className="text-2xl text-gray-400 ml-4 flex-shrink-0">
                  {openIndex === index ? '×' : '+'}
                </span>
              </button>
              
              {openIndex === index && faq.answer && (
                <div className="mt-3 text-gray-600 text-sm leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}