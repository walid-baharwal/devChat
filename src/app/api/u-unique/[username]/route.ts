import DbConnect from "@/lib/DbConnect";
import UserModel from "@/models/User.model";
import { usernameValidation } from "@/schemas/signUpSchema";
import { NextRequest } from "next/server";
import { z } from "zod";

const usernameSchemaValidation = z.object({
  username: usernameValidation,
});

export async function GET(request: NextRequest, { params }: { params: { username: string } }) {
  await DbConnect();
  try {
    const result = usernameSchemaValidation.safeParse({ username: params.username });
    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message: usernameErrors?.length > 0 ? usernameErrors.join(", ") : "Invalid parameters",
        },
        { status: 400 }
      );
    }
    const username = params.username;
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return Response.json(
        {
          success: false,
          message: "Username already exists",
        },
        { status: 400 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Username is unique",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        message: "Error checking username" + error.message,
      },
      { status: 500 }
    );
  }
}
