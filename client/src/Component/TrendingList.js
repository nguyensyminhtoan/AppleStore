import { useEffect, useState } from "react";
import Product from "./Product";
import "./TrendingList.css";
import PopupDetail from "./PopupDetail";
import { useDispatch, useSelector } from "react-redux";
import { showPopup, setDataStore } from "../store";
export default function TrendingList()
{
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const isPopupOpen = useSelector((state) => state.login.isPopupOpen);
  const selectedProduct = useSelector((state) => state.login.selectedProduct);
  const api_key =
    "http://localhost:5000/shop/products";
  const request = async () =>
  {
    try
    {
      const response = await fetch(api_key);
      const dataRES = await response.json();
      const data = await dataRES.slice(0, 8);

      setData(data);
    } catch (error)
    {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() =>
  {
    request();
  }, []);
  // hiện popup
  const productHandler = (product) =>
  {

    dispatch(showPopup(product));
    dispatch(setDataStore(data));
  };
  return (
    <div className="productlist">
      <div className="title-product">
        <p>MADE THE HARD WAY</p>
        <h1>TOP TRENDING PRODUCTS</h1>
      </div>
      <div>
        <ul className="products">
          {data.map((data, index) =>
          {
            return (
              <li
                key={index}
                className="product"
                onClick={() => productHandler(data)}
              >
                <Product data={data}></Product>
              </li>
            );
          })}
        </ul>
      </div>
      {isPopupOpen ? <PopupDetail data={selectedProduct}></PopupDetail> : ""}
    </div>
  );
}
