import jwt from "jsonwebtoken";
import User from "../model/User.js";

export const middlewareToProtect = async (req, res, next) => {
  console.log(" >>>>>>>>>>>>> :  middleware call");
  try {
    
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      res.status(401).json({ success: false, message: "Token not provided!" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    
    req.user = await User.findById(decoded.id).select("-password");
    next();
  }

  catch (error) {
    res.status(401).json({ success: false, message: "Invalid / Expired token!" })
  }
}



export const authorize = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Only ${role}s are allowed.`
      });
    }
    next();
  };
};

