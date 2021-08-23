import { buildSchema } from "graphql";

const schema = buildSchema(`
    type Product {
        _id: ID
        sku: String
        type: String
        name: String
        price: Int
    }
   type Query {
        getProduct(id: ID, sku: String): [Product]
   }
   type Mutation { 
       createProduct(sku: String, type: String, name: String, price: Int): Product
       updateProduct(id: ID, sku: String, type: String, name: String, price: Int): Product
       deleteProduct(id: ID, sku: String): Product
   }
`);
export default schema;
