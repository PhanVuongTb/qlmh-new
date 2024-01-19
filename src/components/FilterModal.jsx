import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FilterModal = ({
  setShowModal,
  province,
  productCategory,
  productBrand,
  selectedProvince,
  setSelectedProvince,
  selectedProductCategory,
  setSelectedProductCategory,
  selectedProductBrand,
  setSelectedProductBrand,
  handleFilterClick,
  keyword,
  setKeyword,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  handleStartDateChange,
  handleEndDateChange,
  handleClearFilter,
}) => {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none m-2">
        <div className="max-w-[365px] relative my-6 mx-auto w-full">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t text-center w-full">
              <h5 className="text-sm font-semibold w-full sm:text-2xl">
                Lọc theo
              </h5>
              <button
                className="p-1 bg-[#577CFF] border-0 w-[18px] h-[18px] text-white flex items-center justify-center rounded-md sm:w-[38px] sm:h-[38px] sm:text-2xl"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
            {/*body*/}
            <div className="p-6 flex-auto">
              <input
                type="text"
                id="default-search"
                className="block p-4 pl-3 w-full focus-visible: text-sm placeholder:text-black text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nhập ..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                required
              />

              <div className="cus-select-group">
                <Select
                  options={province}
                  value={selectedProvince}
                  onChange={(selectedOption) =>
                    setSelectedProvince(selectedOption)
                  }
                  placeholder="Chọn tỉnh thành"
                  className="block  mt-4 w-full text-sm placeholder:text-black text-gray-900 bg-gray-50 rounded-lg border focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <div className="cus-select-group">
                {/* <select
                  id="countries"
                  defaultValue={"DEFAULT"}
                  className="block mt-4 p-4 pl-3 w-full text-sm placeholder:text-black text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option
                    selected
                    className="text-sm font-normal text-gray-200"
                  >
                    Chọn loại xe
                  </option>
                  {productCategory.map((item, i) => {
                    return (
                      <option className="text-black" key={i} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select> */}
                <Select
                  options={productCategory}
                  value={selectedProductCategory}
                  onChange={(selectedOption1) =>
                    setSelectedProductCategory(selectedOption1)
                  }
                  placeholder="Chọn loại xe"
                  className="block  mt-4 w-full text-sm placeholder:text-black text-gray-900 bg-gray-50 rounded-lg border focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <div className="cus-select-group">
                {/* <select
                  id="countries"
                  defaultValue={"DEFAULT"}
                  className="block mt-4 p-4 pl-3 w-full text-sm placeholder:text-black text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option
                    selected
                    className="text-sm font-normal text-gray-200"
                  >
                    Chọn loại biển
                  </option>
                  {productBrand.map((item, i) => (
                    <option className="text-black" key={i} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select> */}
                <Select
                  options={productBrand}
                  value={selectedProductBrand}
                  onChange={(selectedOption2) =>
                    setSelectedProductBrand(selectedOption2)
                  }
                  placeholder="Chọn loại biển"
                  className="block  mt-4 w-full text-sm placeholder:text-black text-gray-900 bg-gray-50 rounded-lg border focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <div className="cus-select-group w-full">
                <DatePicker
                  className="block mt-4 p-4 pl-3 w-full text-sm placeholder:text-black text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  isClearable
                  selected={startDate}
                  onChange={handleStartDateChange}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Từ ngày"
                />
                <DatePicker
                  className="block mt-4 p-4 pl-3 w-full text-sm placeholder:text-black text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  isClearable
                  selected={endDate}
                  onChange={handleEndDateChange}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  placeholderText="Đến ngày"
                />
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b gap-[12px]">
              <button
                className="text-white text-base w-1/3 h-[44px] bg-[#ED0000] font-bold uppercase py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                type="button"
                onClick={handleClearFilter}
              >
                Hủy bỏ
              </button>
              <button
                className="bg-[#577CFF] text-white text-base w-2/3 h-[44px] font-bold uppercase py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                type="button"
                onClick={handleFilterClick}
              >
                Lọc tìm kiếm
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default FilterModal;
