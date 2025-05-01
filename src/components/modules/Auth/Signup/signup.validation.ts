import { z } from "zod";
export const signupValidation = z.object({
    name: z.string().min(1, "Full Name is required"),
    email: z
        .string()
        .min(1, "Email is required")
        .refine((val) =>
            /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val),
            { message: "Invalid email " }
        ),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });