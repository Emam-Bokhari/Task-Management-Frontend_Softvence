import { z } from 'zod';

export const taskValidation = z.object({
    title: z
        .string()
        .min(3, { message: 'Title must be between 3 and 100 characters' })
        .max(100, { message: 'Title must be between 3 and 100 characters' })
        .nonempty({ message: 'Title is required' }),

    description: z
        .string()
        .min(10, { message: 'Description must be at least 10 characters' })
        .nonempty({ message: 'Description is required' }),

    category: z.enum([
        'artsAndCraft',
        'nature',
        'family',
        'sport',
        'friends',
        'meditation',
    ], {
        errorMap: () => ({ message: 'Category must be one of the allowed values' })
    }),

    status: z
        .enum(['allTask', 'onGoing', 'inProgress', 'pending', 'collaborativeTask', 'done'])
        .optional(),




    endDate: z
        .string()
        .nonempty({ message: 'End date is required' })
});


