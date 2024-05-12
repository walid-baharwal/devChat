import DbConnect from "@/lib/DbConnect";
import { NextRequest } from "next/server";
import ConversationModel from "@/models/Conversation.model";
import MessageModel from "@/models/Message.model";

export async function POST(request: NextRequest) {
  await DbConnect();
  try {
    const { sender, receiver, content } = await request.json();

    console.log(" conversation");
    let conversation = await ConversationModel.findOne({
      participants: { $all: [sender, receiver] },
    });
    if (!conversation) {
      console.log("new conversation");
      conversation = await ConversationModel.create({
        participants: [sender, receiver],
      });
    }
    const newMessage = new MessageModel({
      sender,
      receiver,
      content
    });
    console.log("new message");
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    await conversation.save();
    await newMessage.save();

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
