import { useController } from "react-hook-form";
import { Textarea } from "./ui/textarea";
import { ProjectType } from "./ProjectCreate";

export const ControlledTextArea = () => {
  const { field } = useController<ProjectType, "description">({
    name: "description",
  });
  return (
    <Textarea placeholder="Enter the description for your project" {...field} />
  );
};
