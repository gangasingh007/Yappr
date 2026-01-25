/*
  Warnings:

  - A unique constraint covering the columns `[participantAId,participantBId]` on the table `Chat` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "readAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "Chat_participantAId_participantBId_idx" ON "Chat"("participantAId", "participantBId");

-- CreateIndex
CREATE UNIQUE INDEX "Chat_participantAId_participantBId_key" ON "Chat"("participantAId", "participantBId");
