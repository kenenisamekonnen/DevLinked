import Users from "../models/Users.js";

export const getUsers = async (req, res) => {
    const users = await Users.call(req.body);
    res.stutus(200).json(users);
};

export const user = async (req, res) => {
    const id = parseInt(req.params.id);
    const userPro = Users.find
} 