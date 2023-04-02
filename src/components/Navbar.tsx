import ThemeToggle from "./ThemeToggle";
import Avatar from "./Avatar";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-fem-blue-600">
      <Logo />
      <div className="flex items-center">
        <ThemeToggle />
        <Avatar />
      </div>
    </nav>
  );
};

export default Navbar;
