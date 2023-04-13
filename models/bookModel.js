import mongoose from "mongoose";
const BookSchema = new mongoose.Schema({
        date: { 
            type: Date, 
            required: true 
        },
        hallId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Hall", 
            required: true 
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        reason: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
);

const Book = mongoose.model("Book", BookSchema);
export default Book