const cors = require('cors')
let io
module.exports = {
  init: httpServer =>
  {
    io = require('socket.io')(httpServer, {
      cors: {
        origin: [process.env.ORIGIN1, process.env.ORIGIN2],
        Credential: true
      }
    })
    return io
  },
  getIO: () =>
  {
    if (!io)
    {
      throw new Error('Socket.io not initialized')
    }
    return io
  }
}