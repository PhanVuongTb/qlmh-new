import React from "react";

const LicenseDetailsPage = ({
  productDetails,
  handleOrderPriceChange,
  updatedOrderPrice,
  formatVND,
  formattedDate,
  handleNoteChange,
  updatedNote,
  handleReject,
  handleConfirm,
  setProductDetails,
  handleClearFilter,
}) => {
  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none drop-shadow-[0_35px_35px_rgba(20,17,219,0.5)]">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="border-0 rounded-xl shadow-lg relative flex flex-col w-full bg-[#fcf9f9] outline-none focus:outline-none">
          <div className="w-full flex justify-between items-center p-3.5 bg-white rounded-xl">
            <div className="w-full">
              <h3 className="text-center">Thông tin chi tiết</h3>
            </div>
            <button
              className="float-right w-[18px] h-[18px] bg-[#577CFF] rounded-md flex items-center justify-center"
              onClick={() => setProductDetails(false)}
            >
              <span className="bg-[#577CFF]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={8}
                  height={8}
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
            <div className="top flex pt-[12px] pb-[19px]">
              <div className="min-w-[101px] min-h-[61px] bg-[#577cff] p-[3px] rounded">
                <div className="min-w-[85px] min-h-[54px] rounded border-dotted border-2 border-white flex justify-center items-center">
                  <p className={`text-center text-white ${productDetails.id}`}>
                    {productDetails.productName}
                  </p>
                </div>
              </div>

              <div className="pl-[12px] flex justify-between min-w-[269px]">
                <div className="flex flex-col justify-between">
                  <p className="text-[#000B23] text-base font-semibold">
                    Biển số :
                    <span className="font-bold ml-1">
                      {productDetails.productName}
                    </span>
                  </p>
                  <p>{productDetails.provinceName}</p>
                </div>
                <div className="flex flex-col justify-between">
                  <div className="flex justify-end items-center"></div>

                  <div>
                    <p className="text-[#577CFF] text-base font-bold">
                      {productDetails.productCategoryName}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="prie min-h-[39px] min-w-[372px] bg-[#577cff1a] flex justify-center items-center rounded-md mb-[16px]">
              <input
                type="text"
                className="block p-4 w-full text-center text-lg font-bold text-blue-500 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleOrderPriceChange}
                name="price"
                value={updatedOrderPrice}
              />
            </div>

            <div className="bot w-full flex flex-col gap-3">
              <div className="day flex justify-between items-center">
                <p>Ngày đăng:</p>
                <span>{formattedDate(productDetails.createdTime)}</span>
              </div>
              <div className="status flex justify-between items-center">
                <p>Trạng thái:</p>
                <span>{productDetails.orderStatusName}</span>
              </div>
              <div className="day-status flex justify-between items-center">
                <p>Ngày mua:</p>
                <span>{formattedDate(productDetails.buyTime)}</span>
              </div>
              <div className="note">
                <p className="mb-2">Ghi chú:</p>
                <textarea
                  type="text"
                  className="w-full rounded-md border border-slate-300 min-h-[80px] p-1.5"
                  onChange={handleNoteChange}
                  name="note"
                  value={updatedNote}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between p-[14px]">
            <button
              className={`bg-[#ED0000] font-bold rounded-lg text-white p-3 text-sm outline-none min-w-[85px] min-h-[44px]: focus:outline-none ${
                ["Đã duyệt", "Đã mua", "Đã hủy"].includes(
                  productDetails.orderStatusName
                )
                  ? "hidden"
                  : ""
              }`}
              type="button"
              onClick={(handleReject, handleClearFilter)}
            >
              <p>Từ chối</p>
            </button>
            <button
              className={`text-white bg-[#577CFF] font-bold rounded-lg text-sm p-3 min-w-[275px] ${
                ["Đã duyệt", "Đã mua", "Đã hủy"].includes(
                  productDetails.orderStatusName
                )
                  ? "hidden"
                  : ""
              }
`}
              type="button"
              onClick={handleConfirm}
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LicenseDetailsPage;
