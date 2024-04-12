"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Menu, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";

function MobileNavbar() {
  const { setTheme, theme } = useTheme();
  return (
    <nav className="lg:hidden flex items-center container py-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="ml-auto">
          <Button size={"icon"} variant="outline">
            <Menu />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link href={"/"}>Something</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={"/"}>Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={"/"}>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="gap-2"
            onClick={() => {
              if (theme == "dark") {
                setTheme("light");
              } else {
                setTheme("dark");
              }
            }}
          >
            {theme == "dark" ? "Light" : "Dark"}
            <Moon size={"1rem"} className="dark:hidden" />
            <Sun size={"1rem"} className="hidden dark:inline-block" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}

export default MobileNavbar;
