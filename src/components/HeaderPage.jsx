import { useState } from "react";
// import icons
import { BsFillSunFill, BsMoonFill } from "react-icons/bs";
import Logo from "../assets/Logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserDetail from "./UserDetail";

// const user = JSON.parse(localStorage.userData).resources.token;

const HeaderPage = ({ darkMode, setDarkMode }) => {
  const history = useNavigate();

  const user = localStorage.userData
    ? JSON.parse(localStorage.userData).resources.username
    : null;

  const [open, setOpen] = useState(false);

  const [showModalUser, setShowModalUser] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("userData");
    toast.success("Đăng xuất thành công");
    history("/");
  };

  return (
    <>
      <header className="w-full container flex flex-col sm:flex-row py-2 ">
        <div className="logo w-full flex justify-center items-center sm:justify-start sm:w-1/3 pb-5 sm:p-0">
          <Link to="/bien-so">
            <img src={Logo} alt="" />
          </Link>
        </div>
        <div className="w-full flex  justify-end items-center max-sm:flex-col-reverse lg:w-2/3 sm:w-2/3">
          <div className="w-full flex lg:justify-end justify-between items-center sm:w-2/3">
            {user ? (
              <div className="group">
                <button
                  className="outline-none focus:outline-none border rounded-lg px-2 py-1 bg-white flex items-center min-w-32"
                  onClick={() => setShowModalUser(true)}
                >
                  <div
                    aria-label="header"
                    className="flex space-x-4 items-center p-0.5"
                  >
                    <div
                      aria-label="avatar"
                      className="flex mr-auto items-center space-x-4"
                    >
                      <img
                        src="https://cdn1.iconfinder.com/data/icons/marketing-19/100/Profile-512.png"
                        alt="avatar Evan You"
                        className="w-10 h-10 shrink-0 rounded-full"
                      />
                      <div className="space-y-2 flex flex-col flex-1 truncate">
                        <div className="font-medium relative text-sm leading-tight text-gray-900">
                          <span className="flex">
                            <span className="truncate relative pr-8">
                              {user}
                              <span
                                aria-label="verified"
                                className="absolute top-1/2 -translate-y-1/2 right-0 inline-block rounded-full"
                              ></span>
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
                {showModalUser ? (
                  <UserDetail
                    Logo={Logo}
                    showModalUser={showModalUser}
                    setShowModalUser={setShowModalUser}
                    handleLogout={handleLogout}
                  />
                ) : null}
                <div
                  className="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute 
  transition duration-150 ease-in-out origin-top min-w-32"
                ></div>
              </div>
            ) : (
              ""
            )}
            <div className="col-right flex items-center justify-center">
              <div className="notification">
                <button
                  onClick={handleToggle}
                  className="font-medium rounded-lg text-sm px-5 py-4 text-center inline-flex items-center justify-center"
                  type="button"
                >
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 21"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 3.464V1.1m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175C15 15.4 15 16 14.462 16H1.538C1 16 1 15.4 1 14.807c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 8 3.464ZM4.54 16a3.48 3.48 0 0 0 6.92 0H4.54Z"
                    />
                  </svg>
                </button>
                <div
                  className={`origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 ${
                    open ? "block" : "hidden"
                  }`}
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Dashboard
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="btn-dark flex justify-center items-center">
                <button
                  className={` hover:bg-gray-700 text-white font-medium p-2 h-12 rounded-md border border-white bg-black ${
                    darkMode ? "active" : ""
                  }`}
                  onClick={() => setDarkMode(!darkMode)}
                >
                  {darkMode ? <BsFillSunFill /> : <BsMoonFill />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderPage;
