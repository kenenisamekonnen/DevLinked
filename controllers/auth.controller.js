import Users from "../models/Users.js";
import { hashPassword } from "../util/jwt.js";
import { comparePassword } from "../util/jwt.js";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {

    try {
        const {email, firstName, lastName, password, role} = req.body;

        const userExist = await Users.findOne({ where: { email } });
        if(userExist) return res.status(201).json({ message: "Email already exist"});

        const hashedPassword = await hashPassword(password);
        const newUser = await Users.create({email, firstName, lastName, password: hashedPassword, role});
        console.log(newUser);
        res.status(201).json({ message: "User succcesfully registerd", user: newUser });
    } catch (err) {
        console.error("Sequelize error:", err);
        res.status(500).json({message: err.message});
    }
};

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await Users.findOne({ where: {email}});
        if(!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await comparePassword(password, user.password);
        if(!isMatch) return res.status(400).json({ message: "Invalid credentials"});

        const token = jwt.sign({ id: user.id, role: user.role}, process.env.JWT_SECRET, { expiresIn: '1h'});
        res.status(200).json({ message: "Login successful", token});

    } catch(err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server Error"});
    }
};

