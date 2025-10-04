"use client"

import { ChatHeader } from "@/components/ChatHeader"
import { MessageInput } from "@/components/MessageInput"
import { MessageList } from "@/components/MessageList"
import { useState } from "react"

export function ChatContainer() {
  const [messages, setMessages] = useState([
    { id: "1", text: "Hey there!", isOwn: false, time: "12:30" },
    { id: "2", text: "Hi! How’s it going?", isOwn: true, time: "12:31" },
  ])

  const handleSend = (message: string) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), text: message, isOwn: true, time: "12:32" },
    ])
  }

  return (
    // <div className="flex-1 border-8">
    //   <ChatHeader username="Ali Khan" status="Online" />
    //   <MessageList messages={messages} />
    //   <MessageInput onSend={handleSend} />
    // </div>
    <></>
  )
}
