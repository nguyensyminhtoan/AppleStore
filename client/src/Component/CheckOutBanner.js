export default function CheckOutBanner() {
  return (
    <div className="shopbanner">
      <p className="bigp">CHECKOUT</p>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ fontWeight: "bold", fontStyle: "italic" }}>
          HOME/CART/
        </span>
        <p className="smallp" style={{ paddingLeft: "0" }}>
          CHECKOUT
        </p>
      </div>
    </div>
  );
}
