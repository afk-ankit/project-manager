import { Input } from "./ui/input";
import { useController } from "react-hook-form";
import { ProjectType } from "./ProjectCreate";

export const ControlledInput = () => {
  const { field } = useController<ProjectType, "title">({
    name: "title",
  });
  return <Input placeholder="Enter the title for your project" {...field} />;
};
