import { FieldPath } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { ReactNode } from "react";
import { ProjectType } from "./ProjectCreate";

type FormInputProps = {
  children: ReactNode;
  name: FieldPath<ProjectType>;
};

export const FormInput = ({ children, name }: FormInputProps) => {
  return (
    <FormField
      name={name}
      render={() => (
        <FormItem>
          <FormLabel>Title</FormLabel>
          <FormControl>{children}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
