// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "../../server/middleware/mongodb";
import { signinSchema } from "../../server/validation/userValidation";
import User from "../../server/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const handler = (req, res) => {
  res.setHeader("Set-Cookie", `token=token; HttpOnly; Path=/;Max-Age=-1`);
  res.json({});
};

export default handler;
