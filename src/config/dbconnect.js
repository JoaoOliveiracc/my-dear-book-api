import mongoose from "mongoose";

async function connectDB() {
    mongoose.connect("mongodb+srv://ccjoaomonteiro:root@cluster0.2puvqlu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

    return mongoose.connection;
}

export default connectDB;