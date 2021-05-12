import jwt from "jsonwebtoken";
export const generateToken = (user) => {
  console.log(process.env.JWT_SECRET);
  // jwt.sing(1-paramertga tokenni yaratish uchun user maydonlari,
  //2-paramert uchun serverdagi sirli kalit so'z,
  // 3-paramert menga hozircha nomalum sign option deyilar ekan)
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || "somethingsecret",
    {
      expiresIn: "30d",
    }
  );
};
