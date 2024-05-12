import mongoose, { Schema, Document } from "mongoose";

export interface Conversation extends Document {
  participants: Schema.Types.ObjectId[];
  messages: Schema.Types.ObjectId[];
}

const conversatioSchema: Schema<Conversation> = new Schema(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const ConversationModel =
  (mongoose.models.Conversation as mongoose.Model<Conversation>) ||
  mongoose.model<Conversation>("Conversation", conversatioSchema);
export default ConversationModel;
