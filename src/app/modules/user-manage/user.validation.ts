import { ZodError, z } from "zod";
import { TUser } from "./user.interface";

const TUserFullNameSchema = z.object({
    firstName: z.string().min(1).max(20, { message: "First Name is required" }),
    lastName: z.string().min(1).max(20).optional()
});

const TAddressSchema = z.object({
    street: z.string().min(1).max(30, { message: "Street is required" }),
    city: z.string().min(1).max(20, { message: "City is required" }),
    country: z.string().min(1).max(20, { message: "Country is required" })
})
const TOrdersSchema = z.object({
    productName: z.string().min(1).max(255, { message: "Product Name is required" }),
    price: z.number().min(0, { message: "Price is required" }),
    quantity: z.number().min(0, { message: "Quantity is required" }),
});

const userValidationSchema = z.object({
    userId: z.number().int().positive("User id must be positive int")
        .min(1, { message: "User ID is required" }),
    username: z.string().min(1).max(20, { message: "Username is required" }),
    password: z.string().min(1).max(20, { message: "Password is required" }),
    fullName: TUserFullNameSchema,
    age: z.number().int().positive("Age must be a positive number"),
    email: z.string().email('Invalid email formet'),
    isActive: z.boolean().refine(value => value !== undefined, { message: 'User active status is required' }),
    hobbies: z.array(z.string().min(1).max(20, { message: "Hobbies is required" })),
    address: TAddressSchema,
    orders: TOrdersSchema
})

export const userZodValidationSchema = userValidationSchema;

export const validateUser = (data: TUser) => {
    try {
        userValidationSchema.parse(data)
    } catch (error) {
        if (error instanceof ZodError) {
            console.error('Validation error:', error.errors);
        }
        return false;
    }
}