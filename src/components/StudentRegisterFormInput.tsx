import { FieldPath } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { ReactNode } from "react";
import { StudentType } from "@/lib/student-types";

type FormInputProps = {
  children: ReactNode;
  name: FieldPath<StudentType>;
};

export const FormInput = ({ children, name }: FormInputProps) => {
  return (
    <FormField
      name={name}
      render={() => (
        <FormItem>
          <FormLabel className="capitalize">{name}</FormLabel>
          <FormControl>{children}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
