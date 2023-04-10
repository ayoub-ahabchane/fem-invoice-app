import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useContext, useEffect } from "react";
import { UserCtx } from "../store/UserContext";

function App() {
  const { isDarkTheme, showModal } = useContext(UserCtx);
  useEffect(() => {
    const htmlElement = document.getElementById("html");
    if (isDarkTheme) {
      htmlElement!.classList.add("dark");
    } else {
      htmlElement!.classList.remove("dark");
    }
  }, [isDarkTheme]);
  return (
    <div className={`${showModal && "h-screen overflow-hidden"}`}>
      <Navbar />
      <Outlet />

      <div
        id="modalPortal"
        className={`${
          !showModal && "hidden"
        } absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-25 p-8 backdrop-blur-sm`}
      ></div>
    </div>
  );
}

export default App;
