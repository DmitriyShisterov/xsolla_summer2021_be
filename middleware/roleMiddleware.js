import jwt from "jsonwebtoken";
import SECRET from "../config/config.js";
const roleMiddleware = function (roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next();
        }
        try {
            const token = req.headers.authorization.split(" ")[1];
            console.log("token:", token);
            if (!token) {
                return res.status(400).json({ message: "Access denided, token incorrect" });
            }
            const { roles: userRoles } = jwt.verify(token, SECRET.secret);
            console.log("userRoles:", userRoles);
            let hasRole = false;
            userRoles.forEach((role) => {
                if (roles.includes(role)) {
                    hasRole = true;
                }
            });
            if (!hasRole) {
                return res.status(400).json({ message: "Access denided, required role not found" });
            }
            next();
        } catch (e) {
            console.log(e);
            return res.status(400).json({ message: "Access denided, error authorization" });
        }
    };
};
export default roleMiddleware;
