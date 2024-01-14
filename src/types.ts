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
