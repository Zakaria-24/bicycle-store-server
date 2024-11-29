import { z } from 'zod'

const productValidationSchema = z.object({
  name: z
    .string()
    .nonempty({ message: 'Name is required and cannot be empty' }),
  brand: z
    .string()
    .nonempty({ message: 'Brand is required and cannot be empty' }),
  price: z
    .number()
    .int({ message: 'Price must be an integer' })
    .positive({ message: 'Price must be a positive number' }),
  type: z.enum(['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'], {
    message:
      "Category must be one of: 'Mountain', 'Road', 'Hybrid', 'BMX', or 'Electric'",
  }),

  description: z
    .string()
    .nonempty({ message: 'Description is required and cannot be empty' }),
  quantity: z
    .number()
    .int({ message: 'Quantity must be an integer' })
    .min(1, { message: 'Quantity must be at least 1' }),
  inStock: z.boolean().refine((val) => typeof val === 'boolean', {
    message: 'InStock must be a boolean value',
  }),
})

export default productValidationSchema
