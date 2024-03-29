import mongoose from "mongoose";
const HallSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    url:{
        type:String,
        required:true
    },
});

const Hall= mongoose.model("Hall", HallSchema)
export default Hall