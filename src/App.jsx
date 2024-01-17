import { Route, Routes } from "react-router-dom";
import "./App.css";
import LayoutWeb from "./Layout/LayoutWeb";

import HomePage from "./HonePage";
import LicensePage from "./license-plate/LicensePage";

import LoginPage from "./LoginPage";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LayoutWeb />}>
          <Route index element={<HomePage />} />
          <Route element={<LoginPage />} />
          <Route path="license-plate-list" element={<LicensePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
