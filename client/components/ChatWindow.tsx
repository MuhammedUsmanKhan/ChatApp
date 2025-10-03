"use client";
import { Message, User } from "@/types/chats";
import { useState } from "react";
import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";

// Mock data - replace with your actual data
const mockUser: User = {
  id: "2",
  username: "John Doe",
  email: "john@example.com",
  isOnline: true,
};

const mockMessages: Message[] = [
  {
    id: "1",
    content: "Hey there! How are you doing?",
    senderId: "2",
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: "2",
    content: "I'm good! Just working on this new chat app with shadcn/ui.",
    senderId: "1",
    timestamp: new Date(Date.now() - 3500000),
  },
  {
    id: "3",
    content: "That sounds awesome! The components look really clean.",
    senderId: "2",
    timestamp: new Date(Date.now() - 3400000),
  },
  {
    id: "4",
    content: "Thanks! I'm really happy with how it's turning out.",
    senderId: "1",
    timestamp: new Date(Date.now() - 3300000),
  },
];

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [isTyping, setIsTyping] = useState(false);
  const currentUserId = "1"; // This would come from your auth

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      senderId: currentUserId,
      timestamp: new Date(),
      status: "sending",
    };

    setMessages((prev) => [...prev, newMessage]);

    // Simulate message delivery
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: "sent" } : msg
        )
      );
    }, 1000);
  };

  const handleTyping = (typing: boolean) => {
    setIsTyping(typing);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <ChatHeader user={mockUser} isOnline={mockUser.isOnline || false} />
      <MessageList
        messages={messages}
        currentUserId={currentUserId}
        isTyping={isTyping}
      />
      <MessageInput
        onSendMessage={handleSendMessage}
        onTyping={handleTyping}
      />
    </div>
  );
}