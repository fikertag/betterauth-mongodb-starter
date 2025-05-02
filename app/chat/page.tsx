"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";
import { useMessages } from "@/context/Message";
import { formatDistanceStrict } from "date-fns";
import { SendHorizonal } from "lucide-react";
export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const { messages, sendMessage, loading } = useMessages();
  const { data: session } = authClient.useSession();
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;
    try {
      setSending(true);
      await sendMessage(message.trim());
      setMessage("");
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-57px)]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900" />
      </div>
    );
  }

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
            const isCurrentUser = msg.senderId === session?.user.id;

            return (
              <div
                key={msg._id}
                className={`flex items-end gap-3 ${
                  isCurrentUser ? "justify-end" : ""
                }`}
              >
                {!isCurrentUser && (
                  <Avatar>
                    <AvatarImage src={msg.senderImage} alt={msg.senderName} />
                    <AvatarFallback>
                      {msg.senderName?.charAt(0).toUpperCase() || "D"}
                    </AvatarFallback>
                  </Avatar>
                )}

                <div className={`${isCurrentUser ? "text-right" : ""}`}>
                  <div
                    className={`flex items-center  ${isCurrentUser ? "justify-end" : "justify-start"} justify-end gap-2 mb-1`}
                  >
                    {isCurrentUser ? (
                      <>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceStrict(
                            new Date(msg.createdAt),
                            new Date(),
                            { addSuffix: true }
                          )}
                        </span>
                        <span className="font-medium text-sm">You</span>
                      </>
                    ) : (
                      <>
                        <span className="font-medium text-sm">
                          {msg.senderName || "deleted account"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceStrict(
                            new Date(msg.createdAt),
                            new Date(),
                            { addSuffix: true }
                          )}
                        </span>
                      </>
                    )}
                  </div>
                  <div
                    className={`px-3 py-2 text-sm rounded-md break-words ${
                      isCurrentUser
                        ? "bg-gray-900 text-white ml-auto max-w-[180px] min-[350px]:max-w-[230px] min-[450px]:max-w-[300px]  sm:max-w-[350px] w-fit"
                        : "bg-gray-700 text-white  max-w-[180px] min-[350px]:max-w-[230px] min-[450px]:max-w-[300px]  sm:max-w-[350px] w-fit"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>

                {isCurrentUser && (
                  <Avatar>
                    <AvatarImage src={msg.senderImage} alt="@you" />
                    <AvatarFallback>Y</AvatarFallback>
                  </Avatar>
                )}
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* Chat Input */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="relative flex-1">
          <Input
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={sending}
          />
        </div>

        <Button type="submit" disabled={sending || !message.trim()}>
          {sending ? (
            <div className="h-4 w-4 animate-spin border-2 border-white border-t-transparent rounded-full" />
          ) : (
            <SendHorizonal size={18} className="" />
          )}
        </Button>
      </form>
    </div>
  );
}
