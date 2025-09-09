import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import { generateToken } from "../helpers/token.js";
import { ROLES } from "../constans/roles.js";

//register user
export async function registerUser(login, password) {
  if (!password) {
    throw new Error("Password is required");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    login,
    password: passwordHash,
  });

  const token = await generateToken({ id: user.id });

  return { user, token };
}

//login user
export async function loginUser(login, password) {
  const user = await User.findOne({ login });
  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const token = await generateToken({ id: user.id });

  return { user, token };
}

export async function getUsers() {
  return User.find();
}

export async function getRoles() {
  return [
    { id: ROLES.ADMIN, name: "Admin" },
    { id: ROLES.MODERATOR, name: "Moderator" },
    { id: ROLES.USER, name: "User" },
  ];
}
// delete user

export async function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

// edit user(role)

export async function updateUser(id, dataUser) {
  return User.findByIdAndUpdate(id, dataUser, { returnDocument: "after" });
}
