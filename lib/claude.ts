/**
 * Generic Claude API Wrapper
 * Use this to interact with Claude AI in your app
 */

import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export interface ClaudeMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ClaudeOptions {
  model?: string;
  maxTokens?: number;
  temperature?: number;
  systemPrompt?: string;
}

/**
 * Send a message to Claude and get a response
 * @param messages - Array of messages (conversation history)
 * @param options - Claude configuration options
 * @returns Claude's response as a string
 */
export async function sendToClaude(
  messages: ClaudeMessage[],
  options: ClaudeOptions = {}
): Promise<string> {
  const {
    model = 'claude-opus-4-5-20251101',
    maxTokens = 1024,
    temperature = 1.0,
    systemPrompt,
  } = options;

  try {
    const response = await anthropic.messages.create({
      model,
      max_tokens: maxTokens,
      temperature,
      system: systemPrompt,
      messages: messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
    });

    const content = response.content[0];
    if (content.type === 'text') {
      return content.text;
    }

    throw new Error('Unexpected response type from Claude');
  } catch (error) {
    console.error('Claude API Error:', error);
    throw error;
  }
}

/**
 * Simple one-shot prompt to Claude
 * @param prompt - User prompt
 * @param systemPrompt - Optional system prompt to guide Claude's behavior
 * @returns Claude's response
 */
export async function askClaude(
  prompt: string,
  systemPrompt?: string
): Promise<string> {
  return sendToClaude(
    [{ role: 'user', content: prompt }],
    { systemPrompt }
  );
}

/**
 * Stream responses from Claude (for real-time UI)
 * @param messages - Conversation messages
 * @param options - Claude options
 * @param onChunk - Callback for each chunk of text
 */
export async function streamClaude(
  messages: ClaudeMessage[],
  options: ClaudeOptions = {},
  onChunk: (text: string) => void
): Promise<string> {
  const {
    model = 'claude-opus-4-5-20251101',
    maxTokens = 1024,
    temperature = 1.0,
    systemPrompt,
  } = options;

  try {
    const stream = await anthropic.messages.stream({
      model,
      max_tokens: maxTokens,
      temperature,
      system: systemPrompt,
      messages: messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
    });

    let fullText = '';

    for await (const chunk of stream) {
      if (
        chunk.type === 'content_block_delta' &&
        chunk.delta.type === 'text_delta'
      ) {
        const text = chunk.delta.text;
        fullText += text;
        onChunk(text);
      }
    }

    return fullText;
  } catch (error) {
    console.error('Claude Streaming Error:', error);
    throw error;
  }
}
