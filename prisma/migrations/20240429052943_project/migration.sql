-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectFiles" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "project_id" INTEGER NOT NULL,

    CONSTRAINT "ProjectFiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssignedProject" (
    "student_id" TEXT NOT NULL,
    "project_id" INTEGER NOT NULL,

    CONSTRAINT "AssignedProject_pkey" PRIMARY KEY ("student_id","project_id")
);

-- CreateTable
CREATE TABLE "_ProjectToStudent" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectToStudent_AB_unique" ON "_ProjectToStudent"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectToStudent_B_index" ON "_ProjectToStudent"("B");

-- AddForeignKey
ALTER TABLE "ProjectFiles" ADD CONSTRAINT "ProjectFiles_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignedProject" ADD CONSTRAINT "AssignedProject_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("roll_no") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignedProject" ADD CONSTRAINT "AssignedProject_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToStudent" ADD CONSTRAINT "_ProjectToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToStudent" ADD CONSTRAINT "_ProjectToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("roll_no") ON DELETE CASCADE ON UPDATE CASCADE;
