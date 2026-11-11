// import express from 'express';
// import 'dotenv/config';
// import db from './config/config.js'
// import { ObjectId } from 'mongodb';
// const app = express();

// app.use(express.json());


// app.get('', (req, res) => {
//     res.send('Home')
// })


// app.post('/api/users', async (req, res) => {
//     try {
//         const userRef = (await db()).collection('users');
//         // const insertData = await userRef.insertOne(req.body)
//         const insertData = await userRef.insertMany(req.body)

//         if (insertData.acknowledged) {
//             res.status(201).send({ message: "User created!" })
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({ message: "ERROR in User" })
//     }
// });


// app.get('/api/users', async (req, res) => {
//     const userRef = (await db()).collection('users');
//     const data = await userRef.find().toArray();
//     res.status(200).json({ message: "Users get successfully!", data })
// })

// // 2349324234-cat.jpg

// app.delete('/api/users/:id', async (req, res) => {
//   const userRef = (await db()).collection('users');
//  const result= userRef.deleteOne(
//     { _id: new ObjectId(req.params.id) }
//   );

//   res.json({message:'User deleted',result})
// })




// ////////// multer middleware

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "assets")
//   },
//   filename: function (req, file, cb) {
//     const fileName = `${Date.now()}-${file.originalname}`;
//     cb(null, fileName);
//   }
// });

// const upload = multer({ storage });

// app.post('/api/uploads', upload.single("image"), (req, res) => {
//   res.json({ message: 'Image uploaded successfully', image:req.file.filename});
// })












// app.listen(process.env.PORT, () => {
//     console.log('Server is Running  ', process.env.PORT);
// })















// const express = require('express');
// const multer = require('multer');
// const path = require('path');

// import express from 'express';
// import multer from 'multer';
// import path from 'path';
// import {v2 as cloudinary} from 'cloudinary';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// const app = express();


// /////////////////////////// cloudinary storage

// cloudinary.config({
//   cloud_name: 'your_cloud_name', // Replace with your actual Cloudinary cloud name
//   api_key: 'your_api_key', // Replace with your actual Cloudinary API key
//   api_secret:'your_secret_key' // Replace with your actual Cloudinary API secret
// })

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'batch18',
//     allowed_formats: ['jpg', 'jpeg', 'png']
//   },
// });

/////////////////////////// cloudinary storage


// app.use('/profile',express.static(path.join(process.cwd(), 'assets')));


///////////////////////////diskStorage

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "assets")
//   },
//   filename: function (req, file, cb) {
//     const fileName = `${Date.now()}-${file.originalname}`;
//     cb(null, fileName);
//   }
// });
///////////////////////////diskStorage



////////// multer middleware

// const upload = multer({ storage });

// app.post('/api/uploads', upload.single("image"), (req, res) => {

//   res.json({ message: 'Image uploaded successfully', image:req.file.filename});
// })


// app.listen(8000,()=>console.log('server is running'));




//////////////////////////// start mongoose


// import express from 'express';
// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// const app = express();
// app.use(express.json());

// let DB_STR = `mongodb+srv://batch18:batch182026@authantication.zgl2b3q.mongodb.net/batch18`

// mongoose.connect(DB_STR)
//   .then(() => console.log('DB connected'))
//   .catch((err) => console.log(err));


// ///////////////////////// Schema

// const userSchema = new mongoose.Schema(
//   {
//     // name: String,
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     }
//   }, { timestamps: true })


// ///////////////////////// Model --- collection

// const User = mongoose.model('User', userSchema);


// ///////////////////////// Signup

// app.post('/api/signup', async (req, res) => {
//   try {
//     let { name, email, password } = req.body;
//     let pswd = await bcrypt.hash(password, 12);
//     let newUser = new User({ ...req.body, password: pswd });
//     await newUser.save();

//     res.status(201).json({ success: true, message: 'User created successfully' });

//   } catch (error) {
//     res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// })

// let JWT_SECRET = 'sdbjsdbj7364736784638$$%^jhsdjhs';

// app.post('/api/signin', async (req, res) => {
//   try {
//     let { email, password } = req.body;
//     let user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found', success: false });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials', success: false });
//     }

//     let userWithoutPswd = user.toObject();
//     delete userWithoutPswd.password;

//     //////////////// geanerate token

//     const token = jwt.sign({id: user._id,email:user.email}, JWT_SECRET,{expiresIn:'1d'} );

//     return res.status(200).json({ success: true, message: 'User signin successfully',user:userWithoutPswd, token });


//     res.status(201).json({ success: true, message: 'User signin successfully' });

//   } catch (error) {
//     res.status(500).json({ message: 'Signin error', error: error.message });
//   }
// })

// app.get('', (req, res) => {
//   res.send('hello world')
// })


// app.listen(8000, () => console.log('server is running'));

/////////////////// MVC 
/// Model 
/// View --- frontend (React, ejs)
/// Controller 




