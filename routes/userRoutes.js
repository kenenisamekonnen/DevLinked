import { Router } from "express";
import Users from "../models/Users.js";
import { register } from "../controllers/auth.controller.js";
import { getUsers } from "../controllers/users.controller.js";

const router = Router();

// router.post("/users", async (req, res) => {
//     try{
//         const user = await Users.create(req.body);
//         res.status(200).json(user);
//     } catch(error){
//         res.status(400).json({error: "something went wrong"});
//     }
// })

router.post("/register", register);
router.get("/users", getUsers);
export default router;