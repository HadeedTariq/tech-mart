import { Router } from "express";
import {
  accountLoginChecker,
  authChecker,
  createUserMiddleware,
} from "../middlewares/auth.middleware";

import {
  createAccount,
  authenticateAccount,
  authorizeAccount,
  verifyAccount,
  logoutUser,
} from "../controllers/account.controller";
const router = Router();

router.post("/create", createUserMiddleware, createAccount);
router.get("/:role/:name/:email", verifyAccount);

router.post("/authorize", accountLoginChecker, authorizeAccount);
router.post("/authenticate", authChecker, authenticateAccount);
router.post("/logout", authChecker, logoutUser);

export { router as accountRouter };
