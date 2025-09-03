const { z } = require("zod");

const signupSchema = z.object({
    email: z.email({ message: "Invalid email address" }),
    password: z.string().min(6, "Password must be at aleast 6 characters"),
    adminkey: z.string().min(1, "Wrong Admin Key. Contact the System Admin.")
});

// Define the zod schema for initial validation
const loginSchema = z.object({
    email: z.email({ message: "Invalid email address" }),
    password: z.string().min(6, "Password must be at aleast 6 characters")
});

const cardSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required").optional(),
    // Use z.array(z.string()) to validate  an array of strings for the interest section.
    interests: z.array(z.string()).min(1, "At least one interest is required").optional(),
    linkedin: z.url({ message: "Invalid LinkedIn URL" }).optional(),
    twitter: z.url({ message: "Invalid Twitter URL" }).optional(),
    instagram: z.url({ message: "Invalid Instagram URL" }).optional(),
});

const updateCardSchema = cardSchema.partial();

module.exports ={
    signupSchema: signupSchema,
    loginSchema: loginSchema,
    cardSchema: cardSchema,
    updateCardSchema: updateCardSchema,
}