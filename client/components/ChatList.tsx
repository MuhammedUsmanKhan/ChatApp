// import { useChat } from "@/hooks/useChats";
// import { useChatStore } from "@/store/chatStore";

// export function ChatList() {
//   const { allChats } = useChat();
//   const { setSelectedChat, selectedChatId } = useChatStore();

//   if (allChats.isLoading) return <p>Loading chats...</p>;
//   if (allChats.error) return <p>Error loading chats</p>;

//   return (
//     <div className="w-1/3 border-r p-4">
//       <h2 className="text-lg font-semibold mb-2">Chats</h2>
//       <ul>
//         {allChats.data?.map((chat) => (
//           <li
//             key={chat.id}
//             className={`p-2 cursor-pointer rounded ${
//               selectedChatId === chat.id ? "bg-gray-200" : ""
//             }`}
//             onClick={() => setSelectedChat(chat.id)}
//           >
//             {chat.isGroup ? chat.name : chat.participants.map((p) => p.user.username).join(", ")}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
