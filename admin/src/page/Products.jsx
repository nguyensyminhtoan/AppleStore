import { useEffect } from 'react'
import './Products.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Products({ products, setProducts })
{

  const [searchValue, setSearchValue] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState('')
  const navigate = useNavigate()
  useEffect(() =>
  {
    const fetchProducts = async () =>
    {
      const sendRequest = await fetch('http://localhost:5000/shop/products', {
        method: "GET"
      })
      const data = await sendRequest.json()
      setProducts(data)
      setFilteredProducts(data)
    }
    fetchProducts()
  }, [setProducts])
  const handleUpdate = async (productId) =>
  {
    navigate(`/new-product?productId=${productId}`)
  }
  const handleDelete = async (productId) =>
  {

    const sendRequest = await fetch('http://localhost:5000/admin/delete-product?productId=' + productId, {
      method: "DELETE",
      credentials: "include"
    })
    const data = await sendRequest.json()
    setError(data.message)
    if (sendRequest.ok)
    {
      setFilteredProducts(filteredProducts.filter(product => product._id !== productId));
    }
  }


  const handleChangeSearch = (event) =>
  {
    setSearchValue(event.target.value)
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };
  return <div className='container-products'>
    <div className='products-page'>
      <h2>Products</h2>
      <input
        placeholder='Enter Search!'
        type='text'
        value={searchValue}
        onChange={handleChangeSearch}
      />
      {error && <p style={{ color: 'red' }} >{error}</p>}
      <table className="table-container">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Category</th>
            <th>edit</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts && filteredProducts.map((product, index) =>
          {
            return <tr key={index} >
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.price.toLocaleString('vi-VN')} VND</td>
              <td><img src={product.img1} alt={product.img1}></img></td>
              <td>{product.category}</td>
              <td><button className="button-detail" onClick={() => handleUpdate(product._id)} >Update</button>
                <button className="button-detail" onClick={() => handleDelete(product._id)}>Delete</button></td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  </div>
}
