import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { UploadIcon } from "lucide-react";
import { useState } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { ProjectType } from "./ProjectCreate";

const FileUpload = ({
  field,
}: {
  field: ControllerRenderProps<ProjectType, "file">;
}) => {
  const [openFiles, setOpenFiles] = useState(false);
  return (
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
          <DialogTitle className="text-md">Upload your files</DialogTitle>
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
  );
};

export default FileUpload;
