import Router from "express";
import ProductController from "./controllers/ProductController.js";

const router = new Router();

router.post("/v1/products", ProductController.create);
router.get("/v1/products/id/:id", ProductController.read);
router.get("/v1/products/sku/:sku", ProductController.read);
router.get("/v1/products", ProductController.read);
router.put("/v1/products", ProductController.update);
router.delete("/v1/products/id/:id", ProductController.delete);
router.delete("/v1/products/sku/:sku", ProductController.delete);

/* CRUD routes*/

export default router;
