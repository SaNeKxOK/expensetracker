import { z } from 'zod';

const transactionSchema = z.object({
  description: z.string().min(1, { message: 'Description is required' }),
  amount: z.coerce
    .number()
    .positive({ message: 'Amount must be greater than 0' }),
  type: z.enum(['income', 'expense']),
  category: z.string().min(1, { message: 'Category is required' }),
  date: z.string().date(),
});

export default transactionSchema;
