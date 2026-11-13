import jwt from 'jsonwebtoken';

let token = (user) => {
    return jwt.sign(
        {
            id: user._id,
            role: user.role,
            email: user.email
        },
        process.env.JWT_TOKEN,
        { expiresIn: '2m' })
}


export default token;