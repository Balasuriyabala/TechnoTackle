import { FaqItem, FaqApiResponse } from './types';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getFaqs = async (query?: string | any): Promise<FaqItem[]> => {
  try {
    const res = await fetch(`${baseUrl}/faq`, { cache: 'no-store' });
    console.log(`${baseUrl}/faq`);
    console.log(res);
    
    if (!res.ok) {
        console.error(`fetchFaqs failed: ${res.status}`);
        return [];
    }
    const repo: FaqApiResponse = await res.json();
    console.log(repo);
    
    return repo?.data || [];
  } catch (error) {
    console.error("fetchFaqs error", error);
    return [];
  }
};
