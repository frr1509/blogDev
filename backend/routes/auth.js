import express from "express";
import { loginUser, registerUser } from "../controllers/user.js";
import { mapUser } from "../helpers/mapUser.js";

const router = express.Router({ mergeParams: true });

router.post("/register", async (req, res) => {
  try {
    const { user, token } = await registerUser(
      req.body.login,
      req.body.password
    );

    res
      .cookie("token", token, { httpOnly: true })
      .send({ error: null, user: mapUser(user) });
  } catch (err) {
    res.send({ error: err.message || "Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { user, token } = await loginUser(req.body.login, req.body.password);

    res
      .cookie("token", token, { httpOnly: true })
      .send({ error: null, user: mapUser(user) });
  } catch (err) {
    res.send({ error: err.message || "Error" });
  }
});

router.post("/logout", (req, res) => {
  res.cookie("token", "", { httpOnly: true }).send({ error: null, user: {} });
});

export default router;
