import { OrdreModel } from "../../model/Order.model.js";

export const createOrder = async (req, res) => {
    try {
        const created = new OrdreModel(req.body)
        await created.save()
        res.status(201).json(created)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error creating an order, please trying again later' })
    }
}

export const getOrderByUserId = async (req, res) => {
    try {
        const { id } = req.params
        const results = await OrdreModel.find({ user_id: id })
        res.status(200).json(results)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error fetching orders, please trying again later' })
    }
}

export const getAllOrder = async (req, res) => {
    try {
        let skip = 0
        let limit = 0

        if (req.query.page && req.query.limit) {
            const pageSize = req.query.limit
            const page = req.query.page
            skip = pageSize * (page - 1)
            limit = pageSize
        }

        const totalDocs = await OrdreModel.find({}).countDocuments().exec()
        const results = await OrdreModel.find({}).skip(skip).limit(limit).exec()

        res.header("X-Total-Count", totalDocs)
        res.status(200).json(results)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching orders, please try again later' })
    }
};

export const updateOrderById = async (req, res) => {
    try {
        const { id } = req.params
        const updatedOrder = await OrdreModel.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(updatedOrder)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating order, please try again later' })
    }
}
