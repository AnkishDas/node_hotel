const categoryModel = require("../models/catagoryModel");
const foodmodel = require("../models/foodmodel");
const orderModel = require("../models/orderModel");


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

const placeOrdercontroller = async (req, res) => {
    try {
        const { cart } = req.body;

        if (!cart || cart.length === 0) {
            return res.status(400).send({
                success: false,
                message: 'Please add food items to the cart.',
            });
        }

        // Calculate total price and collect foodIds from the cart
        let total = 0;
        const foodIds = cart.map((item) => {
            total += item.price;  // Add price to total
            return item.foodId;  // Use foodId from the request
        });

        // Log the foodIds and total for debugging
        console.log('Food IDs:', foodIds);
        console.log('Total Price:', total);

        // Verify if all provided food IDs exist
        const foodItems = await foodmodel.find({ _id: { $in: foodIds } });

        // Log the result of foodItems query
        console.log('Food Items found:', foodItems);

        if (foodItems.length !== foodIds.length) {
            return res.status(400).send({
                success: false,
                message: "Some food items in the cart are invalid or do not exist.",
            });
        }

        // Ensure buyer info is available
        if (!req.user || !req.user.id) {
            return res.status(400).send({
                success: false,
                message: "Buyer information is missing.",
            });
        }

        // Log the buyer info
        console.log('Buyer Info:', req.user);

        // Create a new order with the food IDs
        const newOrder = new orderModel({
            foods: foodIds,  // Store only the food IDs
            payment: total,
            buyer: req.user.id,  // Automatically set the buyer from the authenticated user
            // You can set the default status here
        });

        await newOrder.save();

        res.status(201).send({
            success: true,
            message: "Order placed successfully.",
            newOrder,
        });
    } catch (error) {
        console.error('Error in placeOrdercontroller:', error);  // Log the error

        res.status(500).send({
            success: false,
            message: 'Error while placing order',
            error: error.message || 'Internal Server Error',
        });
    }
}

const orderstatuscontroller = async (req, res) => {
    try {
        const orderid = req.params.id
        if (!orderid) {
            return res.status(404).send({
                success: false,
                message: 'please provide valid order id'
            })
        }
        const { status } = req.body
        const order = await orderModel.findByIdAndUpdate(orderid, { status }, { new: true })
        res.status(200).send({
            success: true,
            message: 'ordr updated successfully'
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in order status api',
            error
        });
    }
}
module.exports = { createrfoodcontroler, getAllfoodcontroller, getsinglefoodbyid, getfoodbyrestrurent, updatefoodcontroller, deletefoodcontroller, placeOrdercontroller, orderstatuscontroller }