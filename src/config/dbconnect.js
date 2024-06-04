import mongoose from "mongoose";

async function connectDB() {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        return mongoose.connection;
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
}

export default connectDB;