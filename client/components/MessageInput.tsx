"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Paperclip, Smile } from "lucide-react"

interface MessageInputProps {
  onSend: (message: string) => void
}

export function MessageInput({ onSend }: MessageInputProps) {
  const [text, setText] = useState("")

  const handleSend = () => {
    if (text.trim() !== "") {
      onSend(text)
      setText("")
    }
  }

  return (
    <div className="flex items-center gap-2 p-3 border-t">
      <Button variant="ghost" size="icon">
        <Paperclip className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon">
        <Smile className="h-5 w-5" />
      </Button>
      <Input
        placeholder="Type a message..."
        className="flex-1"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <Button onClick={handleSend} size="icon">
        <Send className="h-5 w-5" />
      </Button>
    </div>
  )
}
