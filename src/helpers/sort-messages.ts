import { Message } from "../types";

export const sortMessages = (messages: Message[]) => {
  const compareFunc = (a: string, b: string) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    if (dateA > dateB) {
      return 1;
    }
    if (dateA < dateB) {
      return -1;
    }
    return 0;
  };
  return messages.sort((a, b) => compareFunc(a.time, b.time));
};
