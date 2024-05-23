
import { Message } from "@/models/Message.model";

export interface ApiResponse {
  success: boolean;
  message: string;
  messages?: Array<Message>;
  conversations? : Array<any>;
}
