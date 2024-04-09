import styles from './DetailOrder.module.css'

const DetailOrder = ({ orders, selectedOrder }) =>
{
  if (selectedOrder)
  {
    const order = orders.find((order) => order._id === selectedOrder)
    const products = order.products
    return <div >
      <div className={styles['order-info']}>
        <h1>INFORMATION ORDER</h1>
        <p>ID User: {order.userId}</p>
        <p>Full Name: {order.buyerInformation.fullName}</p>
        <p>Phone: {order.buyerInformation.phoneNumber}</p>
        <p>Address: {order.buyerInformation.address}</p>
        <p>Total: {order.totalPrice.toLocaleString("vi-VN")} VND</p>
      </div>
      <table className={styles.table}>
        <thead >
          <tr>
            <th>ID PRODUCT</th>
            <th>IMAGE</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>COUNT</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) =>
          {
            return <tr key={index}>
              <td>{product.product._id}</td>
              <td><img className={styles.image} alt={product.product.img1} src={product.product.img1}></img></td>
              <td>{product.product.name}</td>
              <td>{product.product.price.toLocaleString('vi-VN')} VND</td>
              <td>{product.quantity}</td>
            </tr>
          })}

        </tbody>
      </table>
    </div>
  } else
  {
    return null
  }

}
export default DetailOrder