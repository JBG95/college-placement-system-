import { Router } from "express";
import { loginSchema, registerSchema, updateRoleSchema } from "./auth.dto";
import { validate } from "../middleware";
import { UserCollection } from "./auth.collection";
import { uploadImage } from "../uploadsfolder/file";

const authRouter = Router();
const authController = new UserCollection();

authRouter.post("/register", validate(registerSchema), authController.register);
authRouter.post("/login", validate(loginSchema), authController.login);
authRouter.post("/google-login", authController.googleLogin);
authRouter.post("/whoami", authController.whoami);
authRouter.put(
  "/update/avatar/:id",
  uploadImage.single("avatar"),
  authController.updateAvatar
);
authRouter.put(
  "/update/role/:id",
  validate(updateRoleSchema),
  authController.updateRole
);

export default authRouter;
