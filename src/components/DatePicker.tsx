import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { compareAsc, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useController } from "react-hook-form";
import { ProjectType } from "./ProjectCreate";
function DatePicker() {
  const { field } = useController<ProjectType, "deadline">({
    name: "deadline",
  });
  return (
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
          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
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
  );
}

export default DatePicker;
