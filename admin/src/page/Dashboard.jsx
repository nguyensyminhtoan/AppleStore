import { useState } from 'react'
import './Dashboard.css'
import { useEffect } from 'react'
import { useCallback } from 'react'
import DetailOrder from '../component/DetailOrder'
export default function DashBoard()
{
  const [orders, setOrders] = useState([])
  const [users, setUsers] = useState([])
  const [error, setError] = useState([])
  const [dailyOrders, setDailyOrders] = useState([]);
  const [totalDailySales, setTotalDailySales] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState('')
  const fetchInformation = useCallback(async () =>
  {
    const requestOrders = await fetch('http://localhost:5000/admin/orders', {
      method: 'GET',
      credentials: "include"
    })
    const requestUser = await fetch('http://localhost:5000/admin/users', {
      method: 'GET',
      credentials: "include"
    })
    const responseOrders = await requestOrders.json()
    const responseUsers = await requestUser.json()
    if (requestOrders.ok)
    {
      setOrders(responseOrders)
      const today = new Date();
      const todayStr = today.toISOString().substring(0, 10);
      const filteredOrders = responseOrders.filter(order =>
      {

        return order.createAt.substring(0, 10) === todayStr;
      });

      setDailyOrders(filteredOrders);
      const totalSales = responseOrders.reduce((total, order) => total + order.totalPrice, 0);
      setTotalDailySales(totalSales);
    } else
    {
      setError(responseOrders.message)
    }
    if (requestUser.ok)
    {
      setUsers(responseUsers)
    } else
    {
      setError(responseUsers.message)
    }

  }, [])
  useEffect(() =>
  {
    fetchInformation()
  }, [fetchInformation])

  return <div className='container-dash'>
    <div className="dashboard">
      <h3>Dashboard</h3>
      <div className='general-information'>
        <div className='information'>
          <div>
            <h2>{users.length}</h2>
            <p>Client</p>
          </div>
          <div>
            <i className="fa-solid fa-user-plus"></i>
          </div>
        </div>
        <div className='information'>
          <div>
            <h2>{totalDailySales.toLocaleString("vi-Vn")}  <span className="vnd">VND</span></h2>
            <p>Earnings of Month</p>
          </div>
          <div>
            <i className="fa-solid fa-dollar-sign"></i>
          </div>
        </div><div className='information'>
          <div>
            <h2>{dailyOrders.length}</h2>
            <p>New Order</p>
          </div>
          <div>
            <i className="fa-solid fa-file-circle-plus"></i>
          </div>
        </div>
      </div>
      <table className="table-container">
        <thead>
          <tr>
            <th>Id User</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Total</th>
            <th>Delivery</th>
            <th>Status</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          {orders && orders.map((order, index) =>
          {
            return <tr key={index}>
              <td>{order.userId}</td>
              <td>{order.buyerInformation.fullName}</td>
              <td>{order.buyerInformation.phoneNumber}</td>
              <td>{order.buyerInformation.address}</td>
              <td>{order.totalPrice.toLocaleString("vi-VN")} VND</td>
              <td>Chưa vận chuyển</td>
              <td>{order.buyerInformation.status}</td>
              <td><button className="button-detail" onClick={() => { setSelectedOrder(order._id) }}>View</button></td>
            </tr>
          })}
        </tbody>
      </table>
      <p style={{ color: 'red' }}>{error}</p>
    </div>
    {selectedOrder && <DetailOrder orders={orders} selectedOrder={selectedOrder} />}
  </div>
}