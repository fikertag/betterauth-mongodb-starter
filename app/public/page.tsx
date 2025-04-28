// app/chat/page.tsx
"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

export default function ChatPage() {
  const [message, setMessage] = useState("");

  return (
    <div
      style={{ height: "calc(100vh - 57px)" }}
      className="flex flex-col max-w-3xl mx-auto container p-4"
    >
      {/* Chat Messages */}
      <ScrollArea
        className="flex-1 rounded-md border p-4 mb-4"
        style={{ height: "400px" }}
      >
        <div className="flex flex-col gap-6">
          {/* Example Message 1 (incoming) */}
          <div className="flex items-end gap-3">
            <Avatar>
              <AvatarImage src="/user1.jpg" alt="@user1" />
              <AvatarFallback>U1</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-end gap-2 mb-1">
                <span className="font-medium text-sm">Alice</span>
                <span className="text-xs text-muted-foreground">1d ago</span>
              </div>
              <div className="bg-green-900 text-white px-3 py-2 text-sm rounded-md max-w-xs">
                Hello everyone! 👋
              </div>
            </div>
          </div>

          {/* Example Message 2 (outgoing) */}
          <div className="flex items-end justify-end gap-3">
            <div className="text-right">
              <div className="flex justify-end items-end gap-2 mb-1">
                <span className="text-xs text-muted-foreground">3min ago</span>
                <span className="font-medium text-sm">You</span>
              </div>
              <div className="bg-blue-500 text-white px-3 py-2 text-sm rounded-md max-w-xs ml-auto">
                Hi Alice! 👋 I'm good!
              </div>
            </div>
            <Avatar>
              <AvatarImage src="/your-avatar.jpg" alt="@you" />
              <AvatarFallback>Y</AvatarFallback>
            </Avatar>
          </div>

          {/* Example Message 3 (incoming) */}
          <div className="flex items-end gap-3">
            <Avatar>
              <AvatarImage src="/user2.jpg" alt="@user2" />
              <AvatarFallback>U2</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-end gap-2 mb-1">
                <span className="font-medium text-sm">Bob</span>
                <span className="text-xs text-muted-foreground">2min ago</span>
              </div>
              <div className="bg-green-900 text-white px-3 py-2 text-sm rounded-md max-w-xs">
                Same here! 👌
              </div>
            </div>
          </div>
          <div className="flex items-end gap-3">
            <Avatar>
              <AvatarImage src="/user2.jpg" alt="@user2" />
              <AvatarFallback>U2</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-end gap-2 mb-1">
                <span className="font-medium text-sm">Bob</span>
                <span className="text-xs text-muted-foreground">2min ago</span>
              </div>
              <div className="bg-green-900 text-white px-3 py-2 text-sm rounded-md max-w-xs">
                Same here! 👌
              </div>
            </div>
          </div>
          <div className="flex items-end gap-3">
            <Avatar>
              <AvatarImage src="/user2.jpg" alt="@user2" />
              <AvatarFallback>U2</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-end gap-2 mb-1">
                <span className="font-medium text-sm">Bob</span>
                <span className="text-xs text-muted-foreground">2min ago</span>
              </div>
              <div className="bg-green-900 text-white px-3 py-2 text-sm rounded-md max-w-xs">
                Same here! 👌
              </div>
            </div>
          </div>
          <div className="flex items-end gap-3">
            <Avatar>
              <AvatarImage src="/user2.jpg" alt="@user2" />
              <AvatarFallback>U2</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-end gap-2 mb-1">
                <span className="font-medium text-sm">Bob</span>
                <span className="text-xs text-muted-foreground">2min ago</span>
              </div>
              <div className="bg-green-900 text-white px-3 py-2 text-sm rounded-md max-w-xs">
                Same here! 👌
              </div>
            </div>
          </div>
          <div className="flex items-end gap-3">
            <Avatar>
              <AvatarImage src="/user2.jpg" alt="@user2" />
              <AvatarFallback>U2</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm">Bob</span>
                <span className="text-xs text-muted-foreground">2min ago</span>
              </div>
              <div className="bg-green-900 text-white px-3 py-2 text-sm rounded-md max-w-xs">
                Same here! 👌
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Chat Input */}
      <form className="flex items-end gap-2">
        <Input
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
}
