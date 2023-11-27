import { Request, Response } from "express";
import userValidationSchema from "./user.validation";
import { userServices } from "./user.service";

//step-1 => create-user data 
const createUser = async (req: Request, res: Response) => {
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
        if (error instanceof PromiseRejectionEvent) {
            res.status(500).json({
                success: false,
                message: error.reason?.message || "Something went wrong",
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
}

//step-2 => Get all users data
const getUserAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getAllUsersIntoDB();
        res.status(200).json({
            success: true,
            massage: "student found successfully",
            data: result
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            massage: "something went wrong",
            error: error
        })
    }
}

//step-3 => single user get spacific unic ID
const getSIngleSpecificUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.userId;
        const result = await userServices.getSingleSpecificUserIntoDB(id);
        res.status(200).json({
            success: true,
            massage: "student found successfully",
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            massage: "user not found",
            data: error
        })
    }
}

export const userControllers = {
    createUser,
    getUserAllUsers,
    getSIngleSpecificUser
}