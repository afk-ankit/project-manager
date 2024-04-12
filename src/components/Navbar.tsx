import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggler";

export const Navbar = () => {
  return (
    <header>
      <nav className="flex items-center container py-2">
        <Button variant={"link"} className="ml-auto" asChild>
          <Link href={"/"} className="font-bold">
            Something
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
      <hr />
    </header>
  );
};
