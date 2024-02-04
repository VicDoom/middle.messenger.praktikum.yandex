export interface IChatElement {
  id: string,
  user: string,
  message: string,
  isLastMessageYours: boolean,
  date: Date,
  messageNumber: number,
};

export interface IChatMessage {
  id: number;
  message: string;
  date: Date;
  isYours: boolean;
}

export interface ICurrentChat {
  id: number;
  user: string;
  messages: IChatMessage[];
}

// новые интерфейсы
export type AppState = {
  error: string | null,
  user: User | null,
  isOpenEditAvatarModal: boolean,
  chats: Chat[],
  selectedChat: SelectedChat | null,
  avatarHref?: string,
}

export type SelectedChat = {
  id: number;
  title: string;
  token: string;
}

export type User = {
  id: number;
  login: string;
  firstName: string;
  secondName: string;
  displayName: string;
  avatar: string;
  phone: string;
  email: string;
};

type LastMessage = {
  user: User,
  time: string,
  content: string
}

export type Chat = {
  id: number,
  title: string,
  avatar: Nullable<string>,
  unreadCount: number,
  lastMessage: LastMessage | null
}
