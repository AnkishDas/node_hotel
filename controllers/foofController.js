const categoryModel = require("../models/catagoryModel");
const foodmodel = require("../models/foodmodel");


const createrfoodcontroler = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            imgUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating,
            ratingCount,
        } = req.body;

        // Validate required fields
        if (!title || !description || !price || !restaurant) {
            return res.status(400).send({
                success: false,
                message: 'Please provide all required fields: title, description, price, and resturanr.',
            });
        }

        // Create new food item
        const newFood = new foodmodel({
            title,
            description,
            price,
            imgUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating,
            ratingCount,
        });

        // Save to database
        await newFood.save();

        // Respond with success
        res.status(201).send({
            success: true,
            message: 'New food item created successfully!',
            newFood,
        });
    } catch (error) {
        console.error('Error in createrfoodcontroler:', error);

        // Use a default status code for unexpected errors
        res.status(500).send({
            success: false,
            message: 'Error while creating food item',
            error: error.message || 'Internal Server Error', // Use a fallback message
        });
    }
};


const getAllfoodcontroller = async (req, res) => {
    try {
        const food = await foodmodel.find({});
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "no food found"
            })
        }
        res.status(200).send({
            success: true,
            totalfoodlength: food.length,
            food,
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error while creating food item',
            error: error.message || 'Internal Server Error', // Use a fallback message
        });
    }
}

const getsinglefoodbyid = async (req, res) => {
    try {

        const foodId = req.params.id

        if (!foodId) {
            return res.status(400).send({
                success: false,
                message: 'No food ID provided',
            });
        }

        const food = await foodmodel.findById(foodId);
        if (!food) {
            return res.status(500).send({
                success: false,
                message: 'there is no food',

            });
        }

        res.status(200).send({
            success: true,
            food,
        })



    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error while creating food item',
            error: error.message || 'Internal Server Error', // Use a fallback message
        });
    }
}

const getfoodbyrestrurent = async (req, res) => {
    try {

        const resturantid = req.params.id
        if (!resturantid) {
            return res.status(400).send({
                success: false,
                message: 'please provide id',
            });
        }
        const food = await foodmodel.find({ restaurant: resturantid }).populate('restaurant');
        if (!food || food.length === 0) {
            return res.status(404).send({
                success: false,
                message: 'No food items found for the provided restaurant ID.',
            });
        }

        res.status(200).send({
            success: true,
            message: "food based on resturant",
            food,
        })



    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error while creating food item',
            error: error.message || 'Internal Server Error', // Use a fallback message
        });
    }
}

const updatefoodcontroller = async (req, res) => {
    try {
        const foodId = req.params.id

        if (!foodId) {
            return res.status(400).send({
                success: false,
                message: 'No food ID provided',
            });
        }

        const food = await foodmodel.findById(foodId);
        if (!food) {
            return res.status(500).send({
                success: false,
                message: 'there is no food',

            });
        }
        const {
            title,
            description,
            price,
            imgUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating,
            ratingCount,
        } = req.body;

        const updatedFood = await foodmodel.findByIdAndUpdate(foodId, {
            title,
            description,
            price,
            imgUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating,
            ratingCount,
        }
            , { new: true })
        return res.status(200).send({
            success: true,
            message: 'Food item updated successfully!',
            updatedFood,
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error while creating food item',
            error: error.message || 'Internal Server Error', // Use a fallback message
        });
    }
}

const deletefoodcontroller = async (req, res) => {
    try {
        const foodId = req.params.id

        if (!foodId) {
            return res.status(400).send({
                success: false,
                message: 'No food ID provided',
            });
        }

        const food = await foodmodel.findById(foodId);
        if (!food) {
            return res.status(500).send({
                success: false,
                message: 'there is no food',

            });
        }
        await foodmodel.findByIdAndDelete(foodId)
        return res.status(200).send({
            success: true,
            message: 'Food item deleted successfully!',
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error while creating food item',
            error: error.message || 'Internal Server Error', // Use a fallback message
        });
    }
}
module.exports = { createrfoodcontroler, getAllfoodcontroller, getsinglefoodbyid, getfoodbyrestrurent, updatefoodcontroller, deletefoodcontroller }