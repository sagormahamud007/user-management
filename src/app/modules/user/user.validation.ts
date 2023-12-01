import { z } from "zod";

const TUserFullNameSchema = z.object({
    firstName: z.string().min(1).max(20, { message: "First Name is required" }),
    lastName: z.string().min(1).max(20, { message: "Last Name is required" })
});

const TAddressSchema = z.object({
    street: z.string().min(1).max(30, { message: "Street is required" }),
    city: z.string().min(1).max(20, { message: "City is required" }),
    country: z.string().min(1).max(20, { message: "Country is required" })
})
const TOrdersSchema = z.object({
    productName: z.string().min(1).max(255, { message: "Product Name is required" }).optional(),
    price: z.number().min(0, { message: "Price is required" }).optional(),
    quantity: z.number().min(0, { message: "Quantity is required" }).optional(),
});

const userValidationSchema = z.object({
    userId: z.number().int().positive(` ,User id must be positive int`).min(1, { message: "User ID is required" }),
    username: z.string().min(1).max(20, { message: "Username is required" }),
    password: z.string().min(1).max(20, { message: "Password is required" }),
    fullName: TUserFullNameSchema
        .refine(value => !!value.firstName || !!value.lastName, {
            message: "At least one of the first name or last name is required"
        }),
    age: z.number().int().positive("Age must be a positive number"),
    email: z.string().email('Invalid email formet'),
    isActive: z.boolean(),
    hobbies: z.array(z.string()),
    address: TAddressSchema.refine(value => !!value.street || !!value.city || !!value.country, {
        message: "At least one of the first street, city or quantity is required"
    }),
    orders: z.array(TOrdersSchema).optional(),
    isDeleted: z.boolean().default(false)
})


export default userValidationSchema;