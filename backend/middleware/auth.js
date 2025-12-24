import { UserModel } from "../schema/UserSchema.js";
import jwt from 'jsonwebtoken'

export const isAuth = async (req,res,next) =>{

   try {
      let token =  req.cookies.token;
      if(!token) return res.status(400).json({message:'Unauthorised - token not provided'})
  
      
      const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
      if(!verifiedToken) return res.status(400).json({message:'Invalid not token'});
      

      const user = await UserModel.findOne({_id:verifiedToken.userId});
      
      return res.status(200).json({user});
   //  const user = await UserModel.findOne({_id:token});
   //  console.log(user);
    next();
   } catch (error) {
    return res.status(500).json({message:'isAuth error :' + error})
   }
}
