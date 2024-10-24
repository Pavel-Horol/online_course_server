import { Router } from "express";
import authMiddleware from "../middlewares/auth-middleware";
import authValidator from "@/validator/auth-validator";
import { validateRequest } from "@/middlewares/validation-middleware";
import authController from "../controller/auth-controller";

const authRouter: Router = Router();

//public routes
authRouter.post(
  "/registration", 
  authValidator.registration,
  validateRequest,
  authController.registration
);

authRouter.post(
  "/login", 
  authValidator.login,
  validateRequest,
  authController.login
);

authRouter.post(
  "/logout", 
  authController.logout
);

authRouter.get(
  "/activate/:link", 
  authValidator.activation,
  validateRequest,  
  authController.activate
);

authRouter.get(
  "/refresh", 
  authController.refresh
);

//protected routes
authRouter.get(
    "/profile", 
    authMiddleware, 
    authController.profile
);

authRouter.get(
  "/getActivationLink",
  authMiddleware,
  authController.getActivationLink
);
export default authRouter;
