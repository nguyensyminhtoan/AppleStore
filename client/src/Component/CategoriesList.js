import "./CategoriesList.css";
import img1 from "../image/product_1.png";
import img2 from "../image/product_2.png";
import img3 from "../image/product_3.png";
import img4 from "../image/product_4.png";
import img5 from "../image/product_5.png";
import { useNavigate } from "react-router-dom";

export default function CategoriesList() {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate("/shop");
  };
  return (
    <div className="categories">
      <div className="title-categories">
        <h4>CAREFULLY CREATED COLECTIONS</h4>
        <h2>BROWSE OUR CATEGORIES</h2>
      </div>
      <div className="list1">
        <img src={img1} alt="produc-1" onClick={clickHandler}></img>
        <img src={img2} alt="produc-2" onClick={clickHandler}></img>
      </div>
      <div className="list2">
        <img src={img3} alt="produc-3" onClick={clickHandler}></img>
        <img src={img4} alt="produc-4" onClick={clickHandler}></img>
        <img src={img5} alt="produc-5" onClick={clickHandler}></img>
      </div>
    </div>
  );
}
