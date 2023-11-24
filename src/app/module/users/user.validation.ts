import { z } from "zod";

const UserNameValidationSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
});

const AddressValidationSchema = z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
});

const ordersValidationSchema = z.object({
    productName: z.string(),
    price: z.number(),
    quantity: z.number()
})

export const UserValidationSchema = z.object({
    userId: z.number(),
    username: z.string(),
    password: z.string(),
    fullName: UserNameValidationSchema,
    age: z.number(),
    email: z.string().email(),
    isActive: z.boolean(),
    hobbies: z.array(z.string()),
    address: AddressValidationSchema,
    orders: z.array(ordersValidationSchema).optional(), 
    isDeleted: z.boolean().default(false)
});