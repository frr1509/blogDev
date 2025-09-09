import express from "express";
import { authenticated } from "../middlewares/authenticated.js";
import { hasRole } from "../middlewares/hasRole.js";
import { ROLES } from "../constans/roles.js";
import {
  deleteUser,
  getRoles,
  getUsers,
  updateUser,
} from "../controllers/user.js";
import { mapUser } from "../helpers/mapUser.js";

const router = express.Router({ mergeParams: true });

router.get("/", authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  const users = await getUsers();

  res.send({ data: users.map(mapUser) });
});

router.get(
  "/roles",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    const roles = await getRoles();

    res.send({ data: roles });
  }
);

router.patch(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    const newUser = await updateUser(req.params.id, { role: req.body.roleId });

    res.send({ data: mapUser(newUser) });
  }
);

router.delete(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    await deleteUser(req.params.id);

    res.send({ data: true });
  }
);

export default router;
