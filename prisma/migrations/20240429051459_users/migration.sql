-- CreateEnum
CREATE TYPE "Department" AS ENUM ('COMPUTER', 'ELECTRONICS', 'ELECTRICAL', 'MECHANICAL', 'CIVIL', 'FOOD');

-- CreateTable
CREATE TABLE "Student" (
    "roll_no" TEXT NOT NULL,
    "year_joining" TIMESTAMP(3) NOT NULL,
    "year_passing" TIMESTAMP(3) NOT NULL,
    "course" TEXT NOT NULL,
    "department" "Department" NOT NULL,
    "semester" INTEGER NOT NULL,
    "univeristy_id" INTEGER NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("roll_no")
);

-- CreateTable
CREATE TABLE "Professor" (
    "emp_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "department" "Department" NOT NULL,

    CONSTRAINT "Professor_pkey" PRIMARY KEY ("emp_id")
);

-- CreateTable
CREATE TABLE "Univeristy" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Univeristy_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_univeristy_id_fkey" FOREIGN KEY ("univeristy_id") REFERENCES "Univeristy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
