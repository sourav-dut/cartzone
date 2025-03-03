export const sanitizeUser = (user) => {
    return { _id: user._id, email: user.email, userRole: user.userRole, phone: user.phone }
}