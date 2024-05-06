import { FieldPath, useController } from "react-hook-form";
import { StudentType } from "@/lib/student-types";
import { Input } from "./ui/input";
import { InputHTMLAttributes } from "react";

type FieldName = FieldPath<Omit<StudentType, "department">>;

interface StudentRegisterInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  fieldName: FieldName;
}

export const StudentRegisterInput = (props: StudentRegisterInputProps) => {
  const { field } = useController<StudentType, FieldName>({
    name: props.fieldName,
  });
  if (
    props.fieldName.includes("university_id") ||
    props.fieldName.includes("semester") ||
    props.fieldName.includes("year_joining") ||
    props.fieldName.includes("year_passing")
  ) {
    return (
      <Input
        type="number"
        {...props}
        {...field}
        onChange={(e) => field.onChange(parseInt(e.target.value))}
      />
    );
  }
  return <Input type="text" {...props} {...field} />;
};
