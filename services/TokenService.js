import jwt from "jsonwebtoken";
import tokenModel from "../models/Token.js";
import SECRET from "../config/config.js";
class TokenService {
    generateTokens = (id, roles) => {
        const payload = {
            id,
            roles,
        };
        const accessToken = jwt.sign(payload, SECRET.secret, { expiresIn: "24h" });
        const refreshToken = jwt.sign(payload, SECRET.refresh, { expiresIn: "30d" });
        return {
            accessToken,
            refreshToken,
        };
    };
    async saveTokens(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({ user: userId });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await tokenModel.create({ user: userId, refreshToken });
        return token;
    }
}
export default TokenService;
