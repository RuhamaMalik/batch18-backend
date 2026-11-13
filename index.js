import express from "express";
import 'dotenv/config';
import connectDb from "./config/config.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

/////////////// Middlewares
app.use(express.json());

///////////// connect DB

app.use(async(req,res,next)=>{
    try {
        await connectDb();
        next()
    } catch (error) {
        next(error)
    }
});


//////////// routes

//   http://localhost:8000/api/auth/signup

app.use('/api/auth', authRoutes);

app.get('', (req, res) => {
    res.send('Hurrryyyyyyyyyyyy!');
})

if (process.env.NODE_ENV !== 'production') {
    app.listen(process.env.PORT || 5000, () => console.log(`Server is running on port ${process.env.PORT}`))
}


export default app; /// for vercel deploy



