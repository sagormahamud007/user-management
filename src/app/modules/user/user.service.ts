import { TOrders, TUser } from "./user.interface";
import { User } from "./user.model";
//step-1 => user create
const createUserIntoDB = async (userData: TUser) => {
    const result = await User.create(userData)
    return result;
}
//step-2 => get all users data from DB
const getAllUsersIntoDB = async () => {
    const result = await User.find({}, { username: 1, fullName: 1, age: 1, email: 1, address: 1, orders: 1 });
    return result
}
//step-3 => specific user get from DB
const getSingleSpecificUserIntoDB = async (userId: string) => {
    const result = await User.findOne(
        { userId },
        {
            userId: 1,
            username: 1,
            fullName: 1,
            age: 1,
            email: 1,
            address: 1,
            orders: 1
        }
    );
    return result;
}
//step-4 => update specific user data
const updateUserSpecificIntoDB = async (id: string, updateUser: TUser) => {
    const { userId, username, password, fullName, age, email, isActive, hobbies, address } = updateUser;
    const result = await User.updateOne({ userId: id }, {
        $set: {
            userId, username, password, fullName, age, email, isActive, hobbies, address
        }

    });
    return result
}
//step-5 => create an order data
const createOrderDataIntoDB = async (id: string, createOrder: TOrders) => {
    const result = await User.updateOne({ userId: id }, { $push: { orders: createOrder } });
    return result
}

//step-6 => single user deleted data
const singleUserDeleteIntoFormDB = async (id: string) => {
    const result = await User.updateOne({ userId: id }, { $set: { isDeleted: true } })
    return result
}



export const userServices = {
    createUserIntoDB,
    getAllUsersIntoDB,
    getSingleSpecificUserIntoDB,
    updateUserSpecificIntoDB,
    singleUserDeleteIntoFormDB,
    createOrderDataIntoDB
}