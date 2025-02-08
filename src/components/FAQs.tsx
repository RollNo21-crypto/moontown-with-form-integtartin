import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What's included in the basic theater booking?",
      answer: "The basic theater booking includes private access to the theater for your group, standard sound system, comfortable seating, and complimentary popcorn. You'll have full control over the movie selection and playback."
    },
    {
      question: "How many people can I bring?",
      answer: "Our theaters can accommodate different group sizes. The Basic package allows up to 4 guests, Premium up to 6 guests, and Luxury up to 8 guests. For larger groups, please contact us directly for special arrangements."
    },
    {
      question: "Can I bring my own food and drinks?",
      answer: "Outside food and beverages are not allowed. However, we offer a variety of food and beverage packages that you can pre-order. We also have special packages for celebrations."
    },
    {
      question: "What types of movies can I watch?",
      answer: "You can watch any movie from our extensive library, which includes latest releases, classics, and international films. You can also bring your own content on USB or connect to streaming services."
    },
    {
      question: "How far in advance should I book?",
      answer: "We recommend booking at least a week in advance, especially for weekend slots and special occasions. However, you can check last-minute availability by contacting us directly."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit/debit cards, bank transfers, and digital payment methods. A 50% advance payment is required to confirm your booking."
    },
    {
      question: "Can I decorate the theater for a special occasion?",
      answer: "Yes! We offer various decoration packages for birthdays, anniversaries, and other special occasions. You can choose from our themed packages or request a custom setup."
    },
    {
      question: "What if there's a technical problem during my session?",
      answer: "Our technical team is always on standby. If any technical issues occur, we'll either resolve them immediately or offer you a complimentary rebooking. Your satisfaction is our priority."
    }
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600">Find answers to common questions about our services</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-50">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;