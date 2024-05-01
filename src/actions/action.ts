"use server";
import { z } from "zod";
import prisma from "../../prisma/db";

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

export const postProject = async (data: ProjectType) => {
  const parsed = projectSchema.safeParse(data);
  if (!parsed.success) {
    return { message: "Invalid form Data" };
  }
  const newProject = await prisma.project.create({
    data: {
      title: parsed.data.title,
      deadline: parsed.data.deadline,
      description: parsed.data.description,
      attachments: { create: parsed.data.file.map((url) => ({ url })) },
    },
  });

  return { data: newProject };
};
