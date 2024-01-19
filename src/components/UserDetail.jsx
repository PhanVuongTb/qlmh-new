import React from "react";

const UserDetail = ({ setShowModalUser, Logo, handleLogout }) => {
  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none drop-shadow-[0_35px_35px_rgba(20,17,219,0.5)]">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="border-0 rounded-xl shadow-lg relative flex flex-col w-full bg-[#fcf9f9] outline-none focus:outline-none">
          <div className="w-full flex justify-end items-center p-3.5  rounded-xl">
            <button
              className="float-right p-2 bg-[#577CFF] rounded-3xl flex items-center justify-center"
              onClick={() => setShowModalUser(false)}
            >
              <span className="bg-[#577CFF]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={12}
                  height={12}
                  viewBox="0 0 8 8"
                  fill="none"
                  stroke="#f5f5f5"
                >
                  <g clipPath="url(#clip0_276_2686)">
                    <path
                      d="M5.0875 3.99999L7.775 1.31249C8.07656 1.01249 8.07656 0.526555 7.77812 0.224992C7.47812 -0.0765701 6.99219 -0.0765701 6.69063 0.221867L6.68906 0.22343L4.00156 2.91093L1.3125 0.224992C1.0125 -0.0750076 0.525 -0.0750076 0.225 0.224992C-0.075 0.524992 -0.075 1.01249 0.225 1.31249L2.9125 3.99999L0.225 6.68749C-0.075 6.98749 -0.075 7.47499 0.225 7.77499C0.525 8.07499 1.0125 8.07499 1.3125 7.77499L4 5.08749L6.6875 7.77499C6.9875 8.07499 7.475 8.07499 7.775 7.77499C8.075 7.47499 8.075 6.98749 7.775 6.68749L5.0875 3.99999Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_276_2686">
                      <rect width={8} height={8} fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
            </button>
          </div>
          <div className="px-[14px]">
            <div className="top flex justify-center items-center flex-col gap-4 pb-[22px]">
              <div className="w-[80px] h-[80px] rounded-[120px]">
                <img
                  src="https://cdn1.iconfinder.com/data/icons/marketing-19/100/Profile-512.png"
                  alt=""
                />
              </div>
              <div className="flex justify-center items-center flex-col">
                <h2 className="text-base font-semibold">Trung trần</h2>
                <p className="text-xs font-normal text-[#577CFF]">Consumer</p>
              </div>
            </div>

            <div className="prie min-h-[39px] min-w-[372px] bg-[#fff] flex justify-center items-center flex-col divide-y rounded-3xl mb-[16px] px-[20px] py-[10px] shadow-[0px_4px_40px_rgba(0, 0, 0, 0.10)]">
              <div className="flex justify-between items-center w-full py-2">
                <p>Số điện thoại:</p> <p>0365 123 456</p>
              </div>
              <div className="flex justify-between items-center w-full py-2">
                <p>Email:</p> <p>Trung123@gmaiil.com</p>
              </div>
              <div className="flex justify-between items-center w-full py-2">
                <p>Phòng ban:</p> <p>Kỹ thuật</p>
              </div>
              <div className="flex justify-between items-center w-full py-2">
                <p>Địa chỉ:</p> <p>Hà Nội</p>
              </div>
            </div>

            <div className="bot w-full flex flex-col pt-[30px] pb-[18px] gap-3">
              <div className="day flex justify-center items-center flex-col gap-6">
                <img src={Logo} alt="" />
                <p>Version 1.1</p>
                <a href="#">Điều khoản chính sách</a>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between p-[14px]">
            <button
              className="text-white bg-[#577CFF] font-normal rounded-lg text-sm p-3 w-full"
              type="button"
              onClick={handleLogout}
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
