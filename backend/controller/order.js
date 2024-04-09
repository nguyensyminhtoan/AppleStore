const { default: mongoose } = require('mongoose')
const Order = require('../model/order')
const { validationResult } = require('express-validator')
const User = require('../model/user')
const nodemailer = require('nodemailer')
const Products = require('../model/product')
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vophingoc1995@gmail.com',
    pass: process.env.PWGMAIL
  }
})

exports.postOrder = async (req, res, next) =>
{
  const { products, buyerInformation, totalPrice } = req.body
  const userId = new mongoose.Types.ObjectId(req.session.user._id)

  const errors = validationResult(req)
  if (!errors.isEmpty())
  {
    const error = new Error(errors.msg)
    error.statusCode = 422
    error.data = errors.array()
    return next(error)
  }
  if (products.length === 0)
  {
    return res.status(400).json({ message: 'your cart must contain at least one product.' })
  }
  try
  {
    const updateOperations = products.map(product =>
    {

      return {
        updateOne: {
          filter: { _id: new mongoose.Types.ObjectId(product.product._id) },
          update: { $inc: { quantityInStock: -product.quantity } }
        }
      };
    });

    await Products.bulkWrite(updateOperations);

    const newOrder = new Order({
      products: products,
      userId: userId,
      buyerInformation: buyerInformation,
      totalPrice: totalPrice
    })
    const savedOrder = await newOrder.save()
    const user = await User.findById(userId)
    user.order.push(savedOrder._id)
    user.cart.items = []
    user.cart.totalPrice = 0
    await user.save()
    const productRows = savedOrder.products.map(product =>
    {
      return `<tr>
        <td style="padding: 8px">${product.product.name}</td>
        <td style="padding: 8px"><img src="${product.product.img1}" alt="${product.product.name}" style="width: 50px; height: 50px"></td>
        <td style="padding: 8px">$${product.product.price.toLocaleString("vi-VN")} VND</td>
        <td style="padding: 8px">${product.quantity}</td>
        <td style="padding: 8px">$${(product.product.price * product.quantity).toLocaleString("vi-VN")} VND</td>
      </tr>`
    }).join('')
    const html = `
    <h2>Xin Chào ${buyerInformation.fullName}</h2>
    <p>Phone: ${buyerInformation.phoneNumber}</p>
    <p>Address: ${buyerInformation.address}</p>
    <table style="width: 30%; border: 1px solid #ddd; border-collapse: collapse;">
        <thead>
            <tr>
                <th>Tên Sản Phẩm</th>
                <th>Hình Ảnh</th>
                <th>Giá</th>
                <th>Số Lượng</th>
                <th>Thành tiền</th>
            </tr>
        </thead>
        <tbody>
            ${productRows}
        </tbody>
    </table>
    <h1>Tổng Thanh Toán</h1>
    <h1>${totalPrice.toLocaleString("vi-VN")} VND</h1>

    <h1>Cảm ơn bạn</h1>
`
    const mailOptions = {
      from: "vophingoc1995@gmail.com",
      to: buyerInformation.email,
      subject: 'Confirm order',
      html: html
    }
    transporter.sendMail(mailOptions, (error, info) =>
    {
      if (error)
      {
        console.log('error sending email', error)
      } else
      {
        console.log('Email sent:', info.response)
      }
    })
    res.status(201).json({
      message: 'Order created succesfully!'
    })
  } catch (err)
  {
    console.log(err)
    const error = new Error(err)
    error.statusCode = 500
    error.data = [{ msg: 'Internal server error' }]
    next(error)
  }
}
exports.getHistoryOrders = async (req, res, next) =>
{
  const userId = req.session.user._id
  try
  {
    const user = await User.findById(userId)
    const orderIds = user.order
    if (!orderIds || orderIds.length === 0)
    {
      return res.status(404).json({ message: 'No orders found for you' });
    }
    const orders = await Order.find({ _id: { $in: orderIds } })

    return res.status(200).json(orders)

  } catch (err)
  {
    console.log(err)
    const error = new Error(err)
    error.statusCode = 500
    error.data = [{ msg: 'Internal server error' }]
    next(error)
  }

}