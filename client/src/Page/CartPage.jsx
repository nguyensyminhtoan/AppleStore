import { useState } from "react";
import CartBanner from "../Component/CartBanner";
import CartList from "../Component/CartList";
import CartTotal from "../Component/CartTotal";

export default function CartPage()
{
  const [totalPrice, setTotalPrice] = useState(0)
  return (
    <div>
      <CartBanner></CartBanner>
      <div style={{ display: "flex" }}>
        <CartList setTotalPrice={setTotalPrice}></CartList>
        <CartTotal totalPrice={totalPrice}></CartTotal>
      </div>
    </div>
  );
}
