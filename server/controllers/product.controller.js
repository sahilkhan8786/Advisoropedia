const Product = require("../models/ProductModel");

const getProducts = async (req, res) => {
    const { page, pageSize } = req.query;
    const startIndex = (page - 1) * pageSize;

    try {

        const products = await Product.find({})
            .skip(startIndex)
            .limit(parseInt(pageSize))


        const totalCount = await Product.countDocuments()

        res.json({
            currentPage: parseInt(page),
            pageSize: parseInt(pageSize),
            totalPages: Math.ceil(totalCount / pageSize),
            totalItems: totalCount,
            products,
        });
    } catch (error) {
        console.log(error);
    }
}
const getSingleProducts = async (req, res) => {
    try {
        const { id } = req.params
        const products = await Product.find({ _id: id })
        return res.status(200).json({ status: true, message: products })


    } catch (error) {
        console.log(error);
    }
}

module.exports = { getProducts, getSingleProducts }