
import { useEffect, useState } from 'react'
import './NewProduct.css'
import { useLocation, useNavigate } from 'react-router-dom'


export default function NewProduct({ products })
{
  const location = useLocation()
  const [productId, setProductId] = useState('')
  const [productName, setProductName] = useState('')
  const [category, setCategory] = useState('')
  const [shortDesc, setShortDesc] = useState('')
  const [longDesc, setLongDesc] = useState('')
  const [images, setImages] = useState([])
  const [Error, setError] = useState('');
  const [price, setPrice] = useState('')
  const [quantityInStock, setQuantityInStock] = useState('')
  const [imagePreviews, setImagePreviews] = useState([])
  const navigate = useNavigate()
  useEffect(() =>
  {
    const searchParams = new URLSearchParams(location.search)
    const id = searchParams.get('productId')
    setProductId(id)
    // Tìm sản phẩm trong danh sách products nếu productId tồn tại
    if (id && products)
    {
      const product = products.find(product => product._id === id);
      if (product)
      {
        setProductName(product.name);
        setCategory(product.category);
        setShortDesc(product.short_desc);
        setLongDesc(product.long_desc);
        setPrice(product.price)
      }
    }
  }, [location, products])
  const handleImageChange = (e) =>
  {
    const files = e.target.files;
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    let selectedImages = {};
    let error = '';
    let previews = [];
    // Kiểm tra số lượng ảnh đã chọn
    if (files.length > 4)
    {
      error = 'Please select up to 4 images';
      e.target.value = null;
    } else
    {
      // Kiểm tra kiểu ảnh và lưu vào mảng selectedImages
      for (let i = 0; i < files.length; i++)
      {
        if (allowedTypes.includes(files[i].type))
        {
          selectedImages[`img${i + 1}`] = files[i];
          previews.push(URL.createObjectURL(files[i]))
        } else
        {
          error = 'Please select valid image files (JPEG, PNG, GIF)';
        }
      }
    }

    setImages(selectedImages);
    setError(error);
    setImagePreviews(previews)
  };
  const handleSubmit = async (e) =>
  {

    e.preventDefault()

    const formData = new FormData()
    // Thêm từng file hình ảnh vào FormData
    for (let i = 0; i < Object.values(images).length; i++)
    {
      formData.append(`img${i + 1}`, Object.values(images)[i]);
    }
    formData.append('quantityInStock', quantityInStock)
    formData.append('productName', productName);
    formData.append('category', category);
    formData.append('shortDesc', shortDesc);
    formData.append('longDesc', longDesc);
    formData.append('price', price)
    if (productId)
    {
      const sendRequest = await fetch('https://backendasm3.onrender.com/admin/update-product?productId=' + productId, {
        method: "POST",

        credentials: "include",
        body: formData
      })
      const data = await sendRequest.json()
      setError(data.message)
      if (sendRequest.ok)
      {
        navigate('/products')
      }
    }
    else
    {
      if (!images || !productName || !category || !price || !shortDesc || !longDesc)
      {
        setError('fill all to submit')
      } else
      {
        const sendRequest = await fetch('https://backendasm3.onrender.com/admin/add-product', {
          method: "POST",
          credentials: "include",
          body: formData
        })
        const data = await sendRequest.json()
        setError(data.message)
        if (sendRequest.ok)
        {
          navigate('/products')
        }
      }

    }
  }
  return <div className='container-product'>
    <form className='product-page' onSubmit={handleSubmit}>
      <label>Product Name</label>
      <input type='text' placeholder='Enter Product Name' value={productName} onChange={e => setProductName(e.target.value)}></input>
      <label>Category</label>
      <input type='text' placeholder='Enter Category' value={category} onChange={e => setCategory(e.target.value)} />
      <label>Price</label>
      <input type='number' placeholder='Enter Price' value={price} onChange={(e) => setPrice(e.target.value)} />
      <label>Quantity In Stock</label>
      <input type='number' placeholder='Enter Quantity' value={quantityInStock} onChange={(e) => setQuantityInStock(e.target.value)} />
      <label>Short Description</label>
      <textarea type='text' placeholder='Enter Short Description' rows='4' value={shortDesc} onChange={e => setShortDesc(e.target.value)} />
      <label>Long Description</label>
      <textarea type='text' placeholder='Enter Long Description' rows='6' value={longDesc} onChange={e => setLongDesc(e.target.value)} />
      <label>Upload image(4 images)</label>
      <input type='file' accept='image/*' multiple onChange={handleImageChange} />
      {imagePreviews.map((preview, index) => ( // Hiển thị các hình ảnh được chọn dưới nút chọn
        <img key={index} src={preview} alt={`${index + 1}`} style={{ width: '100px', height: 'auto', marginRight: '10px' }} />
      ))}
      {Error && <p style={{ color: 'red' }}>{Error}</p>}
      <button type='submit'>Submit</button>
    </form>
  </div>
}