import Link from "next/link";
import { Button } from "./ui/button";

function Footer() {
  return (
    <>
      <hr />
      <footer className="flex items-center container p-3 justify-center">
        <small className="text-sm"> Made with 💓 by</small>
        <Button asChild variant={"link"} className="pl-1">
          <Link
            className="text-sm"
            href={"https://github.com/afk-ankit"}
            target="_blank"
          >
            afk-ankit
          </Link>
        </Button>
      </footer>
    </>
  );
}

export default Footer;
