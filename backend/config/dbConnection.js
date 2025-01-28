import mongoose from 'mongoose'

const dbConnection = async (url) => {
    try {
        return await mongoose.connect(url);
    } catch (error) {
        console.log(error);
    }
}

export {
    dbConnection
}