const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const cors = require('cors')
const multer = require('multer')



const adminRoutes = require('./routes/admin')
const messageRoutes = require('./routes/message')
const authRoutes = require('./routes/auth')
const shopRoutes = require('./routes/shop')
const orderRoutes = require('./routes/order')
const store = new MongoDBStore({
  uri: process.env.MONGODB,
  collection: 'sessions'
})
const upload = multer({ storage: multer.memoryStorage() });

app.use(bodyParser.json())
app.use(cors({
  origin: [process.env.ORIGIN1, process.env.ORIGIN2],
  credentials: true
}))

app.use(upload.fields([{ name: 'img1' }, { name: 'img2' }, { name: 'img3' }, { name: 'img4' }]));

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true,

  }
}))

app.use('/admin', adminRoutes)
app.use('/user', authRoutes)
app.use('/shop', shopRoutes)
app.use(orderRoutes)
app.use(messageRoutes)
app.use((error, req, res, next) =>
{
  if (error)
  {
    console.log(error)
    return res.status(error.statusCode).json({ message: error.data[0].msg })
  }

})

global.onlineUser = new Map()
mongoose
  .connect(process.env.MONGODB)
  .then((result) =>
  {
    const server = app.listen(process.env.PORT || 5000)
    const io = require('./socket').init(server)
    io.on('connection', socket =>
    {

      global.chatSocket = socket

      socket.on("add-user", (userId) =>
      {

        onlineUser.set(userId, socket.id)
      })
      socket.on("send-msg", (data) =>
      {

        const sendUserSocket = onlineUser.get(data.to)
        if (sendUserSocket)
        {

          socket.to(sendUserSocket).emit("msg-recieve", {
            message: data.message,
            from: data.from
          })
        }
      })
    })
  })
  .catch(err => console.log(err))
