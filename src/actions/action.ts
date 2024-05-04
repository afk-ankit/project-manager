"use server";
import { z } from "zod";
import prisma from "../../prisma/db";
import { action } from "@/lib/safe-action";

const projectSchema = z.object({
  title: z.string().min(1, "Title cannot be empty").max(20, "Title too long"),
  description: z
    .string()
    .min(1, "Description cannot be empty")
    .max(200, "Description too long"),
  student: z.string().array().nonempty("At least one student must be selected"),
  deadline: z.date(),
  file: z.string().array(),
});

type ProjectType = z.infer<typeof projectSchema>;

export const postProject = action(projectSchema, async (data: ProjectType) => {
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
});
