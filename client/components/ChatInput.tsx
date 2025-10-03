// import { useState } from "react";
// import { useChat } from "@/hooks/useChats";
// import { useChatStore } from "@/store/chatStore";
// import socket from "@/lib/socket";

// export function ChatInput() {
//   const { selectedChatId } = useChatStore();
//   const { createMessage } = useChat(selectedChatId || undefined);
//   const [text, setText] = useState("");

//   if (!selectedChatId) return null;

//   const handleSend = async () => {
//     if (!text.trim()) return;
//     await createMessage({ chatId: selectedChatId, content: text });
//     socket.emit("sendMessage", { chatId: selectedChatId, content: text });
//     setText("");
//   };

//   return (
//     <div className="p-2 flex border-t">
//       <input
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Type a message..."
//         className="flex-1 border rounded p-2"
//       />
//       <button
//         onClick={handleSend}
//         className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
//       >
//         Send
//       </button>
//     </div>
//   );
// }
