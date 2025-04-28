"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { pusherClient } from "@/lib/pusher";
import { authClient } from "@/lib/auth-client";

interface Message {
  _id: string;
  senderId: {
    _id: string;
    name: string;
    image: string;
  };
  content: string;
  createdAt: string;
}

interface MessageContextType {
  messages: Message[];
  fetchMessages: () => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
}

const MessageContext = createContext<MessageContextType>({
  messages: [],
  fetchMessages: async () => {},
  sendMessage: async () => {},
});

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: session } = authClient.useSession();
  const [messages, setMessages] = useState<Message[]>([]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`/api/message`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async (content: string) => {
    try {
      if (!session?.user.id) return;
      const newMessage = {
        senderId: session?.user.id,
        content,
      };
      await axios.post("/api/message", newMessage);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Real-time updates
  useEffect(() => {
    const channel = pusherClient.subscribe(`global-chat`);
    channel.bind("new-message", (newMessage: Message) => {
      setMessages((prev) => [newMessage, ...prev]);
    });

    return () => {
      channel.unbind("new-message");
      pusherClient.unsubscribe(`global-chat`);
    };
  }, []);

  // Initial fetch
  useEffect(() => {
    if (session?.user.id) {
      fetchMessages();
    }
  }, [session?.user.id]);

  useEffect(() => {
    console.log("Messages updated:", messages);
  }, [messages]);

  return (
    <MessageContext.Provider value={{ messages, fetchMessages, sendMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessages must be used within a MessageProvider");
  }
  return context;
};
