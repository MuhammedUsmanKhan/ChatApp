import { cn } from "@/lib/utils"

interface MessageBubbleProps {
  message: string
  isOwn?: boolean
  time?: string
}

export function MessageBubble({ message, isOwn, time }: MessageBubbleProps) {
  return (
    <div
      className={cn(
        "flex flex-col max-w-xs md:max-w-md rounded-2xl px-3 py-2 text-sm shadow-sm mb-2",
        isOwn
          ? "ml-auto bg-primary text-primary-foreground"
          : "mr-auto bg-muted"
      )}
    >
      <span>{message}</span>
      {time && (
        <span
          className={cn(
            "text-[10px] mt-1 self-end",
            isOwn ? "text-primary-foreground/70" : "text-muted-foreground"
          )}
        >
          {time}
        </span>
      )}
    </div>
  )
}
