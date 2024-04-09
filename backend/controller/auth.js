const User = require('../model/user')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')



exports.postSignup = async (req, res, next) =>
{

  const errors = validationResult(req)
  if (!errors.isEmpty())
  {

    const error = new Error(errors.msg)
    error.statusCode = 422
    error.data = errors.array()

    return next(error)
  }
  const { userName, email, password, phone } = req.body
  try
  {
    const hashedPw = await bcrypt.hash(password, 12)
    const user = new User({
      email: email,
      password: hashedPw,
      userName: userName,
      phone: phone
    })
    const result = await user.save()
    res.status(201).json({
      message: 'User created!',
    })
  } catch (err)
  {
    if (!err.statusCode)
    {
      err.statusCode = 500
      err.data = [{ message: 'Interval server error' }]
    }
    next(err)
  }
}

exports.postLogin = async (req, res, next) =>
{
  const errors = validationResult(req)
  const { email, password } = req.body
  let loadedUser
  if (!errors.isEmpty())
  {

    const error = new Error(errors.msg)
    error.statusCode = 422
    error.data = errors.array()

    return next(error)
  }
  try
  {

    const user = await User.findOne({ email: email })
    if (!user)
    {
      const error = new Error('A user with this email could not be found.')
      error.statusCode = 401;
      error.data = [{ msg: 'A user with this email could not be found.' }]

      return next(error)
    }
    loadedUser = user
    const isEqual = await bcrypt.compare(password, user.password)
    if (!isEqual)
    {
      const error = new Error('Wrong password!');
      error.statusCode = 401;
      error.data = [{ message: 'Wrong password!' }]
      return next(error)
    }
    req.session.isLogin = true
    req.session.user = user
    req.session.save()
    res.status(200).json({ message: 'login succesfully', userName: user.userName, phone: user.phone, userId: user._id },
    )

  } catch (err)
  {
    const error = new Error(err)
    error.statusCode = 500
    error.data = [{ message: 'Interval server error' }]
    return next(error)
  }
}
exports.getLogout = (req, res, next) =>
{

  if (req.session)
  {
    req.session.destroy((error) =>
    {
      if (error)
      {
        const error = new Error('Internal Server Error');
        error.statusCode = 500;
        return next(error);
      }

      res.status(200).json({ message: 'logout succesfully' })
    });
  }
}
exports.postLoginAdmin = async (req, res, next) =>
{
  const errors = validationResult(req)
  const { email, password } = req.body
  let loadedUser
  if (!errors.isEmpty())
  {

    const error = new Error(errors.msg)
    error.statusCode = 422
    error.data = errors.array()

    return next(error)
  }
  try
  {

    const user = await User.findOne({ email: email })
    if (!user)
    {
      const error = new Error('A user with this email could not be found.')
      error.statusCode = 401;
      error.data = [{ msg: 'A user with this email could not be found.' }]

      return next(error)
    }
    if (!(user.role === 'admin' || user.role === 'ctv'))
    {

      const error = new Error('You are not admin or ctv')
      error.statusCode = 401;
      error.data = [{ msg: 'You are not admin or ctv' }]

      return next(error)
    }

    loadedUser = user
    const isEqual = await bcrypt.compare(password, user.password)
    if (!isEqual)
    {
      const error = new Error('Wrong password!');
      error.statusCode = 401;
      error.data = [{ message: 'Wrong password!' }]
      return next(error)
    }
    req.session.isLogin = true
    req.session.user = user
    req.session.save()
    res.status(200).json({ message: 'login succesfully', userName: user.userName, phone: user.phone, userId: user._id },
    )

  } catch (err)
  {
    const error = new Error(err)
    error.statusCode = 500
    error.data = [{ message: 'Interval server error' }]
    return next(error)
  }
}
