import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import Users from "./models/Users.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();
const app = express();

app.use(express.json());
app.use(userRoutes);
app.use("/api/auth", userRoutes); // for login and register
//app.use(cors());
const port = process.env.PORT;

(async () => {
    try{
        await sequelize.authenticate();
        console.log("database created");

        await sequelize.sync();
        console.log("Table created");
    } catch(error){
        console.error("Database connection error", error);
    }
})();

app.listen(port, () => {
    console.log(`app started at port: ${port}`);
})