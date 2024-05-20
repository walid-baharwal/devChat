import DbConnect from "@/lib/DbConnect";
import { NextRequest } from "next/server";
import ConversationModel from "@/models/Conversation.model";
import MessageModel from "@/models/Message.model";
import { authOptions } from "../auth/[...nextauth]/options";
import { getServerSession, User } from "next-auth";

export async function POST(request: NextRequest) {
  await DbConnect();
  try {
    const session = await getServerSession(authOptions);
    const user: User = session?.user;
    const { receiver, content } = await request.json();

    const sender = user._id;

    let conversation = await ConversationModel.findOne({
      participants: { $all: [sender, receiver] },
    });
    if (!conversation) {
      conversation = await ConversationModel.create({
        participants: [sender, receiver],
      });
    }
    const newMessage = new MessageModel({
      sender,
      receiver,
      content,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    //socket/io
    //

    await Promise.all([conversation.save(), newMessage.save()]);

    return Response.json(
      {
        success: true,
        message: "message saved successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json(
      {
        succes: false,
        message: "error sending message " + error.message,
      },
      { status: 500 }
    );
  }
}
