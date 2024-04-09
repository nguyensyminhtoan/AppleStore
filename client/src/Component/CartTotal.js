
import "./CartTotal.css";
export default function CartTotal({ totalPrice })
{


  const vndTotal = `${Number(totalPrice).toLocaleString("vi-VN")} VND`;
  return (
    <div className="cart-total">
      <div className="cart-total-items">
        <div className="cart-total-item">
          <h2>CART TOTAL</h2>
          <div className="total">
            <h4>SUBTOTAL</h4>
            <p className="price">{vndTotal}</p>
          </div>
          <div className="total">
            <h4>TOTAL</h4>
            <p style={{ fontSize: "24px" }}>{vndTotal}</p>
          </div>
        </div>
        <form>
          <input type="text" placeholder="Enter your coupon"></input>
          <button>
            <i className="fa-solid fa-gift"></i> Apply coupon
          </button>
        </form>
      </div>
    </div>
  );
}
