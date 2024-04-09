import "./OtherInformation.css";
export default function OtherInformation() {
  return (
    <div className="other-information">
      <div className="service">
        <div className="text">
          <h3>FREE SHIPPING</h3>
          <p>Free shipping worlwide</p>
        </div>
        <div className="text">
          <h3>24 X 7 SERVICE</h3>
          <p>Free shipping worlwide</p>
        </div>
        <div className="text">
          <h3>FESTIVAL OFFER</h3>
          <p>Free shipping worlwide</p>
        </div>
      </div>
      <div className="friends">
        <div className="text">
          <h3>LET'S BE FRIENDS</h3>
          <p>Nisi nisi tempor consequat laboris nisi</p>
        </div>
        <form>
          <input type="email" placeholder="Enter your email address"></input>
          <button>Subscribe</button>
        </form>
      </div>
    </div>
  );
}
