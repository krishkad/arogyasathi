import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { CustomJWTPayload } from "../../auth/sign-up/route";
import OpenAI from "openai";
import Chat from "@/database/schema/chat-schema";
import { connectToDatabase } from "@/database/db";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  //   defaultHeaders: {
  //     "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
  //     "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
  //   },
});

export async function POST(req: NextRequest) {
  await connectToDatabase();
  try {
    const token = req.cookies.get("arogyasathi-authentication")?.value;
    const { chat } = await req.json();

    if (!token) {
      return NextResponse.json({ success: false, message: "missing token!" });
    }

    if (!chat) {
      return NextResponse.json({ success: false, message: "missing chat!" });
    }

    const token_data = jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET as string
    ) as CustomJWTPayload;

    if (!token_data._id) {
      return NextResponse.json({ success: false, message: "token expired" });
    }

    const response = await openai.chat.completions.create({
      model: "mistralai/mistral-small-3.2-24b-instruct:free",
      messages: [
        {
          role: "user",
          content: `You are an AI acting as a licensed healthcare professional.

Instructions:
– Read the user's health concern.
– Respond directly and briefly, like a short message from a doctor.
– Focus on giving a clear answer or advice, based on the input.
– Use a calm, professional tone.
– Include next steps (e.g., home care, seeing a doctor, emergency signs).
– Do not ask unnecessary questions unless absolutely needed for safety.
– Always add a brief disclaimer that this is not a substitute for professional medical care.
– Answer in short.

User Input:
${chat}`,
        },
      ],
    });

    if (!response.choices[0].message.content || !response) {
      return NextResponse.json({
        success: false,
        message: "failed to generate ai response",
      });
    }

    const create_chat = await Chat.create({
      prompt: chat,
      response: response.choices[0].message.content,
      userId: token_data._id,
    });

    if (!create_chat) {
      return NextResponse.json({
        success: false,
        message: "failed to create chat",
      });
    }

    return NextResponse.json({
      success: true,
      message: "ok",
      prompt: create_chat.prompt,
      response: create_chat.response,
    });
  } catch (error) {
    console.log("error chatting: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
