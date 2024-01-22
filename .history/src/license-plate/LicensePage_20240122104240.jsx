import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "react-toastify";
import Tabs from "../components/Tabs";
import LicenseDetailsPage from "./LicenseDetailsPage";
import SaearchForm from "../components/SaearchForm";
import FilterModal from "../components/FilterModal";

const LicensePage = () => {
  const history = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [orders, setOrders] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [orderStatusId, setOrderStatusId] = useState(1001);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [productDetails, setProductDetails] = useState(false);

  const [updatedNote, setUpdatedNote] = useState("");
  const [updatedOrderPrice, setUpdatedOrderPrice] = useState("");

  const [searchKeyword, setSearchKeyword] = useState("");

  const [sortField, setSortField] = useState("buyTime");
  const [sortDirection, setSortDirection] = useState("asc");

  const [showModal, setShowModal] = useState(false);

  const [province, setProvince] = useState([]);
  const [productCategory, setProductCategory] = useState([]);
  const [productBrand, setProductBrand] = useState([]);

  const [keyword, setKeyword] = useState("");
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedProductCategory, setSelectedProductCategory] = useState(null);
  const [selectedProductBrand, setSelectedProductBrand] = useState(null);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [render, setRender] = useState(1);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleSort = (field) => {
    // Toggle sort direction if the same field is clicked
    if (field === sortField) {
      setSortDirection((prevDirection) =>
        prevDirection === "asc" ? "desc" : "asc"
      );
    } else {
      // Set new sort field and default to ascending direction
      setSortField(field);
      setSortDirection("asc");
    }
    // Reset pagination and fetch orders with sorting parameters
    setCurrentPage(1);
    setOrders([]);
    setHasMore(true);
    fetchOrders();
  };

  const handleOrderPriceChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setUpdatedOrderPrice(value);
    }
  };

  const handleNoteChange = (e) => {
    setUpdatedNote(e.target.value);
  };

  // formattedDate;
  const formattedDate = (dateString) => {
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", options);
  };

  const formatVND = (number) => {
    // Using toLocaleString to format the number with dots as thousands separators
    var formattedNumber = number.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    return formattedNumber;
  };

  const formattedStartDate = startDate ? format(startDate, "dd/MM/yyyy") : null;
  const formattedEndDate = endDate ? format(endDate, "dd/MM/yyyy") : null;

  const fetchOrders = async () => {
    const token = JSON.parse(localStorage.userData).resources.token;

    try {
      const response = await axios.post(
        "https://qlmh.dion.vn/orders/api/list-paging",
        {
          keyword: keyword,
          orderStatusId,
          provinceId: selectedProvince?.value,
          productBrandId: selectedProductCategory?.value,
          productCategoryId: selectedProductBrand?.value,
          fromDate: formattedStartDate,
          toDate: formattedEndDate,
          pageIndex: currentPage,
          pageSize,
          sortField,
          sortDirection,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const sortedOrders = response.data.data.sort((a, b) => {
        if (sortField === "buyTime") {
          const dateA = new Date(a[sortField]);
          const dateB = new Date(b[sortField]);
          const now = new Date();
          const diffA = Math.abs(now - dateA);
          const diffB = Math.abs(now - dateB);
          return sortDirection === "asc" ? diffA - diffB : diffB - diffA;
        } else if (sortField === "orderPrice") {
          const priceA = a[sortField];
          const priceB = b[sortField];
          return sortDirection === "asc" ? priceA - priceB : priceB - priceA;
        } else {
          return 0;
        }
      });

      setOrders((prevOrders) => [...prevOrders, ...sortedOrders]);

      if (sortedOrders.length < pageSize) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleSearch = (value) => {
    setSearchKeyword(value);

    if (value.trim() === "") {
      // If search value is empty, reset to original order list
      setOrders([]);
      setHasMore(true); // Reset pagination
      setCurrentPage(1);
      fetchOrders(); // Fetch orders without search filters
      return;
    }

    const filtered = orders.filter(
      (product) =>
        product.productName.toLowerCase().includes(value.toLowerCase()) ||
        product.productCategoryName
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        product.provinceName.toLowerCase().includes(value.toLowerCase()) ||
        product.productBrandName.toLowerCase().includes(value.toLowerCase()) ||
        String(product.orderPrice).includes(value)
    );
    setOrders(filtered);
    setHasMore(false); // Reset pagination since the order list has changed
    setCurrentPage(1); // Reset current page to 1
  };

  // console.log(orders);

  // Function to handle tab click
  const handleTabClick = (statusId) => {
    if (statusId !== setOrderStatusId) {
      setSearchKeyword("");
      setOrders([]);
      setHasMore(true);
      setCurrentPage(1);
      setOrderStatusId(statusId);
    }
  };

  const handleFilterClick = () => {
    setCurrentPage(1);
    setOrders([]);
    setHasMore(true);
    fetchOrders();
    setShowModal(false);
  };

  const clearFilters = () => {
    setKeyword("");
    setStartDate(null);
    setEndDate(null);
    setSelectedProvince(null);
    setSelectedProductCategory(null);
    setSelectedProductBrand(null);
    setRender(render + 1);
  };

  const handleClearFilter = () => {
    clearFilters();
  };

  useEffect(() => {
    fetchOrders();
  }, [orderStatusId, currentPage, render]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight &&
      hasMore
    ) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore]);

  // Product Details;

  const getProductDetails = async (productId) => {
    try {
      const response = await axios.get(
        `https://qlmh.dion.vn/orders/api/get-detail-order-sort/${productId}`
      );
      setProductDetails(response.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    if (selectedProductId !== null) {
      getProductDetails(selectedProductId);
    }
  }, [selectedProductId]);

  const handleLinkClick = (productId) => {
    setSelectedProductId(productId);
    getProductDetails(productId);
  };

  const updateProductDetails = async (
    productId,
    orderStatusId,
    updatedNote,
    updatedOrderPrice
  ) => {
    const token = JSON.parse(localStorage.userData).resources.token;

    try {
      const response = await axios.post(
        `https://qlmh.dion.vn/orders/api/update-order-sort`,
        {
          Id: productId,
          OrderStatusId: orderStatusId,
          Note: updatedNote,
          price: updatedOrderPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchOrders();
      setProductDetails(false);
    } catch (error) {
      console.error("Error updating order status:", error);
    }

    history("/license-plate-list");
  };

  const handleReject = () => {
    updateProductDetails(
      productDetails.id,
      1005,
      updatedNote,
      updatedOrderPrice
    );
    toast.error("Đã hủy thành công");
    setProductDetails(false);
  };

  const handleConfirm = () => {
    updateProductDetails(
      productDetails.id,
      1002,
      updatedNote,
      updatedOrderPrice
    );
    toast.success("Đã duyệt thành công");
    setProductDetails(false);
  };

  useEffect(() => {
    if (productDetails) {
      setUpdatedOrderPrice(productDetails.orderPrice);
      setUpdatedNote(productDetails.note);
    }
  }, [productDetails]);

  // New function to delete a row
  const handleDeleteRow = (targetIndex) => {
    setOrders((prevOrders) =>
      prevOrders.filter((_, idx) => idx !== targetIndex)
    );
  };

  // Lọc
  const getProvince = async () => {
    try {
      const response = await axios.get(
        "https://qlmh.dion.vn/province/api/list"
      );

      const data = response.data.data;

      const formattedOptions = data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setProvince(formattedOptions);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const getProductCategory = async () => {
    try {
      const response = await axios.get(
        "https://qlmh.dion.vn/productbrand/api/list"
      );

      const data = response.data.data;

      const formattedOptions = data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setProductCategory(formattedOptions);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const getProductBrand = async () => {
    try {
      const response = await axios.get(
        "https://qlmh.dion.vn/productcategory/api/list"
      );

      const data = response.data.data;

      const formattedOptions1 = data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setProductBrand(formattedOptions1);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    getProvince();
    getProductCategory();
    getProductBrand();
  }, []);

  return (
    <div className="container">
      <div className="flex items-center justify-center">
        <SaearchForm
          handleSearch={handleSearch}
          searchKeyword={searchKeyword}
        />

        <button
          className="w-[91px] h-[53px] mt-2 ml-2 rounded-xl bg-[#577CFF] flex items-center justify-center text-white active:bg-pink-600 font-bold uppercase text-sm p-[14px] outline-none focus:outline-none ease-linear transition-all duration-150"
          type="button"
          onClick={() => setShowModal(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="#fff"
            className="mr-1"
          >
            <path
              d="M4.66668 3.33333C4.66668 2.93777 4.54938 2.55109 4.32962 2.22219C4.10985 1.89329 3.7975 1.63695 3.43204 1.48557C3.06659 1.33419 2.66446 1.29459 2.27649 1.37176C1.88853 1.44893 1.53217 1.63941 1.25246 1.91912C0.972757 2.19882 0.782276 2.55519 0.705106 2.94315C0.627935 3.33111 0.667542 3.73324 0.818917 4.0987C0.970292 4.46415 1.22664 4.77651 1.55554 4.99627C1.88443 5.21603 2.27111 5.33333 2.66668 5.33333C3.19711 5.33333 3.70582 5.12262 4.08089 4.74754C4.45596 4.37247 4.66668 3.86376 4.66668 3.33333ZM14.6667 4H6.66668C6.48987 4 6.3203 3.92976 6.19527 3.80473C6.07025 3.67971 6.00001 3.51014 6.00001 3.33333C6.00001 3.15652 6.07025 2.98695 6.19527 2.86192C6.3203 2.7369 6.48987 2.66666 6.66668 2.66666H14.6667C14.8435 2.66666 15.0131 2.7369 15.1381 2.86192C15.2631 2.98695 15.3333 3.15652 15.3333 3.33333C15.3333 3.51014 15.2631 3.67971 15.1381 3.80473C15.0131 3.92976 14.8435 4 14.6667 4ZM10.6667 6C11.0793 6.00116 11.4815 6.12991 11.8181 6.36862C12.1546 6.60733 12.4091 6.9443 12.5467 7.33333H14.6667C14.8435 7.33333 15.0131 7.40357 15.1381 7.52859C15.2631 7.65361 15.3333 7.82318 15.3333 8C15.3333 8.17681 15.2631 8.34638 15.1381 8.4714C15.0131 8.59642 14.8435 8.66666 14.6667 8.66666H12.5467C12.4244 9.01258 12.2093 9.31819 11.9249 9.55004C11.6406 9.7819 11.2979 9.93107 10.9344 9.98122C10.571 10.0314 10.2007 9.98057 9.8642 9.83439C9.52768 9.6882 9.23786 9.45226 9.02645 9.15239C8.81504 8.85252 8.69019 8.50027 8.66557 8.13419C8.64095 7.76812 8.7175 7.40233 8.88685 7.07685C9.05621 6.75137 9.31183 6.47874 9.62574 6.28881C9.93966 6.09888 10.2998 5.99897 10.6667 6ZM1.33334 7.33333H6.66668C6.84349 7.33333 7.01306 7.40357 7.13808 7.52859C7.26311 7.65361 7.33334 7.82318 7.33334 8C7.33334 8.17681 7.26311 8.34638 7.13808 8.4714C7.01306 8.59642 6.84349 8.66666 6.66668 8.66666H1.33334C1.15653 8.66666 0.986962 8.59642 0.861938 8.4714C0.736914 8.34638 0.666677 8.17681 0.666677 8C0.666677 7.82318 0.736914 7.65361 0.861938 7.52859C0.986962 7.40357 1.15653 7.33333 1.33334 7.33333ZM9.33334 12H14.6667C14.8435 12 15.0131 12.0702 15.1381 12.1953C15.2631 12.3203 15.3333 12.4899 15.3333 12.6667C15.3333 12.8435 15.2631 13.013 15.1381 13.1381C15.0131 13.2631 14.8435 13.3333 14.6667 13.3333H9.33334C9.15653 13.3333 8.98696 13.2631 8.86194 13.1381C8.73691 13.013 8.66668 12.8435 8.66668 12.6667C8.66668 12.4899 8.73691 12.3203 8.86194 12.1953C8.98696 12.0702 9.15653 12 9.33334 12ZM1.33334 12H3.45334C3.61061 11.5552 3.92006 11.1803 4.327 10.9416C4.73394 10.7029 5.21217 10.6157 5.67717 10.6955C6.14216 10.7752 6.56398 11.0168 6.86808 11.3776C7.17217 11.7383 7.33896 12.1949 7.33896 12.6667C7.33896 13.1385 7.17217 13.5951 6.86808 13.9558C6.56398 14.3165 6.14216 14.5581 5.67717 14.6379C5.21217 14.7176 4.73394 14.6305 4.327 14.3917C3.92006 14.153 3.61061 13.7781 3.45334 13.3333H1.33334C1.15653 13.3333 0.986962 13.2631 0.861938 13.1381C0.736914 13.013 0.666677 12.8435 0.666677 12.6667C0.666677 12.4899 0.736914 12.3203 0.861938 12.1953C0.986962 12.0702 1.15653 12 1.33334 12Z"
              fill="white"
            />
          </svg>
          <p className="text-sm font-bold">Lọc</p>
        </button>
        {showModal ? (
          <FilterModal
            handleTabClick={handleTabClick}
            setShowModal={setShowModal}
            keyword={keyword}
            setKeyword={setKeyword}
            province={province}
            productCategory={productCategory}
            productBrand={productBrand}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            selectedProvince={selectedProvince}
            setSelectedProvince={setSelectedProvince}
            selectedProductCategory={selectedProductCategory}
            setSelectedProductCategory={setSelectedProductCategory}
            selectedProductBrand={selectedProductBrand}
            setSelectedProductBrand={setSelectedProductBrand}
            handleFilterClick={handleFilterClick}
            handleStartDateChange={handleStartDateChange}
            handleEndDateChange={handleEndDateChange}
            handleClearFilter={handleClearFilter}
          />
        ) : null}
      </div>

      <div className="flex flex-wrap">
        <div className="w-full mb-6">
          <Tabs handleTabClick={handleTabClick} orderStatusId={orderStatusId} />
          <div className="flex flex-col min-w-0 break-words bg-white w-full mb-2.5 shadow-lg rounded dark:bg-black ">
            <div>
              <div className="tab-content tab-space">
                <div>
                  <table className="table-auto w-full">
                    <thead className="rounded-t-lg box-shadow-table">
                      <tr>
                        <th className="text-center sm:text-lg sm:font-semibold font-light text-[12px] pl-2 py-3.5">
                          STT
                        </th>
                        <th
                          className="text-left sm:text-lg sm:font-semibold font-light text-[12px] py-3.5 cursor-pointer"
                          onClick={() => handleSort("buyTime")}
                        >
                          Ngày
                          {sortField === "buyTime" && (
                            <span>
                              {" "}
                              {sortDirection === "asc"
                                ? " ▲"
                                : sortDirection === "desc"
                                ? " ▼"
                                : "<FontAwesomeIcon icon={faSort}"}
                            </span>
                          )}
                        </th>
                        <th
                          className="text-left sm:text-lg sm:font-semibold font-light text-[12px] py-3.5 cursor-pointer"
                          onClick={() => handleSort("orderPrice")}
                        >
                          Số tiền
                          {sortField === "orderPrice" && (
                            <span>
                              {" "}
                              {sortDirection === "asc"
                                ? " ▲"
                                : sortDirection === "desc"
                                ? " ▼"
                                : "<FontAwesomeIcon icon={faSort} />"}
                            </span>
                          )}
                        </th>
                        <th className="sm:text-lg sm:font-semibold text-center font-light text-[12px] pr-5 py-3.5">
                          Biển số
                        </th>
                      </tr>
                    </thead>
                    {/* {currentPosts.map((product, i) => { */}
                    {orders.map((product, i) => {
                      return (
                        <tbody key={i} className={`${product.id}`}>
                          <tr className="box-shadow-table">
                            <td
                              className="text-center font-light text-[12px] sm:text-[16px]"
                              id={`tab-1-${1}`}
                            >
                              {i + 1}
                            </td>
                            <td className="text-left ">
                              <p className="text-left font-light text-[12px] text-[#1B2128] dark:text-white  sm:text-[16px]">
                                {formattedDate(product.buyTime)}
                              </p>
                              <p className="text-left font-light text-[12px] text-[#1B2128] dark:text-white  sm:text-[16px]">
                                {product.provinceName}
                              </p>
                            </td>
                            <td className="text-center ">
                              <p className="text-left font-light text-[12px] text-[#1B2128]  sm:text-[16px]">
                                {/* {formattedNumber(product.orderPrice)} */}
                                {formatVND(product.orderPrice)}
                              </p>
                              <p className="text-left font-light text-[12px] sm:text-[16px]">
                                <span className="text-[#ED0000]">(123)</span>
                                <span className="text-[#577CFF]">
                                  {product.productCategoryName}
                                </span>
                              </p>
                            </td>
                            <td className="text-center flex justify-center items-center py-1">
                              <Link
                                onClick={() => handleLinkClick(product.id)}
                                className="bg-[#577CFF;] rounded-md  px-1.5 py-2 text-white text-[12px] font-light sm:text-[18px] block w-[90px] sm:w-[110px]"
                              >
                                {product.productName}
                              </Link>
                              <button
                                onClick={() => {
                                  handleDeleteRow(i);
                                  handleReject;
                                }}
                                className={`bg-[#ED0000;] rounded-md px-1.5 py-2 text-white text-[12px] font-light sm:text-[18px] ml-1  ${
                                  ["Đã mua", "Đã hủy"].includes(
                                    product.orderStatusName
                                  )
                                    ? "hidden"
                                    : ""
                                }`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={8}
                                  height={8}
                                  viewBox="0 0 8 8"
                                  fill="#fff"
                                  stroke="#fff"
                                >
                                  <g clipPath="url(#clip0_278_2702)">
                                    <path
                                      d="M0.758362 7.9499C0.562224 7.9613 0.36933 7.8961 0.220356 7.76803C-0.0734519 7.47248 -0.0734519 6.99513 0.220356 6.69958L6.65377 0.266137C6.95936 -0.0198095 7.43887 -0.00391391 7.72482 0.301672C7.98339 0.578011 7.99847 1.00275 7.76011 1.29671L1.28878 7.76803C1.14173 7.89425 0.951929 7.95933 0.758362 7.9499Z"
                                      fill="white"
                                    />
                                    <path
                                      d="M7.18424 7.9499C6.98546 7.94905 6.79494 7.87015 6.6538 7.73015L0.220355 1.29669C-0.0518419 0.978823 -0.0148352 0.500456 0.303028 0.228234C0.586729 -0.0147173 1.00513 -0.0147173 1.28881 0.228234L7.76013 6.66168C8.06564 6.9477 8.08144 7.42724 7.79542 7.73275C7.78404 7.7449 7.77228 7.75666 7.76013 7.76803C7.60167 7.90583 7.39313 7.97168 7.18424 7.9499Z"
                                      fill="white"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_278_2702">
                                      <rect width={8} height={8} fill="white" />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button>
                              <button
                                onClick={() => {
                                  handleDeleteRow(i);
                                  handleConfirm;
                                }}
                                className={`bg-[#00A687;] rounded-md  px-1.5 py-2 text-white text-[12px] font-light  sm:text-[18px] ml-1 ${
                                  ["Đã duyệt", "Đã mua", "Đã hủy"].includes(
                                    product.orderStatusName
                                  )
                                    ? "hidden"
                                    : ""
                                }`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={8}
                                  height={8}
                                  viewBox="0 0 10 10"
                                  fill="none"
                                  stroke="#fff"
                                >
                                  <path
                                    d="M4.04459 7.96708C3.96667 8.04541 3.86042 8.08916 3.75001 8.08916C3.63959 8.08916 3.53334 8.04541 3.45543 7.96708L1.10292 5.61416C0.858758 5.36999 0.858758 4.97416 1.10292 4.73041L1.39751 4.43583C1.64167 4.19166 2.03709 4.19166 2.28126 4.43583L3.75001 5.90458L7.71876 1.93583C7.96292 1.69166 8.35876 1.69166 8.60251 1.93583L8.89709 2.23041C9.14126 2.47458 9.14126 2.87041 8.89709 3.11416L4.04459 7.96708Z"
                                    fill="white"
                                  />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      );
                    })}
                  </table>
                </div>
              </div>
            </div>
          </div>

          {productDetails && (
            <LicenseDetailsPage
              productDetails={productDetails}
              handleOrderPriceChange={handleOrderPriceChange}
              // formattedNumber={formattedNumber}
              formatVND={formatVND}
              updatedOrderPrice={updatedOrderPrice}
              formattedDate={formattedDate}
              handleNoteChange={handleNoteChange}
              updatedNote={updatedNote}
              handleReject={handleReject}
              setProductDetails={setProductDetails}
              handleConfirm={handleConfirm}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LicensePage;
