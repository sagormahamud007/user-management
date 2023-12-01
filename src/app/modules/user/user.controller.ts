import { NextFunction, Request, Response } from "express";
import userValidationSchema from "./user.validation";
import { userServices } from "./user.service";
//step-1 => create-user data 
const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user: userData } = req.body;
        const zodParseData = userValidationSchema.parse(userData)
        const result = await userServices.createUserIntoDB(zodParseData)
        res.status(200).json({
            success: true,
            message: "User created successfully!",
            data: result
        })
    } catch (error: unknown) {
        if (error) {
            res.status(500).json({
                success: false,
                message: error || "Something went wrong",
                error: error
            })
        }
        else {
            res.status(500).json({
                success: false,
                message: "Something went wrong",
                error: error
            })
        }
    }
    next()
}
//step-2 => Get all users data
const getUserAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userServices.getAllUsersIntoDB();
        res.status(200).json({
            success: true,
            massage: "User fetched successfully!",
            data: result
        })

    } catch (error) {
        res.status(500).json({
            code: 500,
            description: "Internal server error",
            details: error
        })
    }
    next()
}
//step-3 => single user get spacific unic ID
const getSIngleSpecificUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.userId;
        const result = await userServices.getSingleSpecificUserIntoDB(id);
        if (result) {
            res.status(200).json({
                success: true,
                massage: "User fetched successfully!",
                data: result
            })
        }
        else {
            res.status(500).json({
                success: false,
                massage: "User not found",
                error: {
                    code: 404,
                    description: "User not found!"
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            massage: 'something went wrong',
            error: error,
        });
    }
    next()
}
//step-4 => update spacific data 
const updateSpacificUserData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params
        const data = req.body;
        const result = await userServices.updateUserSpecificIntoDB(userId, data);
        if (result.modifiedCount === 1) {
            const updateData = await userServices.getSingleSpecificUserIntoDB(data.userId);
            res.status(200).json({
                success: true,
                massage: "User updated successfully!",
                data: updateData
            })
        }

        else {
            res.status(500).json({
                success: false,
                massage: "User not found",
                error: {
                    code: 404,
                    description: "User not found!"
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            massage: "User not found",
            error: {
                code: 404,
                description: "User not found!"
            }
        })
    }
    next()
}
//step-5 => user delete
const deletedSingleSpacificuUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.userId;
        const result = await userServices.singleUserDeleteIntoFormDB(id)
        if (result.modifiedCount === 1) {
            res.status(200).json({
                success: true,
                massage: "User deleted successfully!",
                data: null
            })
        } else {
            res.status(500).json({
                success: false,
                massage: "User not found!",
                error: {
                    code: 404,
                    description: "User not found!"
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            massage: "something want wrong",
            error: error
        })
    }
    next()
}

//banus-mark

// Add order
const addOrderFromDb = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.userId;
        const data = req.body;
        const result = await userServices.createOrderDataIntoDB(id, data);
        if (result.modifiedCount === 1) {
            res.status(200).json({
                success: true,
                massage: "Order created successfully!",
                data: null
            })
        } else {
            res.status(500).json({
                success: false,
                massage: "User not found!",
                error: {
                    code: 404,
                    description: "User not found!"
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            massage: "something want wrong",
            error: error
        })
    }
    next()
}
//get all order data
const getAllOrderData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.userId;
        const result = await userServices.getAllOrdersDataIntoDB(id);
        if (result) {
            res.status(200).json({
                success: true,
                massage: "Order fetched successfully!",
                data: { orders: result?.orders }
            })
        } else {
            res.status(500).json({
                success: false,
                massage: "User not found",
                error: {
                    code: 404,
                    description: "User not found!"
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            massage: 'something went wrong',
            error: error,
        })
    }
    next()
}
//Calculate Total Price of Orders for a Specific User
const userOrderTotalPrice = async (req: Request, res: Response) => {
    try {
        const id = req.params.userId;
        const result = await userServices.getUserTotalPrice(id)
        const totalPrice = await userServices.userOrderTotalPrice(result)
        res.status(200).json({
            success: true,
            massage: "Total price calculated successfully!",
            data: { totalPrice }
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            massage: "User not found",
            error: {
                code: 404,
                description: "User not found!"
            }
        })
    }
}


export const userControllers = {
    createUser,
    getUserAllUsers,
    getSIngleSpecificUser,
    updateSpacificUserData,
    deletedSingleSpacificuUser,
    addOrderFromDb,
    getAllOrderData,
    userOrderTotalPrice
}