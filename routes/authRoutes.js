import { Router } from "express";
import { signup , login, forgotPassword, resetPassword, userProfile} from "../controller/authController.js";
import { middlewareToProtect } from "../middlewares/authMiddleware.js";

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/profile',middlewareToProtect, userProfile);


export default router;

/// `Bearer 3fgfgdfgdfgdfgdfg`
/// ['Bearer', "3fgfgdfgdfgdfgdfg"]