'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaqItem } from '@/services/types';

interface FaqAccordionProps {
  items: FaqItem[];
}

const FaqAccordion = ({ items }: FaqAccordionProps) => {
  // Use string to match the String(item.id) conversion for maximum compatibility
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-4 relative">
      {items.map((item, index) => {
        const id = String(item.id);
        const isOpen = activeId === id;

        return (
          <div
            key={`${id}-${index}`}
            className={`group transition-all duration-300 border rounded-2xl overflow-hidden ${
              isOpen 
                ? 'border-gray-900 ring-1 ring-gray-900 shadow-xl bg-white' 
                : 'border-gray-100 bg-white shadow-sm hover:border-gray-200'
            }`}
          >
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => toggleAccordion(id)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between px-8 py-6 text-left focus:outline-none cursor-pointer relative z-10 transition-colors"
            >
              <h4 className={`text-lg font-semibold tracking-tight transition-colors duration-300 ${
                isOpen ? 'text-gray-900' : 'text-gray-700'
              }`}>
                {item.question}
              </h4>
              <div className={`p-2 rounded-full transition-colors ${isOpen ? 'bg-gray-100' : 'group-hover:bg-gray-50'}`}>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-500 ease-in-out ${
                    isOpen ? 'rotate-180 text-gray-900' : 'text-gray-400'
                  }`}
                />
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden bg-white"
                >
                  <div className="px-8 pb-8 pt-2">
                    <div className="h-px w-full bg-gray-50 mb-6" />
                    <p className="text-gray-600 leading-relaxed max-w-2xl text-[1.05rem]">
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default FaqAccordion;
