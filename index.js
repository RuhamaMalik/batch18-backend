import express from "express";
import 'dotenv/config';

const app = express();

app.get('', (req, res) => {
    res.send('Hurrryyyyyyyyyyyy!');
})

if (process.env.NODE_ENV !== 'production') {
    app.listen(process.env.PORT || 5000, () => console.log(`Server is running on port ${process.env.PORT}`))
}


export default app; /// for vercel deploy



