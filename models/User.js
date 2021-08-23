import mongoose from "mongoose";

const User = new mongoose.Schema({
    userName: { type: String, unique: true, required: true },
    userPassword: { type: String, unique: true, required: true },
    userRole: [{ type: String, ref: "Role" }],
});

export default mongoose.model("User", User);
