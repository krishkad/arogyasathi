import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { CustomJWTPayload } from "../../auth/sign-up/route";
import User from "@/database/schema/user-schema";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("arogyasathi-authentication")?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: "missing token!" });
    }

    const token_data = jwt.verify(
      token,
      process.env.NEXTAUTH_TOKEN as string
    ) as CustomJWTPayload;

    if (!token_data._id) {
      return NextResponse.json({ success: false, message: "expired token!" });
    }

    const user = await User.findById(token_data._id);

    if (!user) {
      return NextResponse.json({ success: false, message: "no user found" });
    }

    return NextResponse.json({
      success: true,
      message: "ok",
      data: { fname: user.fname, lname: user.lname, email: user.email },
    });
  } catch (error) {
    console.log("error getting user: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
