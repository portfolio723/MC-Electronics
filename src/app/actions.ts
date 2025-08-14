'use server';

import { getSimilarProducts } from '@/ai/flows/similar-product-recommendations';

export async function getSimilarProductsAction(productDescription: string) {
  if (!productDescription) {
    return { success: false, error: 'Product description is required.' };
  }
  
  try {
    const recommendations = await getSimilarProducts({ productDescription });
    return { success: true, data: recommendations };
  } catch (error) {
    console.error('Error in getSimilarProductsAction:', error);
    return { success: false, error: 'Failed to fetch similar products. Please try again later.' };
  }
}
