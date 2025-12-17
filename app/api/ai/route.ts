/**
 * Generic AI API Route
 * POST /api/ai
 *
 * Request body:
 * {
 *   "prompt": "Your prompt here",
 *   "systemPrompt": "Optional system prompt",
 *   "conversationHistory": [] // Optional
 * }
 */

import { NextRequest, NextResponse } from 'next/server';
import { sendToClaude, ClaudeMessage } from '@/lib/claude';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, systemPrompt, conversationHistory } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Build messages array
    const messages: ClaudeMessage[] = [
      ...(conversationHistory || []),
      { role: 'user', content: prompt },
    ];

    // Send to Claude
    const response = await sendToClaude(messages, { systemPrompt });

    return NextResponse.json({
      success: true,
      response,
      usage: {
        // You can track token usage here if needed
      },
    });
  } catch (error: any) {
    console.error('AI API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process AI request' },
      { status: 500 }
    );
  }
}
