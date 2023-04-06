import ThemeToggle from "./ThemeToggle";
import Avatar from "./Avatar";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <nav className="fixed inset-x-0 z-50 flex items-center justify-between bg-fem-blue-600 dark:bg-fem-blue-700 lg:inset-x-auto lg:inset-y-0 lg:flex-col lg:rounded-r-[1.25rem]">
      <Logo />
      <div className="flex items-center lg:flex-col">
        <ThemeToggle />
        <Avatar />
      </div>
    </nav>
  );
};

export default Navbar;
