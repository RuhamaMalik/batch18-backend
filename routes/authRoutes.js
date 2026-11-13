import { Router } from "express";
import { signup } from "../controller/authController.js";

const router = Router();

router.post('/signup', signup);
// router.post('/login', signup);


export default router;