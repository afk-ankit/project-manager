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
import { LoaderCircle, UploadIcon, X } from "lucide-react";
import { useRef, useState } from "react";
import { useController, useFieldArray } from "react-hook-form";
import { ProjectType } from "./ProjectCreate";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/supabase/init";

//component starts here
const FileUpload = () => {
  const { field } = useController<ProjectType, "file">({ name: "file" });
  const { append, remove } = useFieldArray({
    name: "file",
  });
  //states
  const [openFiles, setOpenFiles] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadDisabled, setUploadDisabled] = useState(true);
  //refs
  const fileRef = useRef<HTMLInputElement>(null);
  //toast
  const { toast } = useToast();
  //helper function
  async function uploadFile(file: File) {
    try {
      const { data, error } = await supabase.storage
        .from("project_files")
        .upload(`public/${file.name}`, file);
      if (error) {
        throw new Error(error.message);
      } else {
        const { data: url } = supabase.storage
          .from("project_files")
          .getPublicUrl(data.path);
        const { publicUrl } = url;
        return publicUrl;
      }
    } catch (error) {
      if (error instanceof Error)
        toast({ title: "Error", description: error.message });
    }
  }
  const handleSubmit = async () => {
    try {
      if (fileRef.current?.files && fileRef.current.files?.length > 0) {
        setIsUploading(true);
        const url = await uploadFile(fileRef.current.files[0]);
        setIsUploading(false);
        append(url);
        fileRef.current.value = "";
        setUploadDisabled(true);
        toast({
          description: "File uploaded successfully",
          title: "Success",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        setIsUploading(false);
        toast({ description: error.message });
      }
    }
  };

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
          <span>{field.value ? "Add more" : "Upload"}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-md">Upload your files</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            type="file"
            ref={fileRef}
            onChange={(e) => {
              if (e.target?.files && e.target.files?.length > 0) {
                setUploadDisabled(false);
              }
            }}
          />
          {field.value.length > 0 && (
            <>
              <h1 className="text-md">Uploaded File</h1>
              <div className="mt-2 cursor-pointer">
                {field.value.map((url, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-muted-foreground break-words line-clamp-1">
                      {url}
                    </span>
                    <Button
                      variant={"ghost"}
                      size={"icon"}
                      onClick={() => {
                        remove(index);
                        toast({
                          description: "File Removed successfully",
                          title: "Success",
                        });
                      }}
                    >
                      <X className="size-5" />
                    </Button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <DialogFooter className="flex-col lg:justify-start gap-2">
          <Button
            className="flex-1"
            disabled={uploadDisabled || isUploading}
            onClick={handleSubmit}
          >
            {isUploading ? (
              <>
                <LoaderCircle className="mr-2 size-4 animate-spin" /> Uploading
                please wait
              </>
            ) : (
              "Upload file"
            )}
          </Button>
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
