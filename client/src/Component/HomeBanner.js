import { useNavigate } from "react-router-dom";
import "./HomeBanner.css";
export default function HomeBanner() {
  const navigate = useNavigate();
  const hanleClick = () => {
    navigate("/shop");
  };
  return (
    <div className="banner">
      <div className="content-banner">
        <h4>NEW INSPIRATION 2020</h4>
        <p>20% OFF ON NEW SEASON</p>
        <button onClick={hanleClick}>Browse collection</button>
      </div>
    </div>
  );
}
