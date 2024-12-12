const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const foodSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Food title is required'],
        },
        description: {
            type: String,
            required: [true, 'Food description is required'],
        },
        price: {
            type: Number,
            required: [true, 'Food price is required'],
        },
        imgUrl: {
            type: String,
        },
        foodTags: {
            type: [String], // Array of tags
        },
        category: {
            type: String,
        },
        code: {
            type: String,
        },
        isAvailable: {
            type: Boolean,
            default: true,
        },
        restaurant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Resturant', // Ensure this matches the referenced model
        },
        rating: {
            type: Number,
            default: 5,
            min: 1,
            max: 5,
        },
        ratingCount: {
            type: Number,
            default: 0, // Default value
        },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = model('Food', foodSchema); // Singular model name
