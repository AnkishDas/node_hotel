const { Schema, model } = require('mongoose');


const categorySchema = new Schema({
    title: {
        type: String,
        required: [true, 'category title is requered']
    },
    imageUrl: {
        type: String,
        default: 'https://www.google.com/imgres?q=logo&imgurl=https%3A%2F%2Fmarketplace.canva.com%2FEAFaFUz4aKo%2F2%2F0%2F400w%2Fcanva-yellow-abstract-cooking-fire-free-logo-8iEUG5R0yQ4.jpg&imgrefurl=https%3A%2F%2Fwww.canva.com%2Ftemplates%2Fs%2Ffood-logo%2F&docid=UFP4zOfACVBHDM&tbnid=y94L_fvFWONiBM&vet=12ahUKEwi-0IbQw5GKAxWaka8BHdsDMdoQM3oECGoQAA..i&w=400&h=400&hcb=2&ved=2ahUKEwi-0IbQw5GKAxWaka8BHdsDMdoQM3oECGoQAA'
    },

}, { timestamps: true });

module.exports = model('Category', categorySchema);

