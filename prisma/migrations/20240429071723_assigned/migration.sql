/*
  Warnings:

  - Added the required column `professor_id` to the `AssignedProject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AssignedProject" ADD COLUMN     "professor_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "AssignedProject" ADD CONSTRAINT "AssignedProject_professor_id_fkey" FOREIGN KEY ("professor_id") REFERENCES "Professor"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;
