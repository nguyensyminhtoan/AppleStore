import { useDispatch } from "react-redux";
import "./PopupDetail.css";
import { hidePopup } from "../store";
import { useNavigate } from "react-router-dom";
export default function PopupDetail({ data })
{
  const vndPrice = `${Number(data.price).toLocaleString("vi-VN")} VND`;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const producId = data["_id"];

  // đóng popup
  const handleClose = () =>
  {
    dispatch(hidePopup());
  };
  const handleDetail = () =>
  {
    dispatch(hidePopup())
    navigate(`/detail/${producId}`);
  };
  return (
    <div>
      <div className="overlay" onClick={handleClose}></div>
      <div className="popup">
        <div className="divimg">
          <img src={data.img1} alt={data.name}></img>
        </div>
        <div className="detail">
          <h3>{data.name}</h3>
          <p className="price">{vndPrice}</p>
          <p className="desc">{data["short_desc"]}</p>
          <button onClick={handleDetail}>
            <span className="fa-solid fa-cart-shopping"></span>
            View Detail
          </button>
        </div>
        <button className="close" onClick={handleClose}>
          <i className="fa-duotone fa-x"></i>
        </button>
      </div>
    </div>
  );
}
