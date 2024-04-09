import "./Product.css";

export default function Product({ data }) {
  const vndPrice = `${Number(data.price).toLocaleString("vi-VN")} VND`;

  return (
    <div className="product-item">
      <img src={data.img1} alt={data.name}></img>
      <p className="product-name">{data.name}</p>
      <p className="product-price">{vndPrice}</p>
    </div>
  );
}
