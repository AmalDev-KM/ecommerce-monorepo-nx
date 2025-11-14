import mongoose from "mongoose";

export const connectDB = async (mongoDbUrl: string) => {
    try {
        if(!mongoDbUrl){
            throw new Error("MongoDB URL is not defined");
        }
        await mongoose.connect(mongoDbUrl);
        console.log("MongoDb connected successfully...")
    } catch (error) {
        console.error("MongoDb connection failed:", error);
        process.exit(1);
    }
}