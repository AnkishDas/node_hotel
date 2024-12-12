const { Schema, model } = require('mongoose');


const userSchema = new Schema({
    userName: {
        type: String,
        require: [true, 'username is required']
    },
    email: {
        type: String,
        require: [true, 'email is required']
    },
    password: {
        type: String,
        require: [true, 'password is required']
    },
    address: {
        type: Array,

    },
    phone: {
        type: String,
        require: [true, 'phone no is required']
    },
    usertype: {
        type: String,
        require: [true, 'user type is required'],
        default: 'client',
        enum: ['client', 'admin', 'vendor', 'driver']
    },
    profile: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png'
    },
    answer: {
        type: String,
        required: [true, "Answer is requered"],
    },

}, { timestamps: true })

// export default model('user', userSchema);

module.exports = model('user', userSchema);

