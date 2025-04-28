"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { useMessages } from "@/context/Message";
import { authClient } from "@/lib/auth-client";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const { messages, sendMessage } = useMessages();
  const { data: session } = authClient.useSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;
    await sendMessage(message.trim());
    setMessage("");
  };

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
          {messages.map((msg) => {
            const isCurrentUser = msg.senderId._id === session?.user.id;

            return (
              <div
                key={msg._id}
                className={`flex items-end gap-3 ${
                  isCurrentUser ? "justify-end" : ""
                }`}
              >
                {!isCurrentUser && (
                  <Avatar>
                    <AvatarImage
                      src={msg.senderId.image}
                      alt={msg.senderId.name}
                    />
                    <AvatarFallback>
                      {msg.senderId.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                )}

                <div className={`${isCurrentUser ? "text-right" : ""}`}>
                  <div className="flex items-end gap-2 mb-1">
                    {isCurrentUser ? (
                      <>
                        <span className="text-xs text-muted-foreground">
                          Just now
                        </span>
                        <span className="font-medium text-sm">You</span>
                      </>
                    ) : (
                      <>
                        <span className="font-medium text-sm">
                          {msg.senderId.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Just now
                        </span>
                      </>
                    )}
                  </div>
                  <div
                    className={`px-3 py-2 text-sm rounded-md max-w-xs ${
                      isCurrentUser
                        ? "bg-blue-500 text-white ml-auto"
                        : "bg-green-900 text-white"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>

                {isCurrentUser && (
                  <Avatar>
                    <AvatarImage
                      src={session.user.id || "/default-avatar.png"}
                      alt="@you"
                    />
                    <AvatarFallback>Y</AvatarFallback>
                  </Avatar>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Chat Input */}
      <form onSubmit={handleSubmit} className="flex items-end gap-2">
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
