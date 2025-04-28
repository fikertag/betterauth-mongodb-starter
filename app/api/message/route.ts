import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Message from "@/model/message";
import mongoose from "mongoose";
import { pusherServer } from "@/lib/pusher";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { senderId, content, senderName, senderImage } = await request.json();

    // Validate input
    if (!mongoose.Types.ObjectId.isValid(senderId) || !content?.trim()) {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      );
    }

    // Create new message
    const newMessage = new Message({
      senderId,
      content: content.trim(),
      senderName,
      senderImage,
    });

    const savedMessage = await newMessage.save();
    // Trigger global chat
    await pusherServer.trigger("global-chat", "new-message", savedMessage);

    return NextResponse.json(savedMessage, { status: 201 });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  await dbConnect();

  try {
    const messages = await Message.find().sort({ createdAt: -1 });

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
