// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "../../server/middleware/mongodb";
import { signupSchema } from "../../server/validation/userValidation";
import User from "../../server/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const handler = (req, res) => {
  switch (req.method) {
    case "GET":
      return handleUserGet(req, res);
    case "POST":
      return handleUserPost(req, res);
  }
};

const handleUserGet = (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    res.json({});
  }
  const { id } = jwt.verify(token, process.env.JWT_SECRET);
  console.log(id);
  res.json({});
};

const handleUserPost = async (req, res) => {
  const parsedBody = JSON.parse(req.body);
  const { firstName, lastName, email, password, confirmPassword } = parsedBody;
  const result = signupSchema.validate(parsedBody);
  if (result.error) {
    return res.status(422).json({ message: result.error.details[0].message });
  }
  const foundUserByEmail = await User.findOne({ email });
  if (foundUserByEmail) {
    return res
      .status(422)
      .json({ message: "User with the provided email already exists!" });
  }
  const hashSalt = 10;
  const hashedPassword = await bcrypt.hash(password, hashSalt);
  const user = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  const savedUser = await user.save();
  const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  delete savedUser.password;

  const weekInTime = 1000 * 60 * 60 * 24 * 7;
  res.setHeader(
    "Set-Cookie",
    `token=${token}; HttpOnly; Path=/;Max-Age:=${weekInTime}`
  );
  res.json({ ...savedUser });
};

export default connectDB(handler);
