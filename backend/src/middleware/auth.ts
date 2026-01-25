import type { Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";
import { requireAuth } from "@clerk/express";
import { prisma } from "../lib/prisma";
import type { AuthenticatedRequest } from "../../types";


export const protectRoute = [
  requireAuth(),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const { userId : clerkId } = getAuth(req);
        if (!clerkId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const user = await prisma.user.findFirst({
            where: { clerkId },
        });

        if(!user){
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.userId = user.id.toString();
        next();
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    } 
  },
];