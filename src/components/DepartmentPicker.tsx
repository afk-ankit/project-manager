import { Department } from "@prisma/client";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectGroup,
  SelectItem,
} from "./ui/select";
import { StudentType } from "@/lib/student-types";
import { useController } from "react-hook-form";

const department = Object.values(Department);

export const DepartmentPicker = () => {
  const { field } = useController<StudentType, "department">({
    name: "department",
  });
  return (
    <Select
      name={field.name}
      onValueChange={(value) => {
        field.onChange(value);
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Department" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Departments</SelectLabel>
          {department.map((department, index) => (
            <SelectItem value={department} key={index}>
              {department}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
