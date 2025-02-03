import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    return jwt.sign({user: user}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });
};