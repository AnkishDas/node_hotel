const resturentModel = require("../models/resturentModel");

const createrResturantcontroler = async (req, res) => {
    try {
        const resturantData = req.body
        const { title, imagUrl, foods, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code, coords } = req.body;
        if (!title || !coords) {
            return res.status(500).send({
                success: false,
                message: "please provide title and address",
            })
        }
        const newresturant = new resturentModel({
            title, imagUrl, foods, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code, coords
        })

        await newresturant.save()
        res.status(201).send({
            success: true,
            message: "new resturant created successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error in create api",
            error
        })

    }
}

const getAllresturantcontroller = async (req, res) => {
    try {
        const resturant = await resturentModel.find({})
        if (!resturant) {
            return res.status(404).send({
                success: false,
                message: "no resturant available"
            })
        }
        res.status(200).send({
            success: true,
            totalCount: resturant.length,
            resturant
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error in resturamt api",
            error
        })

    }
}
const getbyIdresturantControler = async (req, res) => {
    try {
        const { id } = req.params; // Access the `id` from params
        if (!id) {
            return res.status(400).json({ message: 'ID is required' });
        }
        const resturant = await resturentModel.findById(id)

        if (!resturant) {
            return res.status(404).send({
                success: false,
                message: "no resturant available"
            })
        }
        res.status(200).send({
            success: true,
            totalCount: resturant.length,
            resturant
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error in resturamt api",
            error
        }
        )
    }
}

const deleteresturantbyIdControler = async (req, res) => {
    try {
        const { id } = req.params; // Access the `id` from params
        if (!id) {
            return res.status(400).json({ message: 'ID is required' });
        }
        const deletedRestaurant = await resturentModel.findByIdAndDelete(id);

        // Handle the case where no restaurant was found for the given ID
        if (!deletedRestaurant) {
            return res.status(404).json({
                success: false,
                message: 'Restaurant not found'
            });
        }

        // Success response
        res.status(200).send({
            success: true,
            message: 'Restaurant deleted successfully',
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error in resturamt api",
            error
        }
        )
    }
}

module.exports = { createrResturantcontroler, getAllresturantcontroller, getbyIdresturantControler, deleteresturantbyIdControler }