import MobileNavbar from "./MobileNavbar";
import { Navbar } from "./Navbar";

export const Header = () => {
  return (
    <header className="sticky top-0 bg-background">
      <Navbar />
      <MobileNavbar />
    </header>
  );
};
