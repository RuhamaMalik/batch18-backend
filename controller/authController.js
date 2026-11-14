import User from '../model/User.js'
import _token from '../utils/token.js';
import emailSender from '../utils/Email.js';

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
                message: 'User already Exist'
            })
        }

        /////// create user

        let user = await User.create(req.body);

        const token = _token(user);

        let userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;


        res.status(201).json({
            success: true,
            message: 'User created successfully!',
            token,
            user: userWithoutPassword
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Signup fail'
        })
    }
}

export const login = async (req, res) => {
    try {

        let { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: 'Missing required fields!'
            })
        }


        const user = await User.findOne({ email });

        if (!user || !(await user.comparePswd(password))) {
            res.status(401).json({
                success: false,
                message: 'Invalid credential'
            })
        }

        /////// signin user
        let userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        const token = _token(user);

        res.status(201).json({
            success: true,
            message: 'User Login successfully!',
            token,
            user: userWithoutPassword
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Login fail'
        })
    }
}



export const forgotPassword = async (req, res) => {
    try {

        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        //////////////// generate token

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_TOKEN,
            { expiresIn: '1m' })

        const redirectURL = `${process.env.FRONTEND_URL}/reset-password/${token}`;

        await emailSender({
            to: user.email,
            subject: "Reset Password",
            html: `
            <div style="width: 80%; margin: 0 auto; text-align: center;">
        <h1>Reset Password</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi facilis placeat consectetur unde ipsa
            aliquam beatae consequuntur nulla saepe? Vitae!</p>

        <a href="${redirectURL}" target="_blank">Reset Password</a>
    </div>`
        });

        res.status(200).json({
            success: true,
            message: 'Reset password link sent to your email'
        })  

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Forgot password fail'
        })
    }



}