import Router from "express";
import ProductController from "./controllers/ProductController.js";
import authController from "./controllers/authController.js";
import validator from "express-validator";
import authMiddleware from "./middleware/authMiddleware.js";
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
router.get("/users", roleMiddleware(["USER"]), authController.getUsers);

router.post("/v1/products", ProductController.create);
router.get("/v1/products/id/:id", ProductController.read);
router.get("/v1/products/sku/:sku", ProductController.read);
router.get("/v1/products", ProductController.read);
router.put("/v1/products", ProductController.update);
router.delete("/v1/products/id/:id", ProductController.delete);
router.delete("/v1/products/sku/:sku", ProductController.delete);

export default router;
