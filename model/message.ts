import mongoose, { Schema, Document, model } from "mongoose";

export interface IMessage extends Document {
  senderId: mongoose.Types.ObjectId;
  content: string;
  senderName: string;
  senderImage: string;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 2000,
    },
    senderName: {
      type: String,
      required: true,
    },
    senderImage: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 2000,
    },
  },
  { timestamps: true }
);

const Message =
  mongoose.models.Message || model<IMessage>("Message", MessageSchema);
export default Message;
