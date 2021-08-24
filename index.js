import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import router from "./router.js";
import { DB_URL, PORT_APP } from "./config/config.js";
import { graphqlHTTP } from "express-graphql";
import schema from "./models/SchemaGQL.js";
import Product from "./models/Product.js";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT ?? PORT_APP;
const app = express();

const root = {
    getProduct: (args) => {
        switch (Object.keys(args)[0]) {
            case "id":
                return Product.findById(args.id);
                break;
            case "sku":
                console.log(args);
                return Product.find(args);
                break;
            default:
                return Product.find(args);
                break;
        }
    },
    createProduct: (args) => {
        const { sku, type, name, price } = args;
        return Product.create({ sku, type, name, price });
    },
    updateProduct: (args) => {
        switch (Object.keys(args)[0]) {
            case "id":
                return Product.findByIdAndUpdate(args.id, args, {
                    new: true,
                });
                break;
            case "sku":
                return Product.findOneAndUpdate(args.sku, args, {
                    new: true,
                });
                break;
            default:
                break;
        }
    },
    deleteProduct: (args) => {
        switch (Object.keys(args)[0]) {
            case "id":
                return Product.findByIdAndDelete(args.id);
                break;
            case "sku":
                return Product.findOneAndRemove(args.sku);
                break;
        }
    },
};

app.use(express.json());
app.use(cookieParser());
app.use("/api/", router);
app.use("/auth", router);
app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    })
);

async function startApp() {
    try {
        await mongoose.connect(DB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false,
        });
        app.listen(PORT, () => {
            console.log(`server has been started on port ${PORT}...`);
        });
    } catch (error) {
        console.log(error);
    }
}
startApp();
