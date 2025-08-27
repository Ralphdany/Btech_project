import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema({
  senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

export const Message = mongoose.model('Message', messageSchema);