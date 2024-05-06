"use server";
import { ProjectType, projectSchema } from "@/lib/project-types";
import prisma from "../../prisma/db";
import { action } from "@/lib/safe-action";
import { StudentType, studentSchema } from "@/lib/student-types";

export const createProject = action(
  projectSchema,
  async (data: ProjectType) => {
    const newProject = await prisma.project.create({
      data: {
        title: data.title,
        deadline: data.deadline,
        description: data.description,
        attachments: { create: data.file.map((url) => ({ url })) },
      },
    });
    return {
      message: "Project Created Successfully",
      data: newProject,
    };
  },
);

export const createStudent = action(
  studentSchema,
  async (data: StudentType) => {
    const studentExist = await prisma.student.findUnique({
      where: {
        roll_no: data.roll_no,
      },
    });
    if (studentExist) {
      throw new Error("Roll Number already exists");
    }
    await prisma.university.findUniqueOrThrow({
      where: {
        id: data.university_id,
      },
    });
    const newStudent = await prisma.student.create({
      data: {
        name: data.name,
        roll_no: data.roll_no.toUpperCase(),
        semester: data.semester,
        department: data.department,
        course: data.course,
        year_joining: new Date(`${data.year_joining}-01-01`),
        year_passing: new Date(`${data.year_passing}-01-01`),
        university: {
          connect: {
            id: data.university_id,
          },
        },
      },
    });

    return {
      message: "Student created Successfully",
      data: newStudent,
    };
  },
);
