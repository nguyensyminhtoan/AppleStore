import { NavLink, useNavigate } from "react-router-dom";

import "./Header.css";

export default function Header({ setIsLogin, setUserName, isLogin, userName })
{

  const navigate = useNavigate()
  const handleClick = async () =>
  {
    if (isLogin)
    {

      await fetch('https://backendasm3.onrender.com/user/logout',
        {
          method: 'GET',
          headers: { "Content-Type": "application/json" },
          credentials: 'include'
        })


      setIsLogin(false)
      setUserName('')
      localStorage.removeItem("userName");
      localStorage.removeItem('isLogin')
      localStorage.removeItem('userId')
      navigate('/')
    }
  }
  return (
    <nav className="nav">

      <h1>ADMIN</h1>
      <div className="login">

        <div>
          <span className="fa-solid fa-user"></span>
          {userName ? (
            <>
              <span>{userName}</span>
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
            {!isLogin ? "Login" : "Logout"}
          </NavLink>
        </div>
      </div>
    </nav >
  );
}
