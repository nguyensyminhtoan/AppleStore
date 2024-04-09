module.exports = (req, res, next) =>
{
  if (!req.session.isLogin)
  {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  next();
}