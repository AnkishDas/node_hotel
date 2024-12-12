const { Schema, model } = require('mongoose');


const resturantSchema = new Schema({
    title: {
        type: String,
        required: [true, 'resturant title is requered']
    },
    imagUrl: {
        type: String,
    },
    foods: { type: Array },
    time: {
        type: String,
    },
    pickup: {
        type: Boolean,
        default: true
    },
    delivery: {
        type: Boolean,
        default: true
    },
    isOpen: {
        type: Boolean,
        default: true

    },
    logoUrl: {
        type: String,

    },
    rating: {
        type: Number,
        default: 1,
        min: 1,
        max: 5
    },
    ratingCount: { type: String },
    code: {
        type: String,
    },
    coords: {
        id: { type: String, },
        latitude: { type: Number },
        latitudeDelta: { type: Number },
        longitude: { type: Number },
        longitudeDelta: { type: String },
        address: { type: String },
        title: { type: String }
    }

}, { timestamps: true });

module.exports = model('Resturant', resturantSchema);

