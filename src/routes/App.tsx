import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useContext, useEffect } from "react";
import { UserCtx } from "../store/UserContext";

function App() {
  const { isDarkTheme } = useContext(UserCtx);
  useEffect(() => {
    const htmlElement = document.getElementById("html");
    if (isDarkTheme) {
      htmlElement!.classList.add("dark");
    } else {
      htmlElement!.classList.remove("dark");
    }
  }, [isDarkTheme]);
  return (
    <div className="relative">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
