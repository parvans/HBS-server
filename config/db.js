import mongoose from 'mongoose';
const connectDb = async ()=>{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/hbs")
        .then(()=>console.log("Connected to MongoDB..."))
        .catch((error)=>console.log(error))
    } catch (error) {
        console.log(error)
    }
};
export default connectDb;
