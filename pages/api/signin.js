// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "../../server/middleware/mongodb";
import { signinSchema } from "../../server/validation/userValidation";
import User from "../../server/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const handler = (req, res) => {
  switch (req.method) {
    case "POST":
      return handleSigninPost(req, res);
  }
};

const handleSigninPost = async (req, res) => {
  const parsedBody = JSON.parse(req.body);
  const { email, password } = parsedBody;
  const result = signinSchema.validate(parsedBody);
  if (result.error) {
    return res.status(422).json({ message: result.error.details[0].message });
  }

  const foundUserByEmail = await User.findOne({ email }).lean();
  if (!foundUserByEmail) {
    return res
      .status(422)
      .json({ message: "Invalid email address or password" });
  }

  const passwordMatches = await bcrypt.compare(
    password,
    foundUserByEmail.password
  );
  if (!passwordMatches) {
    return res
      .status(422)
      .json({ message: "Invalid email address or password" });
  }

  const token = jwt.sign({ id: foundUserByEmail._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  delete foundUserByEmail.password;

  const weekInTime = 1000 * 60 * 60 * 24 * 7;
  res.setHeader(
    "Set-Cookie",
    `token=${token}; HttpOnly; Path=/;Max-Age:=${weekInTime}`
  );
  res.json({ ...foundUserByEmail });
};

export default connectDB(handler);
