import { Router } from "express";
import { loginSchema, registerSchema } from "./auth.dto";
import { validate } from "../middleware";
import { UserCollection } from "./auth.collection";

const authRouter = Router();
const authController = new UserCollection();

authRouter.post("/register", validate(registerSchema), authController.register);
authRouter.post("/login", validate(loginSchema), authController.login);
authRouter.post("/google-login", authController.googleLogin);
authRouter.post("/whoami", authController.whoami);

export default authRouter;
