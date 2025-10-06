export enum ChatEventType {
  NEW_MESSAGE = 'NEW_MESSAGE',
  MESSAGE_DELETED = 'MESSAGE_DELETED',
  TYPING_START = 'TYPING_START',
  TYPING_STOP = 'TYPING_STOP',
  USER_JOINED = 'USER_JOINED',
  USER_LEFT = 'USER_LEFT',
  ROOM_UPDATED = 'ROOM_UPDATED'
}

export enum ChatClientEvents {
  SEND_MESSAGE = 'send_message',
  JOIN_ROOM = 'join_room',
  LEAVE_ROOM = 'leave_room',
  TYPING_START = 'typing_start',
  TYPING_STOP = 'typing_stop',
  DELETE_MESSAGE = 'delete_message'
}

export class NewMessageEvent {
  eventType: ChatEventType.NEW_MESSAGE;
  payload: {
    message: any;
    roomId: string;
    timestamp: Date;
  };
}

export class TypingEvent {
  eventType: ChatEventType.TYPING_START | ChatEventType.TYPING_STOP;
  payload: {
    userId: string;
    roomId: string;
    userName: string;
  };
}

export class UserRoomEvent {
  eventType: ChatEventType.USER_JOINED | ChatEventType.USER_LEFT;
  payload: {
    userId: string;
    roomId: string;
    userName: string;
    timestamp: Date;
  };
}