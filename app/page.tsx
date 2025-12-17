'use client';

/**
 * Main Page - Generic AI App Template
 *
 * CUSTOMIZE THIS FOR YOUR HACKATHON PROJECT:
 * 1. Change the title and description
 * 2. Modify the systemPrompt for your use case
 * 3. Add your custom UI elements
 * 4. Style it to match your theme
 */

import { useState } from 'react';
import AIInput from '@/components/AIInput';
import AIResponse from '@/components/AIResponse';

export default function Home() {
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (prompt: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          // CUSTOMIZE: Add your system prompt here
          systemPrompt: 'You are a helpful AI assistant.',
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      setResponse(data.response);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header - CUSTOMIZE THIS */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Hackathon Starter
          </h1>
          <p className="text-lg text-gray-600">
            Generic template - customize for your project
          </p>
        </div>

        {/* Main Content Area - CUSTOMIZE THIS */}
        <div className="space-y-6">
          {/* Input Section */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Enter Your Prompt
            </h2>
            <AIInput
              onSubmit={handleSubmit}
              placeholder="Type your prompt here..."
              buttonText="Send to AI"
              isLoading={isLoading}
              multiline
            />
          </div>

          {/* Response Section */}
          {(response || isLoading || error) && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                AI Response
              </h2>
              <AIResponse
                response={response}
                isLoading={isLoading}
                error={error}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>Built with Next.js, Tailwind CSS, and Claude AI</p>
        </div>
      </div>
    </main>
  );
}
