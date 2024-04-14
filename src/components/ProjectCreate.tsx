"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { labelFormatter, frameworks } from "@/lib/student_utils";
import { CalendarIcon, CheckIcon, SearchIcon, UploadIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { compareAsc, format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { supabase } from "@/supabase/init";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "./ui/dialog";

const projectSchema = z.object({
  title: z.string().min(1, "Title cannot be empty").max(20, "Title too long"),
  description: z
    .string()
    .min(1, "Description cannot be empty")
    .max(200, "Description too long"),
  student: z.string().array().nonempty("At least one student must be selected"),
  deadline: z.date(),
  file: z.object({
    name: z.string().min(1, "File name must be provided"),
    url: z.string().min(1, "File must be provided"),
  }),
});

type ProjectType = z.infer<typeof projectSchema>;

function ProjectCreateForm() {
  const [openStudents, setOpenStudents] = useState(false);
  const [openFiles, setOpenFiles] = useState(false);
  const form = useForm<ProjectType>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      file: undefined,
      title: "",
      description: "",
      student: [],
      deadline: undefined,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data: ProjectType) => {
          console.log(data);
        })}
        className="space-y-4 lg:w-[800px] m-auto"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the title for your project"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter the description for your project"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>File Upload</FormLabel>
              <br />
              <FormControl>
                <Dialog open={openFiles} onOpenChange={setOpenFiles}>
                  <DialogTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      <UploadIcon className="mr-2 h-4 w-4" />
                      <span>Upload file</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-md">
                        Upload your files
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        type="file"
                        onChange={(e) => {
                          const url = e.target.value;
                          field.onChange({
                            ...field.value,
                            url,
                          });
                        }}
                      />
                      <Input
                        type="text"
                        placeholder="Enter the name of the file"
                        value={field.value?.name}
                        onChange={(e) => {
                          const name = e.target.value;
                          field.onChange({
                            ...field.value,
                            name,
                          });
                        }}
                      />
                    </div>
                    <DialogFooter className="flex-col lg:justify-start">
                      <DialogClose asChild>
                        <Button className="flex-1">Upload</Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button variant={"secondary"} className="flex-1">
                          Close
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="student"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assign Student</FormLabel>
              <FormControl>
                <Popover open={openStudents} onOpenChange={setOpenStudents}>
                  <PopoverTrigger asChild ref={field.ref}>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between"
                    >
                      {field.value?.length > 0
                        ? labelFormatter(frameworks, field.value)
                        : "Select students..."}
                      <SearchIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search students..."
                        className="h-9"
                      />
                      <CommandEmpty>No students found</CommandEmpty>
                      <CommandGroup>
                        <CommandList>
                          {frameworks.map((framework) => (
                            <CommandItem
                              key={framework.value}
                              value={framework.value}
                              onSelect={(currentValue) => {
                                let selected_students: [string, ...string[]];
                                if (field.value?.includes(currentValue)) {
                                  selected_students = [...field.value];
                                  const index = field.value.findIndex(
                                    (student) => student == currentValue,
                                  );
                                  selected_students.splice(index, 1);
                                  field.onChange(selected_students);
                                  return;
                                }
                                if (field.value?.length > 0) {
                                  selected_students = [...field.value];
                                  selected_students.push(currentValue);
                                } else selected_students = [currentValue];
                                field.onChange(selected_students);
                              }}
                            >
                              {framework.label}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",

                                  field.value?.includes(framework.value)
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandList>
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="deadline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deadline</FormLabel>
              <br />
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      ref={field.ref}
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onDayClick={(date) => {
                        if (date) {
                          if (compareAsc(field.value, date) === 0) {
                            field.onChange(undefined);
                            return;
                          }
                          field.onChange(date);
                        }
                      }}
                      initialFocus
                      disabled={{ before: new Date() }}
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default ProjectCreateForm;
