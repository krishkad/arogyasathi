import { connectToDatabase } from "@/database/db";
import User from "@/database/schema/user-schema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  await connectToDatabase();

  try {
    const { email, password } = await req.json();

    console.log({ email, password } )

    if (!email || !password) {
      return NextResponse.json({
        success: false,
        message: "Missing email or password",
      }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Invalid email or password",
      }, { status: 401 });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({
        success: false,
        message: "Invalid email or password",
      }, { status: 401 });
    }

    const token_data = {
      _id: user._id,
    };

    const token = jwt.sign(token_data, process.env.NEXTAUTH_SECRET as string, {
      expiresIn: "7d", // Optional: set token expiry
    });

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      data: {
        _id: user._id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
      },
    });

    response.cookies.set("arogyasathi-authentication", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error signing in:", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    }, { status: 500 });
  }
}
