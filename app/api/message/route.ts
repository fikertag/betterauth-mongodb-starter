import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Message from "@/model/message";
import mongoose from "mongoose";
import { pusherServer } from "@/lib/pusher";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { senderId, content } = await request.json();

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
    });

    const savedMessage = await newMessage.save();

    const populatedMessage = await Message.aggregate([
      { $match: { _id: savedMessage._id } }, // Only the new message
      {
        $lookup: {
          from: "user",
          localField: "senderId",
          foreignField: "_id",
          as: "senderInfo",
        },
      },
      {
        $unwind: {
          path: "$senderInfo",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          senderId: 1,
          content: 1,
          createdAt: 1,
          senderName: "$senderInfo.name",
          senderImage: "$senderInfo.image",
        },
      },
    ]);
    // Trigger global chat
    await pusherServer.trigger(
      "global-chat",
      "new-message",
      populatedMessage[0]
    );

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

  const messages = await Message.aggregate([
    { $sort: { createdAt: 1 } },
    {
      $lookup: {
        from: "user",
        localField: "senderId",
        foreignField: "_id",
        as: "senderInfo",
      },
    },
    {
      $unwind: {
        path: "$senderInfo",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        _id: 1,
        senderId: 1,
        content: 1,
        createdAt: 1,
        senderName: "$senderInfo.name",
        senderImage: "$senderInfo.image",
      },
    },
  ]);

  return NextResponse.json(messages);
}
