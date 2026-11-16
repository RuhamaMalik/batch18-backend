import jwt from 'jsonwebtoken';

let token = (user,time) => {
    return jwt.sign(
        {
            id: user._id,
            role: user.role,
            email: user.email
        },
        process.env.JWT_TOKEN,
        { expiresIn: time })
}


export default token;