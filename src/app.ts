import express, { Application, Request, Response } from "express"
import cors from "cors"
import { UsersRoutes } from "./app/modules/user/user.route"
const app: Application = express()

//parsers
app.use(express.json())
app.use(cors())

//application routes
app.use('/', UsersRoutes);

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the API of second assignment"
    })
});

export default app;