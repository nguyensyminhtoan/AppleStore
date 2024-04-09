import './ChatPage.css'
import img from '../images/user.png'
import { useState, useEffect, useRef } from 'react'
import { io } from "socket.io-client"




export default function ChatPage({ isLogin })
{
  const [messages, setMessages] = useState([])
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const [msg, setMsg] = useState('')
  const [userIds, setUserIds] = useState([])
  const [userId, setUserId] = useState('')
  const [error, setError] = useState('')
  const socket = useRef()

  useEffect(() =>
  {
    const fetchAllUsers = async () =>
    {
      const sendRequest = await fetch('http://localhost:5000/admin/users', {
        method: "GET",
        credentials: "include"
      })
      const data = await sendRequest.json()
      if (sendRequest.ok)
      {

        setUserIds(data)
      } else
      {
        setError(data.message)
      }
    }
    fetchAllUsers()
  }, [])

  useEffect(() =>
  {
    if (arrivalMessage)
    {

      setMessages(prevMessages => [...prevMessages, arrivalMessage]);
    }
  }, [arrivalMessage]);
  const handleChangeUser = (userId) =>
  {
    setUserId(userId)
    const fetchData = async () =>
    {
      try
      {
        if (isLogin)
        {

          const sendRequest = await fetch('http://localhost:5000/get-message?userId=' + userId, {
            method: "GET",
            credentials: 'include'
          });
          const data = await sendRequest.json();
          const responseMessage = data.map((msg) =>
          {
            if (msg.fromself)
            {
              return {
                ...msg,
                fromself: false
              }
            } else
            {
              return {
                ...msg,
                fromself: true
              }
            }
          })

          setMessages(responseMessage);


          socket.current = io('http://localhost:5000');
          socket.current.emit('add-user', 'admin');
          socket.current.on("msg-recieve", (data) =>
          {

            if (data.from === userId)
            { // Chỉ xử lý tin nhắn từ người dùng đang chat cùng
              setArrivalMessage({ fromself: false, message: data.message });
            }
          });

        }
      } catch (error)
      {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }

  const handleSendMessage = async () =>
  {

    socket.current.emit("send-msg", {
      to: userId,
      from: 'admin',
      message: msg
    })
    const sendRequest = await fetch('http://localhost:5000/add-message', {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: msg,
        from: 'admin',
        to: userId
      })
    })
    const data = sendRequest.json()
    if (sendRequest.ok)
    {
      const msgs = [...messages]
      msgs.push({ fromself: true, message: msg })
      setMessages(msgs)
    } else
    {
      setError(data.message)
    }
    setMsg('')
  }


  const scrollRef = useRef()
  useEffect(() =>
  {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])
  return <div className='container-chat'>
    <h2>Chat</h2>
    <p>Apps / Chat</p>
    <p style={{ color: 'red' }}>{error}</p>
    <div className='chat-page'>
      <div className='contact'>
        <div className='search'>
          <input type='text' placeholder='Search Contact' />
        </div>
        {userIds && userIds.map((id) =>
        {
          return <div key={id} className='userId' onClick={() => handleChangeUser(id)}>
            <img src={img} alt={id} />
            <p>{id}</p>
          </div>
        })}

      </div>
      <div className='chatbox' ref={scrollRef}>
        <div className='chat-content'>
          {messages.length > 0 && messages.map((message, index) =>
          {
            return <div ref={scrollRef} key={index}>
              <div className={`message ${message.fromself ? "sended" : "recieved"
                }`}>
                {!message.fromself && <img src={img} alt={index} />}
                <div className="content">
                  <p>{message.fromself ? "You: " : "Client: "}{message.message}</p>
                </div>
              </div>
            </div>
          })}
        </div>
        <div className='input-chat'>
          <input
            type='text'
            placeholder='Type end enter'
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            onKeyDown={(e) =>
            {
              if (e.key === 'Enter') handleSendMessage()
            }} />
          <i className="fa-solid fa-paper-plane" onClick={handleSendMessage}></i>
        </div>
      </div>
    </div>
  </div>
}