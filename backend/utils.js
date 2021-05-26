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

export const isAuth = (req, res, next) => {
  const authorization = req.body.authorization;
  if (authorization) {
    const token = authorization.splice(7, authorization.length); // 7-dan keyingilarni o'chirish
    jwt.verify(
      token,
      process.env.JWT_SECRET || "somethingsecret",
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: "Invalid token" });
        } else {
          (req.user = decode), next();
        }
      }
    );
  } else {
    res.status(401).send({ message: "No token" });
  }
};
