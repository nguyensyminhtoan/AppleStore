import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./LoginPage.css";
import { setLogin as setLoginStore } from "../store";
import { useSelector, useDispatch } from "react-redux";
export default function LoginPage()
{
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [login, setLogin] = useState(false);
  const isLogin = useSelector((state) => state.login.isLogin);
  const [responseData, setResponseData] = useState([])
  const dispatch = useDispatch();
  useEffect(() =>
  {
    const searchParams = new URLSearchParams(location.search);
    const action = searchParams.get("action");

    // Kiểm tra giá trị truy vấn và thay đổi giao diện nếu cần
    if (action === "signin")
    {
      setLogin(true);
      // (Bạn có thể sử dụng các biến state để điều chỉnh giao diện)
    } else if (action === "signup")
    {
      setLogin(false);
    } else
    {
      // Nếu không có truy vấn, mặc định là signup
      navigate("/login?action=signup");
    }
  }, [location.search, navigate]);
  const handleButtonClick = () =>
  {
    const searchParams = new URLSearchParams(location.search);

    // Đảo ngược giá trị truy vấn và chuyển hướng
    if (searchParams.get("action") === "signin")
    {
      navigate("/login?action=signup");
      setLogin(false);
    } else
    {
      navigate("/login?action=signin");
      setLogin(true);
    }
  };
  const handleSignIn = (e) =>
  {
    e.preventDefault();
    // Kiểm tra điều kiện đăng nhập
    if (!email || !password)
    {
      setError("Please enter both email and password");
    } else
    {
      const fetchLogin = async () =>
      {
        const sendRequest = await fetch('http://localhost:5000/user/signin', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({

            email: email,
            password: password
          }),
          credentials: 'include'
        })
        const data = await sendRequest.json()
        setResponseData(data)

        if (!sendRequest.ok)
        {
          setError(responseData.message)
          setPassword("");
        } else
        {
          // Đăng nhập thành công
          setError("");
          setFullName(data.userName);
          setPhone(data.phone);
          localStorage.setItem('isLogin', true)
          localStorage.setItem('userName', data.userName)
          localStorage.setItem('userId', data.userId)
          dispatch(setLoginStore(data.userName));
          navigate("/");
        }

      }
      fetchLogin()
    }
  };
  const handleSignUp = (e) =>
  {
    e.preventDefault();
    // Kiểm tra điều kiện đăng ký
    if (!fullName || !email || !password || !phone)
    {
      setError("Please fill in all fields");
    } else if (password.length < 8)
    {
      setError("Password must be at least 8 characters");
    } else
    {
      // Kiểm tra xem email đã tồn tại chưa
      const fetchSignup = async () =>
      {
        const sendRequest = await fetch('http://localhost:5000/user/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userName: fullName,
            email: email,
            password: password,
            phone: phone
          }),

        })
        const data = await sendRequest.json()
        setResponseData(data)
        if (!sendRequest.ok)
        {
          setError(responseData.message)
          setPassword("");
        } else
        {
          setError(responseData.message)
          // Đăng ký thành công
          navigate("/login?action=signin");
        }

      }
      fetchSignup()

    }
  };

  return !isLogin ? (
    <div className="loginpage">
      <div className="cardlogin">
        <h1>{login ? "Sign In" : "Sign Up"}</h1>

        <form className="form" onSubmit={login ? handleSignIn : handleSignUp}>
          {!login ? (
            <input
              type="text"
              placeholder="Full Name"
              name="fullname"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            ></input>
          ) : (
            ""
          )}
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          {!login ? (
            <input
              type="tel"
              placeholder="Phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            ></input>
          ) : (
            ""
          )}
          <button type="submit">{login ? "SIGN IN" : "SIGN UP"}</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <p>
          {login ? "Create an account?" : "Login?"}
          <button onClick={handleButtonClick}>Click</button>
        </p>
      </div>
    </div>
  ) : (
    <h1 className="loginpage">Successful login!</h1>
  );
}
