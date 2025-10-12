import { connectToDatabase } from "@/database/db";
import User from "@/database/schema/user-schema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface CustomJWTPayload extends JwtPayload {
  _id: string;
}

export async function POST(req: NextRequest) {
  await connectToDatabase();
  try {
    const { fname, lname, email, password } = await req.json();

    if (!fname || !lname || !email || !password) {
      return NextResponse.json({
        success: false,
        message: "missing required fields",
      });
    }
    console.log({ fname, lname, email, password });

    const is_user = await User.findOne({ email });

    if (is_user) {
      return NextResponse.json({
        success: false,
        message: "user already exist",
      });
    }

    const hashed_password = bcrypt.hashSync(password, 10);

    const user = await User.create({
      fname,
      lname,
      email,
      password: hashed_password,
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "failed to create user",
      });
    }

    const token_data = {
      _id: user._id,
    };

    const token = jwt.sign(token_data, process.env.NEXTAUTH_SECRET as string);

    const response = NextResponse.json({
      success: true,
      message: "ok",
      data: user,
    });
    response.cookies.set("arogyasathi-authentication", token);
    return response;
  } catch (error) {
    console.log("error signing up: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
