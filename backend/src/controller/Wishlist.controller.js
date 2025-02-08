import { WishlistModel } from "../../model/WishList.model.js";

export const createWishlist = async (req, res) => {
    try {
        const created = await new WishlistModel(req.body).populate({ path: "product", populate: ["brand"] })
        await created.save()
        res.status(201).json(created)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error adding product to wishlist, please try again later" })
    }
}
export const getWishlistByUserId = async (req, res) => {
    try {
        const { id } = req.params
        let skip = 0
        let limit = 0

        if (req.query.page && req.query.limit) {
            const pageSize = req.query.limit
            const page = req.query.page

            skip = pageSize * (page - 1)
            limit = pageSize
        }

        const result = await WishlistModel.find({ user_id: id }).skip(skip).limit(limit).populate({ path: "product_id", populate: ['brand_id'] })
        const totalResults = await WishlistModel.find({ user_id: id }).countDocuments().exec()

        res.set("X-Total-Count", totalResults)
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching your wishlist, please try again later" })
    }
}
export const updateWishlistById = async (req, res) => {
    try {
        const { id } = req.params
        const updated = await WishlistModel.findByIdAndUpdate(id, req.body, { new: true }).populate("product")
        res.status(200).json(updated)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating your wishlist, please try again later" })
    }
}
export const deleteWishlistById = async (req, res) => {
    try {
        const { id } = req.params
        const deleted = await WishlistModel.findByIdAndDelete(id)
        return res.status(200).json(deleted)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error deleting that product from wishlist, please try again later" })
    }
}