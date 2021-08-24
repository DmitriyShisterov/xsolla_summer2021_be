export const PORT_APP = 3000;
const DB_USER = "dmishisterov";
const DB_PASS = "9dZKuAWUUjZFKaKc";
export const DB_URL = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.usymf.mongodb.net/xsolla_summer2021_be?retryWrites=true&w=majority`;
const SECRET = {
    secret: "SECRET_KEY_RANDOM",
    refresh: "REFRESH_KEY_RANDOM",
};
export default SECRET;
