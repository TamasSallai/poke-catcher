/*
  Warnings:

  - You are about to drop the column `type` on the `Pokemon` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[pokeId,ownerId]` on the table `Pokemon` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pokeId` to the `Pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pokemon" DROP COLUMN "type",
ADD COLUMN     "pokeId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Pokemon_ownerId_idx" ON "Pokemon"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_pokeId_ownerId_key" ON "Pokemon"("pokeId", "ownerId");
