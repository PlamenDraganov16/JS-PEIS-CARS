import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
    author: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Review = model('Review', reviewSchema, 'reviews');
export default Review;