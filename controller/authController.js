import User from '../model/User.js'
import _token from '../utils/token.js';

export const signup = async (req, res) => {
    try {

        let { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: 'Missing required fields!'
            })
        }
        

        const isExist = await User.findOne({ email });
        if (isExist) {
            res.status(200).json({
                success: false,
                message: 'User alrady Exist'
            })
        }

        /////// create user

        let user = new User.create(req.body);
        await user.save();
        const token = _token(user);

        let userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;


        res.status(201).json({
            success:true,
            message:'User created successfully!',
            token,
            user:userWithoutPassword
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Signup fail'
        })
    }
}