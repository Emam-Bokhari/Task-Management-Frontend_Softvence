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

    category: z
        .string()
        .nonempty({ message: 'Category is required' })
        .refine((val) => ['artsAndCraft', 'nature', 'family', 'sport', 'friends', 'meditation'].includes(val), {
            message: 'Category must be one of: artsAndCraft, nature, family, sport, friends, meditation',
        }),

    status: z
        .string()
        .optional()
        .refine((val) => ['allTask', 'onGoing', 'inProgress', 'pending', 'collaborativeTask', 'done'].includes(val), {
            message: 'Status must be one of: allTask, onGoing, inProgress, pending, collaborativeTask, done',
        }),

    endDate: z
        .string()
        .nonempty({ message: 'End date is required' })
});


