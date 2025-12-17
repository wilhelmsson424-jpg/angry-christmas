'use client';

/**
 * Generic AI Input Component
 * Reusable form for sending prompts to AI
 */

import { useState } from 'react';

interface AIInputProps {
  onSubmit: (prompt: string) => void;
  placeholder?: string;
  buttonText?: string;
  isLoading?: boolean;
  multiline?: boolean;
}

export default function AIInput({
  onSubmit,
  placeholder = 'Enter your prompt...',
  buttonText = 'Submit',
  isLoading = false,
  multiline = false,
}: AIInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSubmit(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-2">
        {multiline ? (
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            disabled={isLoading}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        ) : (
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            disabled={isLoading}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        )}
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {isLoading ? 'Processing...' : buttonText}
        </button>
      </div>
    </form>
  );
}
