import DbConnect from "@/lib/DbConnect";
import { getServerSession, User } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import UserModel from "@/models/User.model";

export async function GET(request: NextRequest, { params }: { params: { name: string } }) {
  await DbConnect();
  try {
    const session = await getServerSession(authOptions);
    const user: User = session?.user;
    if (!user || !session) {
      return Response.json({ success: false, message: "Not authenticated" }, { status: 400 });
    }
    const searchQuery = {
      $or: [
        { fullName: { $regex: new RegExp(`^${params.name}`, "i") } },
        { username: { $regex: new RegExp(`^${params.name}`, "i") } },
      ],
    };
    const users = await UserModel.find(searchQuery).select("-password");
    if (!users) {
      return Response.json({ success: false, message: "User not found " }, { status: 404 });
    }

    return Response.json({ success: true, users }, { status: 200 });
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        message: "Error fetching users" + error.message,
      },
      { status: 500 }
    );
  }
}
