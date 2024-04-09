import Product from "./Product";
import "./ProductList.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PopupDetail from "./PopupDetail";
import { showPopup } from "../store";
import { setDataStore } from "../store";
export default function ProductList({ selectedCategory })
{
  const isPopupOpen = useSelector((state) => state.login.isPopupOpen);
  const dispatch = useDispatch();
  const selectedProduct = useSelector((state) => state.login.selectedProduct);
  const [data, setData] = useState([]);
  const [dataFiltered, setDataFiltered] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const options = ["Default sorting", "High to low price", "Low to high price"];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentProducts, setCurrentProducts] = useState([]);
  // Tính toán số lượng trang
  const productsPerPage = 9;
  const totalPages = Math.ceil(dataFiltered.length / productsPerPage);
  const handleSelectChange = (event) =>
  {
    setSelectedOption(event.target.value);
  };
  const handleSearchChange = (event) =>
  {
    setSearchKeyword(event.target.value);
  };
  const productHandler = (product) =>
  {
    dispatch(showPopup(product));
    dispatch(setDataStore(data));
  };
  const api_key =
    "http://localhost:5000/shop/products";
  const request = async () =>
  {
    try
    {
      const response = await fetch(api_key);
      const dataRES = await response.json();

      setData(dataRES);
    } catch (error)
    {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() =>
  {
    request();
  }, []);
  useEffect(() =>
  {
    let filteredData = [...data];
    // lọc dữ liệu theo selectedCategory
    if (selectedCategory !== "All")
    {
      filteredData = filteredData.filter((item) =>
      {
        return item.category === selectedCategory.toLowerCase();
      });
    } else if (selectedCategory === "All")
    {
      filteredData = [...data];
    }

    // lọc dữ liệu theo từ khóa tìm kiếm
    if (searchKeyword.trim() !== "")
    {
      filteredData = filteredData.filter((item) =>
        item.name.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }
    // sắp xếp theo giá tiền
    if (selectedOption === "High to low price")
    {
      filteredData.sort((a, b) => b.price - a.price);
    } else if (selectedOption === "Low to high price")
    {
      filteredData.sort((a, b) => a.price - b.price);
    }
    setDataFiltered(filteredData); // Cập nhật state dataFiltered với mảng đã được lọc
  }, [selectedCategory, selectedOption, data, searchKeyword]);
  useEffect(() =>
  {
    // lấy danh sách sản phẩm cho trang hiện tại
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    setCurrentProducts(
      dataFiltered.slice(indexOfFirstProduct, indexOfLastProduct)
    );
    if (currentPage > totalPages)
    {
      setCurrentPage(1);
    }
  }, [currentPage, dataFiltered, productsPerPage, totalPages]);
  return (
    <div className="productsorts">
      <div className="sort">
        <input
          type="text"
          placeholder="Enter Search Here!"
          onChange={handleSearchChange}
        ></input>
        <select
          id="dropdown"
          value={selectedOption}
          onChange={handleSelectChange}
        >
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="product-content">
        <ul className="products">
          {currentProducts.map((data, index) =>
          {
            return (
              <li
                key={index}
                className={`product fadeIn`}
                onClick={() => productHandler(data)}
              >
                <Product data={data}></Product>
              </li>
            );
          })}
        </ul>
        {currentProducts.length > 0 ? (
          <div className="pagination">
            <div className="pagination-buttons">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <i className="fa-solid fa-backward"></i>
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <i className="fa-solid fa-forward"></i>
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      {isPopupOpen ? <PopupDetail data={selectedProduct}></PopupDetail> : ""}
    </div>
  );
}
