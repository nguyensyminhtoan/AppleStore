import { NavLink, useNavigate } from "react-router-dom";
import "./MainNavigation.css";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../store";
export default function MainNavigation()
{
  const isLogin = useSelector((state) => state.login.isLogin);
  const fullName = useSelector((state) => state.login.userName);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const handleClick = async () =>
  {
    if (isLogin)
    {


      await fetch('http://localhost:5000/user/logout',
        {
          method: 'GET',
          headers: { "Content-Type": "application/json" },
          credentials: 'include'
        })


      await dispatch(setLogout());
      localStorage.removeItem("userName");
      localStorage.setItem('isLogin', false)
      localStorage.removeItem('userId')
      navigate('/')
    }
  };
  return (
    <nav className="nav">
      <div>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
          end
        >
          Home
        </NavLink>
        <NavLink
          to="/shop"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Shop
        </NavLink>
      </div>
      <h1>BOUTIQUE</h1>
      <div className="cart-login">
        {isLogin && <div>
          <span className="fa-brands fa-jedi-order"></span>
          <NavLink
            to="/history"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            History
          </NavLink>
        </div>}
        {isLogin && <div>
          <span className="fa-solid fa-cart-shopping"></span>
          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Cart
          </NavLink>
        </div>}
        <div>
          <span className="fa-solid fa-user"></span>
          {fullName ? (
            <>
              <span>{fullName}</span>
              <span className="fa-solid fa-caret-down"></span>
            </>
          ) : (
            ""
          )}
          <NavLink
            to='/login'
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={handleClick}
          >
            {isLogin ? "Logout" : "Login"}
          </NavLink>
        </div>
      </div>
    </nav >
  );
}
