'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating similar product recommendations.
 *
 * - getSimilarProducts - An async function that takes a product description and returns a list of similar product recommendations.
 * - SimilarProductsInput - The input type for the getSimilarProducts function, consisting of a product description.
 * - SimilarProductsOutput - The output type for the getSimilarProducts function, which is a list of similar product descriptions.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SimilarProductsInputSchema = z.object({
  productDescription: z.string().describe('The description of the product for which to find similar products.'),
});
export type SimilarProductsInput = z.infer<typeof SimilarProductsInputSchema>;

const SimilarProductsOutputSchema = z.array(z.string()).describe('A list of similar product descriptions.');
export type SimilarProductsOutput = z.infer<typeof SimilarProductsOutputSchema>;

export async function getSimilarProducts(input: SimilarProductsInput): Promise<SimilarProductsOutput> {
  return similarProductsFlow(input);
}

const similarProductsPrompt = ai.definePrompt({
  name: 'similarProductsPrompt',
  input: {schema: SimilarProductsInputSchema},
  output: {schema: SimilarProductsOutputSchema},
  prompt: `You are an e-commerce expert specializing in product recommendations.

  Given the following product description, generate a list of similar products that a user might be interested in.
  Return the list as a JSON array of strings.

  Product Description: {{{productDescription}}}
  `,
});

const similarProductsFlow = ai.defineFlow(
  {
    name: 'similarProductsFlow',
    inputSchema: SimilarProductsInputSchema,
    outputSchema: SimilarProductsOutputSchema,
  },
  async input => {
    const {output} = await similarProductsPrompt(input);
    return output!;
  }
);
