"use client";
import { useForm } from "react-hook-form";
import { Form } from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { FormInput } from "./StudentRegisterFormInput";
import { DepartmentPicker } from "./DepartmentPicker";
import { StudentRegisterInput } from "./StudentRegisterInput";
import { StudentType, studentSchema } from "@/lib/student-types";
import { useAction } from "next-safe-action/hooks";
import { createStudent } from "@/actions/action";
import { useToast } from "./ui/use-toast";
import { LoaderCircle } from "lucide-react";

const StudentRegister = () => {
  const { toast } = useToast();
  const { execute, status } = useAction(createStudent, {
    onError(error) {
      if (error)
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
  const form = useForm<StudentType>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: "",
      roll_no: "",
      year_joining: new Date().getFullYear(),
      year_passing: new Date().getFullYear() + 4,
      course: "",
      university: "",
      semester: 1,
    },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          console.log(data);
          execute(data);
        })}
        className="space-y-4 lg:w-[800px] m-auto"
      >
        <FormInput name="name">
          <StudentRegisterInput
            fieldName="name"
            placeholder="enter your name"
          />
        </FormInput>
        <FormInput name="roll_no">
          <StudentRegisterInput
            fieldName="roll_no"
            placeholder="enter your roll no"
          />
        </FormInput>
        <FormInput name="year_joining">
          <StudentRegisterInput
            fieldName="year_joining"
            placeholder="enter year of joining"
          />
        </FormInput>
        <FormInput name="year_passing">
          <StudentRegisterInput
            fieldName="year_passing"
            placeholder="enter year of passing"
          />
        </FormInput>
        <FormInput name="department">
          <DepartmentPicker />
        </FormInput>
        <FormInput name="course">
          <StudentRegisterInput
            fieldName="course"
            placeholder="enter your course"
          />
        </FormInput>
        <FormInput name="semester">
          <StudentRegisterInput
            fieldName="semester"
            placeholder="enter your semester"
          />
        </FormInput>
        <FormInput name="university">
          <StudentRegisterInput
            fieldName="university"
            placeholder="enter your university"
          />
        </FormInput>
        <FormInput name="university_id">
          <StudentRegisterInput
            fieldName="university_id"
            placeholder="enter your university id"
          />
        </FormInput>
        <Button
          type="submit"
          className="w-full"
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
};

export default StudentRegister;
