import "./NavBarShop.css";
export default function NavBarShop({ onCategoryChange }) {
  // Hàm xử lý sự kiện khi nhấp vào một button
  const handleButtonClick = (event) => {
    const newCategory = event.target.innerText;

    //truyền truyền giá trị category lên ShopContent
    onCategoryChange(newCategory);
  };

  return (
    <div className="navbarshop">
      <h1>CATEGORIES</h1>
      <ul>
        <li>APPLE</li>
        <li>
          <button onClick={handleButtonClick}>All</button>
        </li>
        <li className="category">IPHONE & MAC</li>
        <li>
          <button onClick={handleButtonClick}>Iphone</button>
        </li>
        <li>
          <button onClick={handleButtonClick}>ipad</button>
        </li>
        <li>
          <button onClick={handleButtonClick}>Macbook</button>
        </li>
        <li className="category">WIRELESS</li>
        <li>
          <button onClick={handleButtonClick}>Airpod</button>
        </li>
        <li>
          <button onClick={handleButtonClick}>Watch</button>
        </li>
        <li className="category">OTHER</li>
        <li>
          <button onClick={handleButtonClick}>Mouse</button>
        </li>
        <li>
          <button onClick={handleButtonClick}>Keyboard</button>
        </li>
        <li>
          <button onClick={handleButtonClick}>Other</button>
        </li>
      </ul>
    </div>
  );
}
