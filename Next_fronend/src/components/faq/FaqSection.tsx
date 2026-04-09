'use client';

import React, { useState, useMemo } from 'react';
import FaqAccordion from './FaqAccordion';
import { Search } from 'lucide-react';
import { FaqItem } from '@/services/types';

interface FaqSectionProps {
  faqs: FaqItem[];
}

const FaqSection = ({ faqs }: FaqSectionProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Memoize filtered results to prevent unnecessary re-renders of the child accordion
  const filteredFaqs = useMemo(() => {
    if (!faqs) return [];
    
    return faqs.filter(faq => {
      // 1. Filter out soft-deleted items
      if (faq.deletedAt) return false;

      // 2. Filter by search query (case-insensitive)
      const query = searchQuery.toLowerCase().trim();
      if (!query) return true;

      return (
        faq.question?.toLowerCase().includes(query) ||
        faq.answer?.toLowerCase().includes(query)
      );
    });
  }, [faqs, searchQuery]);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#f8fcfb]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-[0.3em] text-gray-400 uppercase mb-4">
            SUPPORT CENTER
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 tracking-tight mb-12">
            Frequently Asked Questions
          </h1>

          <div className="relative max-w-2xl mx-auto group">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400 group-focus-within:text-gray-900 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search for topics, features, or policies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-16 pr-8 py-5 rounded-2xl bg-white border border-transparent shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] focus:outline-none focus:ring-2 focus:ring-gray-900/10 transition-all text-gray-600 placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="min-h-[400px]">
          {filteredFaqs.length > 0 ? (
            <FaqAccordion items={filteredFaqs} />
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
              <p className="text-gray-500 text-lg">No FAQs matched your search.</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-4 text-gray-900 font-semibold underline underline-offset-4 hover:text-gray-700"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
