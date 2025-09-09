import { verifyToken } from "../helpers/token.js";
import { User } from "../models/User.js";

export async function authenticated(req, res, next) {
  const tokenData = await verifyToken(req.cookies.token);

  const user = await User.findOne({ _id: tokenData.id });

  if (!user) {
    res.send({ error: "User not found" });
    return;
  }

  req.user = user;
  next();
}
