import { useState } from "react";
import HeaderPage from "../components/HeaderPage";
import { Outlet } from "react-router-dom";

const LayoutWeb = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <section
      className={`w-full ${
        darkMode ? "dark" : "light"
      }  min-h-[100vh] bg-[url('assets/bg-pc.jpg')] bg-cover bg-no-repeat bg-center`}
    >
      <HeaderPage darkMode={darkMode} setDarkMode={setDarkMode} />
      <main>
        <Outlet />
      </main>
    </section>
  );
};

export default LayoutWeb;
