
import mongoose from 'mongoose';
export const Mongodb= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("mongodb connected successfully");
    }
    catch(error){
        console.error("error in mongodb connection",error);
    }
}






