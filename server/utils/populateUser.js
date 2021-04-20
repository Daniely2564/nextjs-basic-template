import mongoose from "mongoose";
import User from "../models/userModel";
import jwt from "jsonwebtoken";

export const populateUser = async ({ req }) => {
  const { token } = req.cookies;
  if (!token) {
    return {};
  }
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useNewUrlParser: true,
    });
  }
  const { id } = jwt.verify(token, process.env.JWT_SECRET);
  const foundUser = await User.findById(id).select({
    _id: 1,
    firstName: 1,
    lastName: 1,
    email: 1,
  });
  return {
    user: JSON.parse(JSON.stringify(foundUser)),
  };
};
