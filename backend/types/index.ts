import type { Request } from "express";

export interface AuthenticatedRequest extends Request {
  clerkId: string;
  userId: string;
}