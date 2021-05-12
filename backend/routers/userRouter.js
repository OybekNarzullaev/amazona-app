import express from "express";
import expressAsyncHandler from "express-async-handler";
import bycrypt from "bcrypt";
import data from "../data.js";
import { generateToken } from "../utils.js";
import User from "../models/userModel.js";

const userRouter = express.Router();

userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    //har safar dublikate key bo'lmasligi uchun userlarni tozalaymiz:
    await User.remove({});
    const createUsers = await User.insertMany(data.users);
    res.send(createUsers);
  })
);

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    // req.body.email ga teng email ni db dan topish
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bycrypt.compareSync(req.body.password, user.password)) {
        return res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          // jwt generatsiya qilish
          token: generateToken(user),
        });
      }
    }
    res.status(401).send({ message: "Invalid Email or Password" });
  })
);

export default userRouter;
