import { useSelector } from "react-redux";
import "./RelatedProduct.css";
import { useEffect, useState } from "react";
import Product from "./Product";
import { useParams } from "react-router-dom";
export default function RelatedProduct() {
  const data = useSelector((state) => state.login.data);
  const selectedProduct = useSelector((state) => state.login.selectedProduct);
  const { productId } = useParams();
  const [relatedProduct, setRelatedProduct] = useState([]);
  useEffect(() => {
    const category = selectedProduct.category;
    const filteredProducts = data.filter(
      (product) =>
        product.category === category && product["_id"].$oid !== productId
    );
    setRelatedProduct(filteredProducts);
  }, [data, productId, selectedProduct]);
  return (
    <div className="related">
      <p style={{ fontWeight: "bold", fontStyle: "italic" }}>
        RELATED PRODUCTS
      </p>
      <ul className="products" style={{ paddingLeft: "0px" }}>
        {relatedProduct.map((product, index) => {
          return (
            <li key={index} className="product" style={{ marginLeft: "0px" }}>
              <Product data={product}></Product>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
