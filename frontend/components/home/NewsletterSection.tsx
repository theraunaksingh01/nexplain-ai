// NewsletterSection.tsx
'use client';
import { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    // Handle email submission
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="rounded-3xl bg-gradient-to-br from-blue-100 via-blue-50 to-yellow-100 px-8 py-16 md:px-16 md:py-20">
        
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Join forward-thinking<br />AI leaders
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:w-80 px-6 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white"
              required
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Apply
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}