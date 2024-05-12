import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  sender: Schema.Types.ObjectId;
  receiver: Schema.Types.ObjectId;
  content: string;
}

const messageSchema: Schema<Message> = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const MessageModel =
  (mongoose.models.Message as mongoose.Model<Message>) ||
  mongoose.model<Message>("Message", messageSchema);

export default MessageModel;
