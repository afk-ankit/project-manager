import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { frameworks, labelFormatter } from "@/lib/student_utils";
import { cn } from "@/lib/utils";
import { CheckIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import { ProjectType } from "./ProjectCreate";
import { useController } from "react-hook-form";
function StudentPicker() {
  const { field } = useController<ProjectType, "student">({ name: "student" });
  const [openStudents, setOpenStudents] = useState(false);
  return (
    <>
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
            <CommandInput placeholder="Search students..." className="h-9" />
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
    </>
  );
}

export default StudentPicker;
