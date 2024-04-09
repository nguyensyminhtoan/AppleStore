// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const sessionSchema = new Schema({
//   userId: {
//     type: Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   adminId: {
//     type: Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   startedAt: {
//     type: Date,
//     default: Date.now,
//     required: true
//   },
//   endedAt: {
//     type: Date
//   },
//   messages: [{
//     senderId: {
//       type: Schema.Types.ObjectId,
//       ref: 'User',
//       required: true
//     },
//     content: {
//       type: String,
//       required: true
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//       required: true
//     }
//   }],
//   isActive: {
//     type: Boolean,
//     default: true
//   }
// });

// const Session = mongoose.model('Session', sessionSchema);

// module.exports = Session;