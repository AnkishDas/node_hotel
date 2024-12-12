const categoryModel = require("../models/catagoryModel");


const createrCatagorycontroler = async (req, res) => {
    try {
        const resturantData = req.body
        const { title, imagUrl } = req.body;
        if (!title) {
            return res.status(500).send({
                success: false,
                message: "please provide title",
            })
        }
        const newcategory = new categoryModel({
            title, imagUrl
        })

        await newcategory.save()
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


const getallcategoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({})
        if (!category) {
            return res.status(500).send({
                success: false,
                message: "no records found",
            })
        }
        res.status(200).send({
            success: true,
            totalCat: category.length,
            category
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


const updateCatcontroller = async (req, res) => {
    try {
        const { id } = req.params; // Extract category ID from URL params
        const { title, imgUrl } = req.body; // Extract new data from request body


        // const updatedCategory = await categoryModel.findByIdAndUpdate(id, { title, imgUrl }, { new: true })

        const updatedCategory = await categoryModel.findByIdAndUpdate(
            id,
            { title, imgUrl },
            { new: true } // Return the updated document
        );

        if (!updatedCategory) {
            return res.status(404).send({
                success: false,
                message: "category not found"
            })
        }
        res.status(200).send({
            success: true,
            message: "Category updated successfully",
            updatedCategory,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error in create api",
            error
        })

    }
}

const deleteCatcotroller = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(500).send({
                success: false,
                message: 'Please provide category id'
            })
        }
        const category = await categoryModel.findById(id)
        if (!category) {
            return res.status(500).send({
                success: false,
                message: 'no category found'
            })
        }

        await categoryModel.findByIdAndDelete(id);

        res.status(200).send({
            success: true,
            message: "category deleteted successfully"
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
module.exports = { createrCatagorycontroler, getallcategoryController, updateCatcontroller, deleteCatcotroller }