//join this path dotenv and export port and database_url
import dotenv from 'dotenv'
import path from "path"
dotenv.config({ path: path.join((process.cwd(), '.env')) })

export default {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL
}