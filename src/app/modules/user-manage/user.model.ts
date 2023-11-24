import { Schema, model } from "mongoose";
import { TUserFullName, Taddress, TUser, TOrders } from "./user.interface";

const userNameSchema = new Schema<TUserFullName>({
    firstName: {
        type: String,
        required: [true, "FirsName is required"],
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    }
})

const userAddressSchema = new Schema<Taddress>({
    street: {
        type: String,
        required: [true, "Street is required"]
    },
    city: {
        type: String,
        required: [true, "City is required"]
    },
    country: {
        type: String,
        required: [true, "Country is required"]
    }
})

const ordersSchema = new Schema<TOrders>({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
})

const userSchema = new Schema<TUser>({
    userId: { type: Number, required: true, unique: true },
    username: { type: String, required: [true, "User name is required"], unique: true },
    password: { type: String, required: [true, "Password is required"] },
    fullName: userNameSchema,
    age: { type: Number, required: [true, "Age is required"] },
    email: { type: String, required: [true, "Email is requierd"] },
    isActive: { type: Boolean, required: [true, "User active status required true or false"] },
    hobbies: { type: [String], required: [true, "Hobbies option as required"] },
    address: userAddressSchema,
    orders: [ordersSchema]
})

export const user = model<TUser>("user", userSchema)