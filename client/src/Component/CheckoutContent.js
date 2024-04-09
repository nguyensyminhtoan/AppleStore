
import { useEffect, useState } from "react";
import "./CheckoutContent.css";
import { useNavigate } from "react-router-dom";
export default function CheckoutContent()
{
  const [cartData, setCartData] = useState([])
  const [message, setMessage] = useState('')
  const [totalPrice, setTotalPrice] = useState(0)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const navigate = useNavigate()
  const fetchCart = async () =>
  {
    const sendRequest = await fetch('http://localhost:5000/shop/cart', {
      method: 'GET',
      credentials: 'include'
    })
    const data = await sendRequest.json()
    if (!sendRequest.ok)
    {
      setMessage(data.message)
    } else
    {
      setCartData(data.cart)
      setTotalPrice(data.totalPrice)
    }
  }

  useEffect(() =>
  {
    fetchCart()
  }, [])
  const cartTotalVnd = `${Number(totalPrice).toLocaleString("vi-VN")} VND`;
  const handleFullName = (e) =>
  {
    setFullName(e.target.value)
  }
  const handleEmail = (e) =>
  {
    setEmail(e.target.value)
  }
  const handlePhoneNumber = (e) =>
  {
    setPhoneNumber(e.target.value)
  }
  const handleAddress = (e) =>
  {
    setAddress(e.target.value)
  }

  const fetchOrder = async () =>
  { // Kiểm tra số lượng đặt hàng so với số lượng hàng trong kho
    const invalidProducts = cartData.filter(product => product.quantity > product.productId.quantityInStock);
    if (invalidProducts.length > 0)
    {
      // Nếu có sản phẩm có số lượng đặt hàng lớn hơn số lượng hàng trong kho, hiển thị thông báo lỗi
      setMessage(`Số lượng đặt hàng cho một số sản phẩm vượt quá số lượng hàng trong kho! Hãy quay trở lại cart và kiểm tra lại`);
      return;
    }
    const products = []
    cartData.forEach((product) =>
    {
      products.push({
        product: product.productId,
        quantity: product.quantity,
      })
    })
    const buyerInformation = {
      fullName: fullName,
      email: email,
      phoneNumber: phoneNumber,
      address: address
    }
    const body = {
      products: products,
      buyerInformation: buyerInformation,
      totalPrice: totalPrice
    }
    const sendRequest = await fetch('http://localhost:5000/order',
      {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify(body)
      })
    const data = await sendRequest.json()
    if (sendRequest.ok)
    {
      const confirmed = window.confirm('Your order has been successfully!')
      if (confirmed)
      {
        navigate('/shop')
      } else
      {
        fetchCart()
      }
    } else
    {
      setMessage(data.message)
    }
  }
  const handleSubmit = (e) =>
  {
    e.preventDefault()
    if (!fullName || !email || !phoneNumber.length || !address)
    {
      setMessage('please fill in all fields!')
    } else
    {
      const confirmed = window.confirm('Are you sure yout want to order')
      if (confirmed)
      {
        fetchOrder()
      }
    }

  }
  return (
    <div className="checkout-content">
      <form onSubmit={handleSubmit}>
        <h2>BILLING DETAILS</h2>
        <label>FULL NAME:</label>
        <input type="text" placeholder="Enter Your Full Name Here!" onChange={handleFullName} value={fullName}></input>
        <label>EMAIL:</label>
        <input type="email" placeholder="Enter Your Email Here!" onChange={handleEmail} value={email}></input>{" "}
        <label>PHONE NUMBER:</label>
        <input
          type="Number"
          placeholder="Enter Your Phone Number Here!"
          onChange={handlePhoneNumber}
          value={phoneNumber}></input>{" "}
        <label>ADDRESS:</label>
        <input type="text" placeholder="Enter Your Address Here!" onChange={handleAddress} value={address}></input>
        <button type="submit">Place order</button>
        <p style={{ color: "red" }}>{message}</p>
      </form>
      <div style={{ width: "30%", marginTop: "5%" }}>
        <div className="your-order">
          <h2>YOUR ORDER</h2>
          {cartData && cartData.map((item, index) =>
          {
            const vndPrice = `${Number(item.productId.price).toLocaleString(
              "vi-VN"
            )} VND`;
            return (
              <div className="product-order" key={index}>
                <h4 style={{ width: "50%" }}>{item.productId.name}</h4>
                <p className="price">{vndPrice} x{item.quantity}</p>
              </div>
            );
          })}

          <div className="total-order">
            <h4>TOTAL</h4>
            <p style={{ fontSize: "18px" }}>{cartTotalVnd}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
