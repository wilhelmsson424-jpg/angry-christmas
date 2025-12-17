'use client';

/**
 * Generic AI Response Display Component
 * Shows AI responses with nice formatting
 */

interface AIResponseProps {
  response: string;
  isLoading?: boolean;
  error?: string | null;
}

export default function AIResponse({
  response,
  isLoading = false,
  error = null,
}: AIResponseProps) {
  if (error) {
    return (
      <div className="w-full p-6 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-700 font-medium">Error</p>
        <p className="text-red-600 mt-1">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full p-6 bg-gray-50 border border-gray-200 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600">AI is thinking...</p>
        </div>
      </div>
    );
  }

  if (!response) {
    return null;
  }

  return (
    <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="prose prose-sm max-w-none">
        <p className="text-gray-800 whitespace-pre-wrap">{response}</p>
      </div>
    </div>
  );
}
