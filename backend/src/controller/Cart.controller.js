import { CartModel } from "../../model/Cart.model.js";

export const createCart = async (req, res) => {
    try {
        const created = await new CartModel(req.body).populate({ path: "product_id", populate: { path: "brand_id" } });
        await created.save()
        res.status(201).json(created)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error adding product to cart, please trying again later' })
    }
}

export const getCartByUserId = async (req, res) => {
    try {
        const { id } = req.params
        const result = await CartModel.find({ user_id: id }).populate({ path: "product_id", populate: { path: "brand_id" } }).populate({path: "user_id"});

        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error fetching cart items, please trying again later' })
    }
}

export const updateCartById = async (req, res) => {
    try {
        const { id } = req.params
        const updated = await CartModel.findByIdAndUpdate(id, req.body, { new: true }).populate({ path: "product_id", populate: { path: "brand_id" } });
        res.status(200).json(updated)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error updating cart items, please trying again later' })
    }
}

export const deleteCartById = async (req, res) => {
    try {
        const { id } = req.params
        const deleted = await CartModel.findByIdAndDelete(id)
        res.status(200).json(deleted)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error deleting cart item, please trying again later' })
    }
}

export const deleteCartByUserId = async (req, res) => {

    try {
        const { id } = req.params
        await CartModel.deleteMany({ user: id })
        res.sendStatus(204)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Some Error occured while resetting your cart" })
    }

}