import DbConnect from "@/lib/DbConnect";
import { getServerSession, User } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import ConversationModel from "@/models/Conversation.model";
import MessageModel from "@/models/Message.model";

export async function GET(request: NextRequest, { params }: { params: { _id: string } }) {
  await DbConnect();
  try {
    const session = await getServerSession(authOptions);
    const user: User = session?.user;
    if (!user || !session) {
      return Response.json({ success: false, message: "Not authenticated" }, { status: 400 });
    }
    const chatWithUserId = params._id;
    const conversation = await ConversationModel.findOne({
      participants: { $all: [user._id, chatWithUserId] },
    }).populate({
      path: "messages",
      model: MessageModel,
    });
    if (!conversation) {
      return Response.json({ success: true, messages: [] }, { status: 200 });
    }

    return Response.json({ success: true, messages: conversation.messages }, { status: 200 });
  } catch (error: any) {
    return Response.json(
      {
        succes: false,
        message: "Error fetching messages" + error.message,
      },
      { status: 500 }
    );
  }
}
