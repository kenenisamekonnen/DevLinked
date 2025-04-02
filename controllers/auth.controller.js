import Users from "../models/Users.js";

// export const register = async (req, res) => {
//     try{
//         const user = await Users.create(req.body);
//         res.status(200).json(user);
//     } catch(error){
//         console.log("user added to table", error);
//     }
// };

export const register = async (req, res) => {
    const {email, firstName, lastName, password} = req.body();
}

