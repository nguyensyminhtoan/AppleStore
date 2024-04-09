module.exports = (req, res, next) =>
{
  if (!req.session.isLogin)
  {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  if (req.session.user.role === 'customer')
  {
    return res.status(401).json({ message: 'You need to be admin or ctv to have access' })
  }
  next();
}