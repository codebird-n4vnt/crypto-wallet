import { Keypair } from "@solana/web3.js";
import { UserModel } from "../schema/UserSchema.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"


export const signUp = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res
        .status(400)
        .json({ message: "no username or password provided" });

    const encryptedPass = await bcrypt.hash(password, 10);

    const check = await UserModel.findOne({ username: username });
    if (check)
      return res.status(401).json({ message: " Username is already taken " });

    const keypair = new Keypair.generate();

    const result = await UserModel.create({
      username: username,
      password: encryptedPass,
      publicKey: keypair.publicKey.toString(),
      privateKey: keypair.secretKey.toString()
    });

    let userId = result._id;

    const token = jwt.sign(
      {userId}, 
      process.env.JWT_SECRET
    );
    await res.cookie("token",token,{
      httpOnly: true, // prevent XSS attacks cross-site scriptinng attacks
      secure: process.env.NODE_ENVIRONMENT === "production",  // https --> here 's' stands for secure ; http --> used in development mode
      sameSite: "strict", //CSRF attacks cross-site request forgery attacks
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })


    return res
      .status(200)
      .json({
        message: `user created successfully with public key : ${keypair.publicKey.toString()}`,
      });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "internal server error at signup :" + err.message });
  }
};
export const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res
        .status(400)
        .json({ message: "No username or password provided" });

    const signedUser = await UserModel.findOne({ username: username });
    if (!signedUser)
      return res
        .status(401)
        .json({ message: "Username not found please signup first" });
    
    const checkPass = await bcrypt.compare(password, signedUser.password);

    if (!checkPass) return res.status(400).json({ message: "Password incorrect" });

    let userId = signedUser._id;

    const token = jwt.sign({userId}, process.env.JWT_SECRET);
    await res.cookie("token",token,{
      httpOnly: true, // prevent XSS attacks cross-site scriptinng attacks
      secure: process.env.NODE_ENVIRONMENT === "production",  // https --> here 's' stands for secure ; http --> used in development mode
      sameSite: "strict", //CSRF attacks cross-site request forgery attacks
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })


    return res
      .status(200)
      .json({ message: `Login successful ${signedUser.publicKey}` });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "internal server error at signin :" + err.message });
  }
};
