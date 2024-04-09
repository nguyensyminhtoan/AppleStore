import { useState } from 'react'
import './LoginPage.css'
import { useNavigate } from 'react-router-dom'



const LoginPage = ({ setIsLogin, setUserName, isLogin }) =>
{
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState("");
  const navigate = useNavigate()
  const handleSubmit = async (e) =>
  {
    e.preventDefault()
    if (email && password)
    {
      const sendRequest = await fetch('https://backendasm3.onrender.com/user/signin-admin', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({

          email: email,
          password: password
        }),
        credentials: 'include'
      })
      const data = await sendRequest.json()

      if (!sendRequest.ok)
      {// Đăng nhập không thành công
        setError(data.message)
        setPassword("");
      } else
      {
        // Đăng nhập thành công
        localStorage.setItem('userName', data.userName)
        localStorage.setItem('userId', data.userId)
        localStorage.setItem('isLogin', true)
        setUserName(data.userName)
        setIsLogin(true)
        navigate('/')
      }
    }
  }
  return !isLogin ? <div className='loginPage'>
    <div className="cardlogin">
      <h1>Sign in</h1>
      <form className="form" onSubmit={handleSubmit} >
        <input type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">SIGN IN</button>
      </form>
      <p style={{ color: 'red' }}>{error}</p>
    </div>
  </div> : <h1>Login Successfully!</h1>
}

export default LoginPage