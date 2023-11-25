import { Request, Response } from "express";
// import { userServices } from "./user.service";
import userValidationSchema from "./user.validation";
import { User } from "./user.model";


const createUser = async (req: Request, res: Response) => {
    try {
        const { user: userData } = req.body;
        const zodParseData = userValidationSchema.parse(userData)
        const result = await User.create(zodParseData)
        console.log(result);
        res.status(200).json({
            success: true,
            message: "User created successfully!",
            data: result
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong",
            error: error
        })
    }
}

export const userControllers = {
    createUser
}