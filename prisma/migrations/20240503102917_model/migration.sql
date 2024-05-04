/*
  Warnings:

  - You are about to drop the `_ProjectToStudent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProjectToStudent" DROP CONSTRAINT "_ProjectToStudent_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectToStudent" DROP CONSTRAINT "_ProjectToStudent_B_fkey";

-- DropTable
DROP TABLE "_ProjectToStudent";
