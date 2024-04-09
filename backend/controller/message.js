const Messages = require('../model/message')
const User = require('../model/user')
exports.getMessages = async (req, res, next) =>
{
  try
  {
    const userId = req.query.userId

    const messages = await Messages.find({
      users: {
        $all: [userId, 'admin']
      }
    }).sort({ updatedAt: 1 })

    const projectedMessages = messages.map((msg) =>
    {
      return {
        fromself: msg.sender === userId,
        message: msg.message.text
      }
    })
    res.status(200).json(projectedMessages)
  }
  catch (err)
  {
    console.log(err)
    const error = new Error(err)
    error.statusCode = 500
    error.data = [{ message: 'Interval server error' }]
    return next(error)
  }
}
exports.addMessage = async (req, res, next) =>
{
  try
  {
    const { from, to, message } = req.body;

    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    })
    if (data)
    {
      return res.status(200).json({ message: "Message added successfully" })
    } else
    {
      return res.status(400).json({ message: "Failed to add message to the database" })
    }
  } catch (err)
  {
    console.log(err)
    const error = new Error(err)
    error.statusCode = 500
    error.data = [{ message: 'Interval server error' }]
    return next(error)
  }
}
