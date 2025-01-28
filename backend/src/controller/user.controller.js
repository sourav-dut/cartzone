import userModel from "../../model/user.model.js";

// Get all users
const getAllUsersController = async (req, res) => {
    try {
        const users = await userModel.find({});

        if (!users) {
            return res.status(500).send({
                success: false,
                message: "Users not found"
            })
        };
    
        return res.status(201).send({
            success: true,
            message: "users found successfully",
            users: users
        })
    
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Register API"
        })
    }
};


// Get User by Id
const getUserByIdController = async (req, res) => {
    try {
        const user = await userModel.findById(req.body.user._id);
        if (!user) {
            return res.status(500).send({
                success: false,
                message: "Users not found"
            })
        };

        return res.status(201).send({
            success: true,
            message: "user found successfully",
            user: user
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in get user API"
        })
    }
};

// Delete User by Id
const deleteUserByIdController = async (req, res) => {
    try {
        const user = await userModel.findByIdAndDelete(req.body.user._id);
        if (!user) {
            return res.status(500).send({
                success: false,
                message: "Users not found"
            })
        };

        return res.status(201).send({
            success: true,
            message: "user Deleted successfully",
            user: user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Register API"
        })
    }
}
// Update Userby Id
const updateUserByIdController = async (req, res) => {
    try {
        const {name, email, phone} = req.body;
        
        const user = await userModel.findById(req.body.user._id);
        console.log(user);
        
        if (!user) {
            return res.status(500).send({
                success: false,
                message: "Users not found"
            })
        };

        user.name = name;
        user.email = email;
        user.phone = phone;

        await user.save();

        return res.status(201).send({
            success: true,
            message: "user Updated successfully",
            user: user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in update user API"
        })
    }
}

export {
    getAllUsersController,
    getUserByIdController,
    deleteUserByIdController,
    updateUserByIdController,
}

