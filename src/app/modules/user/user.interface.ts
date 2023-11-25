import { Model } from "mongoose";
import { userSchema } from "./user.model";

//user-type-interface
export type Taddress = {
    street: string;
    city: string;
    country: string;
}
export type TUserFullName = {
    firstName: string;
    lastName: string
}
export type TOrders = {
    productName?: string;
    price?: number;
    quantity?: number;
}

export type TUser = {
    userId: number;
    username: string;
    password: string;
    fullName: TUserFullName;
    age: number;
    email: string;
    isActive: boolean,
    hobbies: [string, string],
    address: Taddress,
    orders?: TOrders[]
}
export interface userModel extends Model<TUser> {
    isUserExists(userId: number): Promise<TUser | null>
}