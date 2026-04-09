export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  updatedBy: number;
  deletedAt: string | null;
}

export interface FaqApiResponse {
  data: FaqItem[];
  message?: string;
  status?: number;
}
