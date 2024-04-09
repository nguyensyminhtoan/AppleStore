module.exports = (req, res, next) =>
{
  if (!req.session.isLogin)
  {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  if (req.session.user.role !== 'admin')
  {
    return res.status(401).json({ message: 'You need to be an admin to have access' })
  }
  next();
}