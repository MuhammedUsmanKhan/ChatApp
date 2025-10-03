import { MessageBubble } from "./MessageBubble"

interface Message {
  id: string
  text: string
  isOwn?: boolean
  time?: string
}

interface MessageListProps {
  messages: Message[]
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="flex flex-col gap-1 p-3 overflow-y-auto h-[calc(100vh-150px)]">
      {messages.map((msg) => (
        <MessageBubble
          key={msg.id}
          message={msg.text}
          isOwn={msg.isOwn}
          time={msg.time}
        />
      ))}
    </div>
  )
}
