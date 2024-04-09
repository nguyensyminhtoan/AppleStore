import { useRef, useState } from "react";
import "./DetailProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../store";

export default function DetailProduct()
{
  const [message, setMessage] = useState('')

  const count = useRef();
  const selectedProduct = useSelector((state) => state.login.selectedProduct);

  const dispatch = useDispatch();
  const vndPrice = `${Number(selectedProduct.price).toLocaleString(
    "vi-VN"
  )} VND`;
  const handleDecrement = () =>
  {
    // Lấy giá trị hiện tại từ count
    let currentValue = Number(count.current.textContent);

    // Đảm bảo giá trị không thấp hơn 1
    if (currentValue > 1)
    {
      count.current.textContent = currentValue - 1;
    }
  };
  const handleIncrement = () =>
  {
    count.current.textContent = Number(count.current.textContent) + 1;
  };
  const handleAddCart = () =>
  {

    if (!selectedProduct.quantityInStock || Number(selectedProduct.quantityInStock) === 0 || selectedProduct.quantityInStock < Number(count.current.textContent))
    {
      return setMessage('Sorry, this product is out of stock!')
    }

    const addToCart = async () =>
    {
      const sendRequest = await fetch('http://localhost:5000/shop/add-to-cart', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({
          productId: selectedProduct._id,
          quantity: count.current.textContent
        })
      })
      const responseData = await sendRequest.json()
      if (sendRequest.ok)
      {
        dispatch(addProductToCart(selectedProduct, count.current.textContent));
      }
      setMessage(responseData.message)

    }
    addToCart()
  };
  return (
    <div>
      <div className="detail-product">
        <div className="detail-images">
          <div className="images">
            <img src={selectedProduct.img1} alt="img1"></img>
            <img src={selectedProduct.img2} alt="img2"></img>
            <img src={selectedProduct.img3} alt="img3"></img>
            <img src={selectedProduct.img4} alt="img4"></img>
          </div>
          <img className="image" src={selectedProduct.img1} alt="img1"></img>
        </div>
        <div className="product-information">
          <h1>{selectedProduct.name}</h1>
          <p className="price">{vndPrice}</p>
          <p className="desc">{selectedProduct["short_desc"]}</p>
          <p className="category-information">
            AVAILABLE: <span>{selectedProduct.quantityInStock || 0}</span>
          </p>
          <p className="category-information">
            CATEGORY: <span>{selectedProduct.category}</span>
          </p>

          <div className="addtocart">
            <div className="quantity">
              <p>QUANTITY</p>
              <div className="count">
                <i
                  className="fa-solid fa-backward-step"
                  onClick={handleDecrement}
                ></i>
                <span
                  ref={count}
                  style={{ fontWeight: "bold", fontStyle: "normal" }}
                >
                  1
                </span>
                <i
                  className="fa-solid fa-forward-step"
                  onClick={handleIncrement}
                ></i>
              </div>
            </div>
            <button className="button" onClick={handleAddCart}>
              Add to cart
            </button>
          </div>
          <p style={{ color: "red" }}>{message}</p>
        </div>
      </div>
      <div>
        <p className="description">DESCRIPTION</p>
        <p className="productdescription">PRODUCT DESCRIPTION</p>
        <p className="desc longdesc">{selectedProduct["long_desc"]}</p>
      </div>
    </div>
  );
}
