'use server';
/**
 * @fileOverview This file implements a Genkit flow for an AI chatbot
 * that answers questions about CCTV systems and installation, leveraging
 * company-specific knowledge.
 *
 * - aiChatbotForServiceExplainer - A function that handles the AI chatbot interaction.
 * - AIChatbotForServiceExplainerInput - The input type for the chatbot function.
 * - AIChatbotForServiceExplainerOutput - The return type for the chatbot function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AIChatbotForServiceExplainerInputSchema = z.object({
  question: z.string().describe('The user\'s question about CCTV systems or installation.'),
});
export type AIChatbotForServiceExplainerInput = z.infer<typeof AIChatbotForServiceExplainerInputSchema>;

const AIChatbotForServiceExplainerOutputSchema = z.object({
  answer: z.string().describe('The AI chatbot\'s answer to the user\'s question.'),
});
export type AIChatbotForServiceExplainerOutput = z.infer<typeof AIChatbotForServiceExplainerOutputSchema>;

export async function aiChatbotForServiceExplainer(
  input: AIChatbotForServiceExplainerInput
): Promise<AIChatbotForServiceExplainerOutput> {
  return aiChatbotForServiceExplainerFlow(input);
}

const aiChatbotForServiceExplainerPrompt = ai.definePrompt({
  name: 'aiChatbotForServiceExplainerPrompt',
  input: { schema: AIChatbotForServiceExplainerInputSchema },
  output: { schema: AIChatbotForServiceExplainerOutputSchema },
  prompt: `You are an expert AI chatbot for GuardianSight Solutions, a professional CCTV installation company.
Your purpose is to provide immediate, accurate, and helpful answers to potential customers' questions about CCTV systems and installation, based on our company's services and expertise.
Maintain a professional, trustworthy, and modern tone.
If you do not have specific company data to answer a question, provide general, helpful information while encouraging the user to contact us for personalized solutions.

Question: {{{question}}}

Answer:`,
});

const aiChatbotForServiceExplainerFlow = ai.defineFlow(
  {
    name: 'aiChatbotForServiceExplainerFlow',
    inputSchema: AIChatbotForServiceExplainerInputSchema,
    outputSchema: AIChatbotForServiceExplainerOutputSchema,
  },
  async (input) => {
    const { output } = await aiChatbotForServiceExplainerPrompt(input);
    return output!;
  }
);
