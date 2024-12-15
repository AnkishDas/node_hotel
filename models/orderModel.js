const mongoose = require('mongoose');
const Food = require("./foodmodel");
const { Schema, model } = mongoose;



const orderSchema = new mongoose.Schema(
    {
        foods: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Food' }],
        payment: {},
        buyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
        status: {
            type: String,
            enum: ["prepairing", "process", "on the way", "delevered"],
            default: "prepairing"
        },
    }, { timestamps: true }
)

module.exports = model('Orders', orderSchema); // Singular model name
