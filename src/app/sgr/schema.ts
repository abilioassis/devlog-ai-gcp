import { z } from 'zod';

export const createRequestSchema = z.object({
  title: z.string().min(1, 'O título é obrigatório'),
  description: z.string().min(1, 'A descrição é obrigatória'),
});

export type CreateRequestInput = z.infer<typeof createRequestSchema>;
