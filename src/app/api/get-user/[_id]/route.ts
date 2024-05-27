import DbConnect from "@/lib/DbConnect";
import { getServerSession, User } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import UserModel from "@/models/User.model";

export async function GET(request: NextRequest, { params }: { params: { _id: string } }) {
  await DbConnect();
  try {
    const session = await getServerSession(authOptions);
    const user: User = session?.user;
    if (!user || !session) {
      return Response.json({ success: false, message: "Not authenticated" }, { status: 400 });
    }
    const userData = await UserModel.findById(params._id);
    if (!userData) {
      return Response.json({ success: false, message: "User not found " }, { status: 404 });
    }

    return Response.json({ success: true, userData }, { status: 200 });
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        message: "Error fetching user" + error.message,
      },
      { status: 500 }
    );
  }
}
