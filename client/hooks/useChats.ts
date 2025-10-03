// // src/hooks/useChat.ts
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// // import {
// //   fetchChats,
// //   fetchMessages,
// //   sendMessage,
// // } from "@/services/chatApi";
// // import {
// //   ChatsResponse,
// //   MessagesResponse,
// //   MessageResponse,
// //   SendMessageInput
// // } from "@/types/chat";
// import socket from "@/lib/socket";
// import { useEffect } from "react";
// import {
//   ChatsResponse,
//   MessageResponse,
//   MessagesResponse,
//   SendMessageInput,
// } from "@/types/chats";
// import api from "@/services/api";

// export const useChat = (chatId?: string) => {
//   const queryClient = useQueryClient();

//   // All chats
//   const allChats = useQuery<ChatsResponse, Error>({
//     queryKey: ["chats"],
//     queryFn: async (): Promise<ChatsResponse> => {
//       const res = await api.get<ChatsResponse>("/chats");
//       return res.data;
//     },
//   });

  
//   // Messages in selected chat
//   const messages = useQuery<MessagesResponse, Error>({
//     queryKey: ["messages", chatId],
//     queryFn: async (): Promise<MessagesResponse> => {
//       const res = await api.get<MessagesResponse>(`/chats/${chatId}/messages`);
//       return res.data;
//     },
//     enabled: !!chatId,
//   });

//   // Send message mutation
//   const createMessage = useMutation<MessageResponse, Error, SendMessageInput>({
//     mutationFn: async ({
//       chatId,
//       content,
//     }: SendMessageInput): Promise<MessageResponse> => {
//       const res = await api.post<MessageResponse>(`/chats/${chatId}/messages`, {
//         content,
//       });
//       return res.data;
//     },
//     onSuccess: async (msg) => {
//       await queryClient.invalidateQueries({
//         queryKey: ["messages", msg.chatId],
//       });
//       await queryClient.invalidateQueries({ queryKey: ["chats"] });
//     },
//   });

//   // Real-time listener
//   useEffect(() => {
//     if (!chatId) return;

//     socket.on("newMessage", (message: MessageResponse) => {
//       if (message.chatId === chatId) {
//         queryClient.setQueryData<MessagesResponse>(
//           ["messages", chatId],
//           (old) => (old ? [...old, message] : [message])
//         );
//       }
//       // Update chats preview
//       queryClient.invalidateQueries({ queryKey: ["chats"] });
//     });

//     return () => {
//       socket.off("newMessage");
//     };
//   }, [chatId, queryClient]);

//   return {
//     allChats,
//     messages,
//     createMessage: createMessage.mutateAsync,
//   };
// };



// //   export const fetchChats = async (): Promise<ChatsResponse> => {
//   //   const res = await api.get<ChatsResponse>("/chats");
//   //   return res.data;
//   // };

//   // export const fetchMessages = async (
//   //   chatId: string
//   // ): Promise<MessagesResponse> => {
//   //   const res = await api.get<MessagesResponse>(`/chats/${chatId}/messages`);
//   //   return res.data;
//   // };

//   // export const sendMessage = async ({
//   //   chatId,
//   //   content,
//   // }: SendMessageInput): Promise<MessageResponse> => {
//   //   const res = await api.post<MessageResponse>(
//   //     `/chats/${chatId}/messages`,
//   //     { content }
//   //   );
//   //   return res.data;
//   // };