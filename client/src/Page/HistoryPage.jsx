import { useEffect, useState } from "react"
import HistoryBanner from "../Component/HistoryBanner"
import HistoryContent from "../Component/HistoryContent"
import DetailOrder from "../Component/DetailOrder"


const HistoryPage = () =>
{
  const [selectedOrder, setSelectedOrder] = useState('')
  const [orders, setOrders] = useState([])
  const [message, setMessage] = useState('')
  const fetchOrders = async () =>
  {
    const sendRequest = await fetch('https://backendasm3.onrender.com/history',
      {
        method: "GET",
        credentials: "include"
      })
    const data = await sendRequest.json()
    if (sendRequest.ok)
    {
      setMessage('')
      setOrders(data)
    } else
    {
      setMessage(data.message)
    }
  }
  useEffect(() =>
  {
    fetchOrders()
  }, [])
  return <div>
    <HistoryBanner></HistoryBanner>
    <HistoryContent orders={orders} message={message} setSelectedOrder={setSelectedOrder}></HistoryContent>
    <DetailOrder selectedOrder={selectedOrder} orders={orders}></DetailOrder>
  </div>
}
export default HistoryPage