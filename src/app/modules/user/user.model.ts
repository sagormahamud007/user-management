import { Schema, model } from "mongoose";
import { TUserFullName, Taddress, TUser, TOrders } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";

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

export const userSchema = new Schema<TUser>({
    userId: { type: Number, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, },
    fullName: { type: userNameSchema, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    hobbies: [{ type: String, required: true }],
    address: { type: userAddressSchema, required: true },
    orders: { type: [ordersSchema] || undefined },
    isDeleted: { type: Boolean, default: false }
})

userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(
        this.password,
        Number(config.bcrypt_salt_rounds)
    )
    next()
})
userSchema.post('save', async function (doc, next) {
    doc.password = ''
    next()
})


export const User = model<TUser>("User", userSchema)