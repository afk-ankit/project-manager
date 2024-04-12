import { Input } from "./ui/input";
import { Button } from "./ui/button";
function Form() {
  return (
    <form className="w-80 space-y-3 mt-2">
      <Input placeholder="title" name="title" />
      <Input placeholder="description" name="description" />
      <Button className="w-full">Submit</Button>
    </form>
  );
}

export default Form;
