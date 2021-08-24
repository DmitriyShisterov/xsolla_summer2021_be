import User from "../models/User.js";
import Role from "../models/Role.js";
import Bcrypt from "bcryptjs";
import validator from "express-validator";
import TokenService from "../services/TokenService.js";

class authController {
    async registration(req, res) {
        try {
            const errors = validator.validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Registration error", errors });
            }
            const { userName, userPassword } = req.body;
            const candidate = await User.findOne({ userName });
            if (candidate) {
                return res.status(400).json({ message: "User already exist" });
            }
            const salt = Bcrypt.genSaltSync(7);
            const hashUserPassword = Bcrypt.hashSync(userPassword, salt);
            const uRole = await Role.findOne({ value: "USER" });
            const user = new User({
                userName,
                userPassword: hashUserPassword,
                userRole: [uRole.value],
                isActivated: true,
            });
            await user.save();
            return res.json({ message: "User was registred" });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: "Registration error" });
        }
    }
    async login(req, res) {
        try {
            const { userName, userPassword } = req.body;
            const user = await User.findOne({ userName });
            console.log("user:", user);
            if (!user) {
                return res.status(400).json({ messahe: "User not found" });
            }
            const validPassword = Bcrypt.compareSync(userPassword, user.userPassword);
            if (!validPassword) {
                return res.status(400).json({ messahe: "Password incorrect" });
            }
            const tokenService = new TokenService();
            const tokens = tokenService.generateTokens(user._id, user.userRole);
            await tokenService.saveTokens(user._id, tokens.refreshToken);
            res.cookie("refreshToken", tokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.json({ ...tokens });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: "Login error" });
        }
    }
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.status(200).json(users);
            res.json("server work");
        } catch (e) {}
    }
}

export default new authController();
