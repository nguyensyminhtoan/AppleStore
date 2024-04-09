const Product = require('../model/product')
const User = require('../model/user')
const mongoose = require('mongoose')

exports.getProducts = (req, res, next) =>
{
  Product.find()
    .then(result =>
    {
      res.status(200).json(result)
    })
    .catch(err =>
    {
      const error = new Error(err)
      error.statusCode = 500
      error.data = [{ msg: 'Internal server error' }]
      next(error)
    })
}
exports.postAddToCart = async (req, res, next) =>
{
  const { productId, quantity } = req.body

  const userId = req.session.user._id
  const productIdObject = new mongoose.Types.ObjectId(productId)
  try
  {
    const user = await User.findById(userId)

    const existingItem = user.cart.items.find((item) =>
    {

      return item.productId.equals(productIdObject)
    }
    )
    if (existingItem)
    {

      existingItem.quantity += Number(quantity)
    } else
    {
      user.cart.items.push({ productId: productId, quantity: quantity })
    }

    await user.save()
    res.status(200).json({ message: 'Product added to cart succesfully' })
  } catch (err)
  {
    // console.log(err)
    const error = new Error(err)
    error.statusCode = 500
    error.data = [{ msg: 'Internal server error' }]
    next(error)
  }
}
exports.getCart = async (req, res, next) =>
{
  const userId = req.session.user._id
  try
  {
    let totalPrice = 0;
    const user = await User.findById(userId).populate('cart.items.productId')
    user.cart.items.forEach(item =>
    {
      totalPrice += item.productId.price * item.quantity;
    });
    user.cart.totalPrice = Number(totalPrice);
    await user.save();
    const cart = user.cart.items
    res.status(200).json({ cart: cart, totalPrice: totalPrice })
  } catch (err)
  {
    console.log(err)
    const error = new Error(err)
    error.statusCode = 500
    error.data = [{ msg: 'Internal server error' }]
    next(error)
  }
}
exports.postUpdateCart = async (req, res, next) =>
{
  const userId = req.session.user._id
  const { productId, quantity } = req.body
  const productIdObject = new mongoose.Types.ObjectId(productId);

  try
  {
    let totalPrice = 0;
    const user = await User.findById(userId).populate('cart.items.productId')
    const item = user.cart.items.find(item => item.productId._id.equals(productIdObject))
    if (item)
    {
      item.quantity = Number(quantity)
      if (item.quantity <= 0)
      {
        const itemIndex = user.cart.items.findIndex(item => item.productId._id.equals(productIdObject));
        user.cart.items.splice(itemIndex, 1);
      }
    } else
    {
      user.cart.items.push({ productId: productId, quantity: quantity })
    }

    user.cart.items.forEach(item =>
    {

      totalPrice += item.productId.price * item.quantity;
    });

    user.cart.totalPrice = Number(totalPrice);
    await user.save()
    res.status(200).json({ message: 'cart updated succesfully' })
  } catch (err)
  {

    const error = new Error(err)
    error.statusCode = 500
    error.data = [{ msg: 'Internal server error' }]
    next(error)
  }
}
exports.getRemoveItemFromCart = async (req, res, next) =>
{

  const userId = req.session.user._id
  const productId = req.query.productId
  try 
  {
    const user = await User.findById(userId)
    const index = user.cart.items.findIndex(item => item.productId.toString() === productId)
    if (index !== -1)
    {
      user.cart.items.splice(index, 1);

      await user.save();
      return res.status(200).json({ message: 'Product removed from cart' });
    } else
    {
      return res.status(404).json({ message: 'Product not found in cart' });
    }
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