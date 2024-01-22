import axios from "axios";
import bg from "./assets/bg-login.jpg";
import logo from "./assets/Logo.svg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
const LoginPage = () => {
  const history = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  useEffect(() => {
    const token = localStorage.getItem("userData");

    if (token) {
      history("/license-plate-list");
    }
  }, [history]);

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      // Make a login request using Axios
      const response = await axios.post(
        `${import.meta.env.VITE_URL_HEAD}account/api/login`,
        {
          username,
          password,
        }
      );
      if(response.data.message ==  "SUCCESS"){
        const userData = response.data;
        localStorage.setItem("userData", JSON.stringify(userData));
        toast.success("Đăng nhập thành công");
        history("/license-plate-list");
      }
      else{
        Swal.fire(
          "Đăng nhập không thành công",
          "Vui lòng kiểm tra lại thông tin",
          "error"
        )
      }
      
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="container max-h-full">
      <div className="flex items-center justify-center">
        <div className="relative h-[800px] w-[400px] overflow-hidden rounded-3xl">
          <div
            className="h-full w-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${bg})`,
            }}
          />
          <div className="absolute bottom-0 flex w-full flex-col rounded-t-3xl">
            <form
              className="mt-10 space-y-4 px-6 pb-[40px] text-center flex items-center flex-col w-full"
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              <div className="logo">
                <img src={logo} alt="" />
              </div>
              <div className="title-dn">
                <h5 className="text-black text-lg font-semibold">Đăng nhập</h5>
                <p className="text-xs pt-2">
                  Đăng nhập hệ thống bằng tài khoản và mật khẩu
                </p>
              </div>
              <div className="group  w-full">
                <label
                  htmlFor="username"
                  className="left-2 top-0 flex h-full transform items-center pl-2 mb-2 text-base"
                >
                  Tên đăng nhập
                </label>
                <input
                  type="text"
                  id="username"
                  required
                  className="h-[44px] w-full rounded-md  bg-white px-4 text-sm outline-none"
                  onChange={handleUsername}
                />
              </div>
              <div className="group w-full">
                <label
                  htmlFor="password"
                  className="left-2 top-0 flex h-full transform items-center pl-2  mb-2  text-base"
                >
                  Mật khẩu
                </label>
                <input
                  type="password"
                  id="password"
                  required
                  className="h-[44px]  w-full rounded-md  bg-white px-4 text-sm outline-none"
                  onChange={handlePassword}
                />
              </div>
              <button className="h-[44px] w-full rounded-md bg-blue-900 text-white transition-all duration-300 hover:bg-blue-800">
                Đăng nhập
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
