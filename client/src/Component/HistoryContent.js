import styles from './HistoryContent.module.css'
const HistoryContent = ({ orders, message, setSelectedOrder }) =>
{


  return <>
    <table className={styles.table}>
      <thead >
        <tr>
          <th>ID ORDER</th>
          <th>ID USER</th>
          <th>NAME</th>
          <th>PHONE</th>
          <th>ADDRESS</th>
          <th>TOTAL</th>
          <th>DELIVERY</th>
          <th>STATUS</th>
          <th>DETAIL</th>
        </tr>
      </thead>
      <tbody>

        {orders.length > 0 && orders.map((order, index) =>
        {
          return <tr key={index}>
            <td>{order._id}</td>
            <td>{order.userId}</td>
            <td>{order.buyerInformation.fullName}</td>
            <td>{order.buyerInformation.phoneNumber}</td>
            <td>{order.buyerInformation.address}</td>
            <td>{order.totalPrice.toLocaleString("vi-VN")} VND</td>
            <td>Waiting for progressing</td>
            <td>{order.buyerInformation.status}</td>
            <td><button onClick={() => setSelectedOrder(order._id)} className={styles.button}>View ➝</button></td>
          </tr>
        })}
      </tbody>
    </table>
    <p style={{ color: "red", width: "30%", margin: '20px auto' }}>{message}</p>
  </>
}
export default HistoryContent