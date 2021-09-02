import Router from "express";
import ProductController from "./controllers/ProductController.js";
import authController from "./controllers/authController.js";
import validator from "express-validator";
import roleMiddleware from "./middleware/roleMiddleware.js";

const router = new Router();

router.post(
    "/registration",
    [
        validator.check("userName", "Please check userName").notEmpty(),
        validator.check("userPassword", "Password incorrect").isLength({ min: 4, max: 10 }),
    ],
    authController.registration
);
router.post("/login", authController.login);
router.get("/refresh", authController.refresh);

router.get("/users", roleMiddleware(["ADMIN"]), authController.getUsers);
router.post("/v1/products", roleMiddleware(["ADMIN"]), ProductController.create);
router.get("/v1/products/id/:id", roleMiddleware(["USER", "ADMIN"]), ProductController.read);
router.get("/v1/products/sku/:sku", roleMiddleware(["USER", "ADMIN"]), ProductController.read);
router.get("/v1/products", roleMiddleware(["USER", "ADMIN"]), ProductController.read);
router.put("/v1/products", roleMiddleware(["ADMIN"]), ProductController.update);
router.delete("/v1/products/id/:id", roleMiddleware(["ADMIN"]), ProductController.delete);
router.delete("/v1/products/sku/:sku", roleMiddleware(["ADMIN"]), ProductController.delete);

export default router;
