import { Message } from "@/models/Message.model";
import { User } from "@/models/User.model";
export interface Conversation {
  _id: string;
  lastMessage: {
    content: string;
  };
  user: {
    _id: string;
    fullName: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  messages?: Array<Message>;
  conversations?: Array<Conversation>;
  userData?: User;
  singleMessage?: Message;
}
