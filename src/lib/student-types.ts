import { Department } from "@prisma/client";
import z from "zod";
export const studentSchema = z.object({
  name: z.string().min(1, "name is required"),
  roll_no: z.string().length(8, "invalid roll number"),
  year_joining: z.number().int(),
  year_passing: z.number().int(),
  course: z.string().min(1, "course is required"),
  semester: z.number().int().gte(1).lte(10),
  department: z.enum([
    Department.MECHANICAL,
    Department.FOOD,
    Department.MECHANICAL,
    Department.CIVIL,
    Department.ELECTRICAL,
    Department.ELECTRONICS,
    Department.COMPUTER,
  ]),
  university: z.string().min(1, "univeristy name is rqeuired"),
  university_id: z.number().gte(1, "university id cannot be 0"),
});

export type StudentType = z.infer<typeof studentSchema>;
