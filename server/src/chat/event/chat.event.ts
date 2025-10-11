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
  SEND_MESSAGE = 'SEND_MESSAGE',
  JOIN_ROOM = 'JOIN_ROOM',
  LEAVE_ROOM = 'LEAVE_ROOM',
  TYPING_START = 'TYPING_START',
  TYPING_STOP = 'TYPING_STOP',
  DELETE_MESSAGE = 'DELETE_MESSAGE'
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