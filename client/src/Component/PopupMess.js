import "./PopupMess.css";
import img from "../image/user.png";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client"
import { useSelector } from "react-redux";

export default function PopupMess()
{
  const [isMessOpen, setIsMessOpen] = useState(false);
  const [messages, setMessages] = useState([])
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const [msg, setMsg] = useState('')
  const [userId, setUserId] = useState(localStorage.getItem('userId') || '')
  const scrollRef = useRef()
  const socket = useRef()
  const isLogin = useSelector((state) => state.login.isLogin)
  const handleMessBox = () =>
  {
    setIsMessOpen(!isMessOpen);
  }

  useEffect(() =>
  {
    const fetchData = async () =>
    {
      try
      {
        if (isLogin)
        {
          setUserId(localStorage.getItem('userId'));
          const sendRequest = await fetch('https://backendasm3.onrender.com/get-message?userId=' + userId, {
            method: "GET",
            credentials: 'include'
          });
          const data = await sendRequest.json();
          setMessages(data);


          socket.current = io('https://backendasm3.onrender.com/');
          socket.current.emit('add-user', userId);
          socket.current.on("msg-recieve", (msg) =>
          {
            setArrivalMessage({ fromself: false, message: msg.message });
          });
        }
      } catch (error)
      {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

  }, [isLogin]);



  useEffect(() =>
  {

    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage])
  useEffect(() =>
  {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])
  const handleSendMessage = async () =>
  {
    if (msg === '/end')
    {
      return setIsMessOpen(false)
    }

    socket.current.emit("send-msg", {
      to: 'admin',
      from: userId,
      message: msg
    })
    const sendRequest = await fetch('https://backendasm3.onrender.com/add-message', {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: msg,
        from: userId,
        to: 'admin'
      })
    })
    const data = sendRequest.json()
    if (sendRequest.ok)
    {
      const msgs = [...messages]
      msgs.push({ fromself: true, message: msg })
      setMessages(msgs)
    }
    setMsg('')
  }

  return (
    <div className="messenger-container">
      <div className="messenger" onClick={handleMessBox}>
        <i className="fa-brands fa-facebook-messenger"></i>
      </div>
      {isMessOpen ? (
        <div className="messenger-box">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#f8f9fa",
              borderRadius: "10px 10px 0 0",
              padding: "0 20px",
            }}
          >
            <h4>Customer Support</h4>
            <p>Let's Chat App</p>
          </div>
          <div className="chat-mess" ref={scrollRef}>
            {messages.length > 0 && messages.map((message, index) =>
            {
              return <div ref={scrollRef} key={index}>
                <div className={`message ${message.fromself ? "sended" : "recieved"
                  }`}>
                  <div className="content">
                    <p>{message.fromself ? "You: " : "Cộng tác viên: "}{message.message}</p>
                  </div>
                </div>
              </div>
            })}

          </div>
          <div className="mess-action">
            <img src={img} alt="user"></img>
            <input type="text" placeholder="Enter Message!" value={msg} onChange={(e) => { setMsg(e.target.value) }}
              onKeyDown={(e) =>
              {
                if (e.key === 'Enter') handleSendMessage()
              }}></input>
            <i className="fa-solid fa-paperclip"></i>
            <i className="fa-solid fa-face-smile"></i>
            <i
              className="fa-solid fa-paper-plane"
              style={{ color: "#13f0e5", cursor: "pointer" }}
              onClick={handleSendMessage}

            ></i>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
