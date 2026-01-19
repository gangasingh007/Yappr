import {Router} from "express"
import { protectRoute } from "../middleware/auth";
import { getCallback, getMe } from "../controllers/auth";

const router = Router();

router.get("/me", protectRoute as any, getMe as any);
router.post("/callback",protectRoute as any, getCallback as any )


export default router;