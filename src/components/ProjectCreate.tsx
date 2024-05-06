"use client";
import { createProject } from "@/actions/action";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import DatePicker from "./DatePicker";
import FileUpload from "./FileUpload";
import { ControlledInput } from "./ProjectControlledInput";
import { ControlledTextArea } from "./ProjectControlledTextArea";
import { FormInput } from "./ProjectFormInput";
import StudentPicker from "./StudentPicker";
import { useAction } from "next-safe-action/hooks";
import { useToast } from "./ui/use-toast";
import { LoaderCircle } from "lucide-react";
import { ProjectType, projectSchema } from "@/lib/project-types";

export function ProjectCreateForm() {
  const { toast } = useToast();
  const { status, execute } = useAction(createProject, {
    onError(error) {
      if (error.fetchError)
        toast({ variant: "destructive", description: error.fetchError });
      if (error.serverError)
        toast({ variant: "destructive", description: error.serverError });
      if (error.validationErrors)
        toast({
          variant: "destructive",
          description: "Validation Error",
        });
    },
    onSuccess(data) {
      toast({ description: data.message });
      form.reset();
    },
  });
  const form = useForm<ProjectType>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      file: [],
      title: "",
      description: "",
      student: [],
      deadline: undefined,
    },
  });

  const formSubmit = (data: ProjectType) => {
    execute(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(formSubmit)}
        className="space-y-4 lg:w-[800px] m-auto"
      >
        <FormInput name="title">
          <ControlledInput />
        </FormInput>
        <FormInput name="description">
          <ControlledTextArea />
        </FormInput>
        <FormInput name="file">
          <FileUpload />
        </FormInput>
        <FormInput name="student">
          <StudentPicker />
        </FormInput>
        <FormInput name="deadline">
          <DatePicker />
        </FormInput>
        <Button
          type="submit"
          className="w-full flex"
          disabled={status === "executing"}
        >
          {status === "executing" ? (
            <>
              <LoaderCircle className="mr-2 size-4 animate-spin" />
              Creating
            </>
          ) : (
            "Create"
          )}
        </Button>
      </form>
    </Form>
  );
}
