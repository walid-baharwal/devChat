import DbConnect from "@/lib/DbConnect";
import UserModel from "@/models/User.model";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  await DbConnect();
  try {
    const { username, fullName, password } = await request.json();

    const existingUsername = await UserModel.findOne({
      username,
    });
    if (existingUsername) {
      return Response.json(
        {
          success: false,
          message: "User with this username already exists",
        },
        { status: 400 }
      );
    }

    const newUser = await UserModel.create({
      username,
      fullName,
      password,
    });

    if (newUser) {
      return Response.json(
        {
          success: true,
          message: "User registered successfully.",
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log("Error while registering user ", error);
    return Response.json(
      {
        success: false,
        message: "Error while registering user",
      },
      {
        status: 500,
      }
    );
  }
}
