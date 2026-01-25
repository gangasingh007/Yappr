import type { Response } from "express";
import { prisma } from "../lib/prisma";
import { clerkClient, getAuth } from "@clerk/express";
import type { AuthenticatedRequest } from "../../types";


export async function getMe(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export const getCallback = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const {userId : clerkId}  = getAuth(req);
    if (!clerkId) {
      return res.status(400).json({ message: "Unauthorized" });
    }
    let user = await prisma.user.findFirst({
      where: { clerkId },
    });
    
    if (!user) {
    const clerUser = await clerkClient.users.getUser(clerkId);
    user = await prisma.user.create({
        data: {
            clerkId: clerUser.id,
            email: clerUser.emailAddresses[0]?.emailAddress || "",
            fullName: clerUser.firstName + " " + clerUser.lastName,
            avatar: clerUser.imageUrl,
        }
    })
    }
    res.json(user);
  } catch (error : any) {
    console.log(error.message)
    res.status(500).json({ message: "Internal Server Error" });
  }
}