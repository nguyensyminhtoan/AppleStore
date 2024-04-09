
import "./CartList.css";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
export default function CartList({ setTotalPrice })
{

  const [cartData, setCartData] = useState([])
  const [message, setMessage] = useState('')
  const navigate = useNavigate();



  const getCart = async () =>
  {
    const sendRequest = await fetch('http://localhost:5000/shop/cart', {
      method: 'GET',
      credentials: 'include'
    })
    const data = await sendRequest.json()
    if (sendRequest.ok)
    {
      setTotalPrice(data.totalPrice)
      setCartData(data.cart)
      setMessage('')
    } else
    {
      setMessage(data.message)
    }
  }
  useEffect(() =>
  {
    getCart()

  }, [])

  const handleQuantityChange = async (productId, newQuantity) =>
  {

    const sendRequest = await fetch('http://localhost:5000/shop/update-cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId: productId, quantity: newQuantity }),
      credentials: 'include', // Đảm bảo gửi cookie khi gửi yêu cầu
    });
    const data = sendRequest.json()
    if (!sendRequest.ok)
    {
      setMessage(data.message)
    } else
    {
      getCart()
      setMessage(data.message)
    }

  };
  const handleBackToShopping = () =>
  {
    navigate("/shop");
  };
  const handleComeToCheckout = () =>
  {
    navigate("/checkout");
  };
  const handleDelete = async (productId) =>
  {
    const sendRequest = await fetch(`http://localhost:5000/shop/remove-item?productId=${productId}`, {
      method: "GET",
      credentials: 'include',
    })
    const data = await sendRequest.json()
    if (sendRequest.ok)
    {
      getCart()

    } else
    {
      setMessage(data.message)
    }
  };
  return (
    <div className="cartlist">
      <h2>SHOPPING CART</h2>
      <div>
        <div className="cart-item-information">
          <h4>IMAGE</h4>
          <h4>PRODUCT</h4>
          <h4>PRICE</h4>
          <h4>QUANTITY</h4>
          <h4>TOTAL</h4>
          <h4>REMOVE</h4>
        </div>
        {cartData.length > 0 ? cartData.map((data, index) =>
        {
          if (data.productId)
          {
            const vndPrice = `${Number(data.productId.price).toLocaleString(
              "vi-VN"
            )} VND`;
            const vndTotal = `${Number(data.productId.price * data.quantity).toLocaleString("vi-VN")} VND`;
            return (
              <div className="cart-items" key={index}>
                <img
                  src={data.productId.img1}
                  className="cart-item"
                  alt="product"
                ></img>
                <h4 className="cart-item">{data.productId.name}</h4>
                <p className="cart-item price">{vndPrice}</p>
                <p className="cart-item cart-item-quantity">
                  <i
                    className="fa-solid fa-caret-left"
                    onClick={() =>
                      handleQuantityChange(data.productId._id, data.quantity - 1)
                    }
                  ></i>{" "}
                  {data.quantity}
                  <i
                    className="fa-solid fa-caret-right"
                    onClick={() =>
                      handleQuantityChange(data.productId._id, data.quantity + 1)
                    }
                  ></i>
                </p>
                <p className="cart-item price">{vndTotal}</p>
                <button>
                  <i
                    className="far fa-trash-alt"
                    onClick={() =>
                    {
                      handleDelete(data.productId._id);
                    }}
                  ></i>
                </button>
              </div>
            );
          } else
          {
            return null
          }
        }) : <p>Not Found any cart</p>}
        <p style={{ color: "red", margin: "auto", width: "100px" }}>{message}</p>
        <div className="cart-navigation">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              cursor: "pointer",
            }}
            onClick={handleBackToShopping}
          >
            <i className="fa-solid fa-arrow-left"></i>
            <p>Continue shopping</p>
          </div>
          <div className="checkout" onClick={handleComeToCheckout}>
            <p>Proceed to checkout</p>
            <i className="fa-solid fa-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
