import User from "../models/User.js";
import TokenService from "./TokenService.js";
import Role from "../models/Role.js";
import Bcrypt from "bcryptjs";
class AuthService {
    constructor() {}
    async registration(params) {
        const { userName, userPassword } = params;
        const candidate = await User.findOne({ userName });
        if (candidate) {
            return { message: "User already exist" };
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
        return { message: "User was created" };
    }
    async login(params) {
        const { userName, userPassword } = params;
        const user = await User.findOne({ userName });
        if (!user) {
            return { message: "User not found" };
        }
        const validPassword = Bcrypt.compareSync(userPassword, user.userPassword);
        if (!validPassword) {
            return { message: "Password incorrect" };
        }
        const tokenService = new TokenService();
        const tokens = tokenService.generateTokens(user._id, user.userRole);
        tokenService.saveTokens(user._id, tokens.refreshToken);
        return tokens;
    }
}
export default AuthService;
