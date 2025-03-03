import addressModel from "../../model/address.model.js";

// Create Address
export const createAddress = async (req, res) => {
    try {
        const { street, city, state, phoneNumber, pinCode, country, } = req.body;
        console.log(req.body);
        
        

        // validation check
        if (!street || !city || !state || !phoneNumber || !pinCode || !country) {
            return res.status(404).send({
                success: false,
                message: "All fildes are required"
            })
        };

        const address = await addressModel.create({
            user_id: req.body.user._id, street, city, state, phoneNumber, pinCode, country
        });

        return res.status(201).send({
            success: true,
            message: "Address created successfully",
            address
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error adding address, please trying again later' })
    }
}

// Get Address
export const getByUserId = async (req, res) => {
    try {
        const { id } = req.params
        const addresses = await addressModel.find({ user_id: id }).populate({path: "user_id"})
        res.status(200).json(addresses)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching addresses, please try again later' })
    }
};

// Update Address
export const updateByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const { street, city, state, phoneNumber, pinCode, country, } = req.body;
        
        const address = await addressModel.findOne({user_id: id});
        if (street) address.street = street;
        if (city) address.city = city;
        if (state) address.state = state;
        if (phoneNumber) address.phoneNumber = phoneNumber;
        if (pinCode) address.pinCode = pinCode;
        if (country) address.country = country;
        console.log(address);

        await address.save();

        res.status(200).json({
            success: true,
            address
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating address, please try again later' })
    }
}

// Delete Address
export const deleteByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAddress = await addressModel.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            deletedAddress
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error deleting address, please try again later' })
    }
}
