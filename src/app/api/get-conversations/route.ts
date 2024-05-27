import DbConnect from "@/lib/DbConnect";
import { getServerSession, User } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import ConversationModel from "@/models/Conversation.model";
import mongoose from "mongoose";

export async function GET(request: NextRequest) {
  await DbConnect();
  try {
    const session = await getServerSession(authOptions);
    const user: User = session?.user;
    if (!user || !session) {
      return Response.json({ success: false, message: "Not authenticated" }, { status: 400 });
    }

    const conversations = await ConversationModel.aggregate([
      {
        $match: {
          participants: {
            $in: [new mongoose.Types.ObjectId(user._id)],
          },
        },
      },
      {
        $addFields: {
          participants: {
            $first: {
              $filter: {
                input: "$participants",
                as: "participant",
                cond: { $ne: ["$$participant", new mongoose.Types.ObjectId(user._id)] },
              },
            },
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "participants",
          foreignField: "_id",
          as: "user",
          pipeline: [
            {
              $project: {
                fullName: 1,
              },
            },
          ],
        },
      },
      {
        $addFields: {
          user: {
            $first: "$user",
          },
        },
      },
      {
        $addFields: {
          lastMessage: {
            $last: "$messages",
          },
        },
      },
      {
        $lookup: {
          from: "messages",
          localField: "lastMessage",
          foreignField: "_id",
          as: "lastMessage",
        },
      },
      {
        $addFields: {
          lastMessage: {
            $first: "$lastMessage",
          },
        },
      },
      {
        $project: {
          user: 1,
          lastMessage: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);
    if (!conversations) {
      return Response.json({ success: true, conversations: [] }, { status: 200 });
    }
    return Response.json(
      {
        success: true,
        conversations,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        message: "Error fetching messages " + error.message,
      },
      { status: 500 }
    );
  }
}
