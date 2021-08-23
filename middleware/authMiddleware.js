import jwt from "jsonwebtoken";
import SECRET from "../config/config.js";
const authMiddleware = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(req.headers);
        if (!token) {
            return res.status(400).json({ message: "Access denided" });
        }
        const decodedData = jwt.verify(token, SECRET.secret);
        req.user = decodedData;
        next();
    } catch (e) {
        console.log(e);
        return res.status(400).json({ message: "Access denided" });
    }
};
export default authMiddleware;
