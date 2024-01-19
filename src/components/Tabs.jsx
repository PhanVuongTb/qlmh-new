import React from "react";
import { Link } from "react-router-dom";

const Tabs = ({ orderStatusId, handleTabClick }) => {
  return (
    <ul
      className="flex mb-0 list-none flex-wrap pt-1 pb-2 flex-row mt-1"
      role="tablist"
    >
      <li className="-mb-px mr-1 last:mr-0 flex-auto text-center">
        <button
          onClick={() => handleTabClick(1001)}
          id="tab-1"
          className={`w-full text-xs sm:text-xl px-1 py-3 shadow-lg rounded leading-normal sm:py-3 sm:px-5 sm:font-semibold flex items-center justify-center dark:text-white dark:bg-bg-577CFF light:text-black light:bg-white ${
            orderStatusId === 1001 ? "active-tab" : ""
          }`}
        >
          Chờ duyệt
        </button>
      </li>
      <li className="-mb-px mr-1 last:mr-0 flex-auto text-center">
        <button
          onClick={() => handleTabClick(1002)}
          id="tab-2"
          className={`w-full text-xs sm:text-xl px-1 py-3 shadow-lg rounded leading-normal sm:py-3 sm:px-5 sm:font-semibold flex items-center justify-center dark:text-white dark:bg-bg-577CFF light:text-black light:bg-white ${
            orderStatusId === 1002 ? "active-tab" : ""
          }`}
        >
          Đã duyệt
        </button>
      </li>
      <li className="-mb-px mr-1 last:mr-0 flex-auto text-center">
        <Link
          onClick={() => handleTabClick(1004)}
          id="tab-3"
          className={`w-full text-xs sm:text-xl px-1 py-3 shadow-lg rounded leading-normal sm:py-3 sm:px-5 sm:font-semibold flex items-center justify-center dark:text-white dark:bg-bg-577CFF light:text-black light:bg-white ${
            orderStatusId === 1004 ? "active-tab" : ""
          }`}
        >
          Đã mua
        </Link>
      </li>
      <li className="-mb-px mr-1 last:mr-0 flex-auto text-center">
        <Link
          onClick={() => handleTabClick(1005)}
          id="tab-4"
          className={`w-full text-xs sm:text-xl px-1 py-3 shadow-lg rounded leading-normal sm:py-3 sm:px-5 sm:font-semibold flex items-center justify-center dark:text-white dark:bg-bg-577CFF light:text-black light:bg-white ${
            orderStatusId === 1005 ? "active-tab" : ""
          }`}
        >
          Đã hủy
        </Link>
      </li>
    </ul>
  );
};

export default Tabs;
