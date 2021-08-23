import jwt from "jsonwebtoken";
import SECRET from "../config/config.js";
const roleMiddleware = function (roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next();
        }
        try {
            const token = req.headers.authorization.split(" ")[1];
            if (!token) {
                return res.status(400).json({ message: "Access denided (token)" });
            }
            const { roles: userRoles } = jwt.verify(token, SECRET.secret);
            let hasRole = false;
            userRoles.forEach((role) => {
                if (roles.includes(role)) {
                    hasRole = true;
                }
            });
            if (!hasRole) {
                return res.status(400).json({ message: "Access denided2" });
            }
            next();
        } catch (e) {
            console.log(e);
            return res.status(400).json({ message: "Access denided3" });
        }
    };
};
export default roleMiddleware;
