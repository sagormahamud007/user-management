import { Schema, model } from "mongoose";
import { TUserFullName, Taddress, TUser, TOrders, userModel } from "./user.interface";

const userNameSchema = new Schema<TUserFullName>({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    }
})

const userAddressSchema = new Schema<Taddress>({
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true }
})

const ordersSchema = new Schema<TOrders>({
    productName: { type: String },
    price: { type: Number },
    quantity: { type: Number }
})

export const userSchema = new Schema<TUser, userModel>({
    userId: { type: Number, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, },
    fullName: { type: userNameSchema, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    hobbies: { type: [String], required: true },
    address: { type: userAddressSchema, required: true },
    orders: { type: [ordersSchema] }
})

export const User = model<TUser, userModel>("User", userSchema)

userSchema.statics.isUserExists = async function () {
    const existingUser = await User.findOne({ userId: Number })
    return existingUser
}
