const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require('dotenv');
const connectDB = require("./config/db");


dotenv.config()

connectDB()

const app = express();
app.use(cors());
app.use(express.json())
app.use(morgan('dev'));

app.use('/api/v1/test', require("./routes/testRoutes"));
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/user', require('./routes/userroutes'));
app.use('/api/v1/resturant', require('./routes/restrurantroutes'));
app.use('/api/v1/category', require('./routes/categoryRoutes'));
app.use('/api/v1/food', require('./routes/foodRoutes'));



app.get('/', (req, res) => {
    return res.status(200).send("<h1>welcome to food server</h1>");

});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`.bgWhite.bgMagenta);
})