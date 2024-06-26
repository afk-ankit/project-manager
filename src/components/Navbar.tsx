import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggler";

export const Navbar = () => {
  return (
    <nav className=" items-center container py-2 lg:flex hidden ">
      <Button variant={"link"} className="ml-auto" asChild>
        <Link href={"/project"} className="font-bold">
          Project
        </Link>
      </Button>
      <Button variant={"link"} asChild>
        <Link href={"/"} className="font-bold">
          Dashboard
        </Link>
      </Button>
      <Button variant={"link"} asChild>
        <Link href={"/"} className="font-bold">
          Profile
        </Link>
      </Button>
      <ModeToggle />
    </nav>
  );
};
