const Order = require('../model/order')
const User = require('../model/user')
const Products = require('../model/product')
const storageRef = require('../config/firebase.config.js')
const { Readable } = require('stream')
const mongoose = require('mongoose')
exports.getOrders = async (req, res, next) =>
{
  try
  {
    const orders = await Order.find()
    res.status(200).json(orders)
  } catch (err)
  {
    console.log(err)
    const error = new Error(err)
    error.statusCode = 500
    error.data = [{ msg: 'Internal server error' }]
    next(error)
  }
}
exports.getUsers = async (req, res, next) =>
{
  try
  {
    const users = await User.find({
      role: { $nin: ['ctv', 'admin'] }
    })

    const userId = users.map(user => user._id)
    res.status(200).json(userId)
  } catch (err)
  {
    console.log(err)
    const error = new Error(err)
    error.statusCode = 500
    error.data = [{ msg: 'Internal server error' }]
    next(error)
  }
}
exports.postUpdateProduct = async (req, res, next) =>
{
  const productId = req.query.productId
  const { productName, category, shortDesc, longDesc, price, quantityInStock } = req.body


  try
  {

    const product = await Products.findById(productId)
    product.name = productName
    product.category = category
    product.short_desc = shortDesc
    product.long_desc = longDesc
    product.price = price
    product.quantityInStock = quantityInStock

    await product.save()
    return res.status(200).json({ message: 'Product updated succesfully!' })
  }
  catch (err)
  {
    console.log(err)
    const error = new Error(err)
    error.statusCode = 500
    error.data = [{ msg: 'Internal server error' }]
    next(error)
  }
}
exports.deleteProduct = async (req, res, next) =>
{
  try
  {
    const productId = req.query.productId

    await Products.findByIdAndDelete(productId)
    res.status(200).json({ message: 'deleted product!' })
  }
  catch (err)
  {
    console.log(err)
    const error = new Error(err)
    error.statusCode = 500
    error.data = [{ msg: 'Internal server error' }]
    next(error)
  }
}
exports.postNewProduct = async (req, res, next) =>
{
  const { productName, category, shortDesc, longDesc, price, quantityInStock } = req.body
  const img1 = req.files.img1
  const img2 = req.files.img2
  const img3 = req.files.img3
  const img4 = req.files.img4
  try
  {
    if (!img1)
    {
      return res.status(401).json({ message: 'you need to choose at least an image' })
    }
    const product = await new Products({
      name: productName,
      category: category,
      short_desc: shortDesc,
      long_desc: longDesc,
      price: price,
      quantityInStock: quantityInStock
    }).save()
    const productId = product._id

    if (img1)
    {
      const imageRef = storageRef.file(`images/${productId}_1`)
      const writeStream = imageRef.createWriteStream({
        metadata: {
          contentType: img1[0].mimetype
        }
      });
      const readableStream = new Readable();
      readableStream.push(img1[0].buffer);
      readableStream.push(null);
      readableStream.pipe(writeStream);
      await new Promise((resolve, reject) =>
      {
        writeStream.on('finish', resolve);

        writeStream.on('error', reject);
      });
      const downloadURL = await imageRef.getSignedUrl({ action: 'read', expires: '03-09-2491' })

      product.img1 = downloadURL[0]
    }
    if (img2)
    {

      const imageRef = storageRef.file(`images/${productId}_2`)
      const writeStream = imageRef.createWriteStream({
        metadata: {
          contentType: img2[0].mimetype
        }
      });
      const readableStream = new Readable();
      readableStream.push(img2[0].buffer);
      readableStream.push(null);
      readableStream.pipe(writeStream);
      await new Promise((resolve, reject) =>
      {
        writeStream.on('finish', resolve);

        writeStream.on('error', reject);
      });
      const downloadURL = await imageRef.getSignedUrl({ action: 'read', expires: '03-09-2491' })

      product.img2 = downloadURL[0]
    }
    if (img3)
    {

      const imageRef = storageRef.file(`images/${productId}_3`)
      const writeStream = imageRef.createWriteStream({
        metadata: {
          contentType: img3[0].mimetype
        }
      });
      const readableStream = new Readable();
      readableStream.push(img3[0].buffer);
      readableStream.push(null);
      readableStream.pipe(writeStream);
      await new Promise((resolve, reject) =>
      {
        writeStream.on('finish', resolve);

        writeStream.on('error', reject);
      });
      const downloadURL = await imageRef.getSignedUrl({ action: 'read', expires: '03-09-2491' })

      product.img3 = downloadURL[0]
    }
    if (img4)
    {

      const imageRef = storageRef.file(`images/${productId}_4`)
      const writeStream = imageRef.createWriteStream({
        metadata: {
          contentType: img4[0].mimetype
        }
      });
      const readableStream = new Readable();
      readableStream.push(img4[0].buffer);
      readableStream.push(null);
      readableStream.pipe(writeStream);
      await new Promise((resolve, reject) =>
      {
        writeStream.on('finish', resolve);

        writeStream.on('error', reject);
      });
      const downloadURL = await imageRef.getSignedUrl({ action: 'read', expires: '03-09-2491' })

      product.img4 = downloadURL[0]
    }

    await product.save()
    return res.status(200).json({ message: 'Product added succesfully!' })
  } catch (err)
  {
    console.log(err)
    const error = new Error(err)
    error.statusCode = 500
    error.data = [{ msg: 'Internal server error' }]
    next(error)
  }
}