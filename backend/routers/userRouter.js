import express from "express";
import expressAsyncHandler from "express-async-handler";
import bycrypt from "bcrypt";
import data from "../data.js";
import { generateToken } from "../utils.js";
import User from "../models/userModel.js";

const userRouter = express.Router();

userRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);

userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    //har safar dublikate key bo'lmasligi uchun userlarni tozalaymiz:
    await User.deleteMany();
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

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bycrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await user.save();
    if (createdUser)
      res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        // jwt generatsiya qilish
        token: generateToken(user),
      });
    else res.status(404).send("xato");
  })
);

export default userRouter;
