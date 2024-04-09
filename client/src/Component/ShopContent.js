import { useState } from "react";
import NavBarShop from "./NavBarShop";
import ProductList from "./ProductList";
import "./ShopContent.css";
export default function ShopContent() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const handleCategoryChange = (category) => {
    // Cập nhật state khi giá trị category thay đổi
    setSelectedCategory(category);
  };
  return (
    <div className="shopcontent">
      <NavBarShop onCategoryChange={handleCategoryChange}></NavBarShop>
      <ProductList selectedCategory={selectedCategory}></ProductList>
    </div>
  );
}
