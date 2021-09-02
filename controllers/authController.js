import User from "../models/User.js";
import Role from "../models/Role.js";
import validator from "express-validator";
import AuthService from "../services/AuthService.js";

class authController {
    async registration(req, res) {
        try {
            const errors = validator.validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Registration error", errors });
            }
            const authService = new AuthService();
            const answer = await authService.registration(req.body);
            return res.json(answer);
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: "Registration error" });
        }
    }
    async login(req, res) {
        try {
            const authService = new AuthService();
            const answer = await authService.login(req.body);
            res.cookie("refreshToken", answer.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.json({ ...answer });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: "Login error" });
        }
    }
    async refresh(req, res) {
        try {
            const { refreshToken } = req.cookies;
            console.log("refreshToken(controller):", refreshToken);
            const authService = new AuthService();
            const answer = await authService.refresh(refreshToken);
            res.cookie("refreshToken", answer.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.json({ ...answer });
        } catch (e) {}
    }
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (e) {
            console.log(e);
        }
    }
}

export default new authController();
