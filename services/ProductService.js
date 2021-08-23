import Product from "../models/Product.js";
class ProductService {
    constructor() {}
    create(params) {
        const { sku, type, name, price } = params;
        return Product.create({ sku, type, name, price });
    }

    read(params) {
        switch (Object.keys(params)[0]) {
            case "id":
                return Product.findById(params.id);
                break;
            case "sku":
                return Product.find(params);
                break;
            default:
                return Product.find(params);
                break;
        }
    }

    update(params) {
        if (params._id) {
            return Product.findByIdAndUpdate(params._id, params, {
                new: true,
            });
        }
        if (params.sku) {
            return Product.findOneAndUpdate(params.sku, params, {
                new: true,
            });
        }
        if (!params._id && !params.sku) {
            return { message: "Content for update not found" };
        }
    }

    delete(params) {
        switch (Object.keys(params)[0]) {
            case "id":
                return Product.findByIdAndDelete(params.id);
                break;
            case "sku":
                return Product.findOneAndDelete(params);
                break;
        }
    }
}
export default ProductService;
