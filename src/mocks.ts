const USER_INFO = {
  email: "soup@mail.ru",
  login: "Nikita",
  first_name: "Никита",
  second_name: "Кушнарёв",
  display_name: "Никита",
  phone: "+78005553535",
};

const CHAT_ELEMENTS = [
  {
    id: "chat_0",
    user: "Андрей",
    message: "Hello!",
    isLastMessageYours: false,
    date: new Date("2023-12-24T12:12:12"),
    messageNumber: 0,
  },
  {
    id: "chat_1",
    user: "Киноклуб",
    message: "И тебе привет",
    isLastMessageYours: true,
    date: new Date("2023-12-24T12:12:12"),
    messageNumber: 3,
  },
  {
    id: "chat_2",
    user: "Илья",
    message: "Твой сайт самый лучший, и ревьюер обязательно тебе об этом скажет! Кстати, передаю привет маме!",
    isLastMessageYours: false,
    date: new Date("2023-12-24T12:12:12"),
    messageNumber: 2,
  },
  {
    id: "chat_3",
    user: "Андрей",
    message: "Hello!",
    isLastMessageYours: false,
    date: new Date("2023-12-24T12:12:12"),
    messageNumber: 0,
  },
  {
    id: "chat_4",
    user: "Киноклуб",
    message: "И тебе привет",
    isLastMessageYours: true,
    date: new Date("2023-12-24T12:12:12"),
    messageNumber: 3,
  },
  {
    id: "chat_5",
    user: "Андрей",
    message: "Hello!",
    isLastMessageYours: false,
    date: new Date("2023-12-24T12:12:12"),
    messageNumber: 0,
  },
  {
    id: "chat_6",
    user: "Киноклуб",
    message: "И тебе привет",
    isLastMessageYours: true,
    date: new Date("2023-12-24T12:12:12"),
    messageNumber: 3,
  },
  {
    id: "chat_7",
    user: "Андрей",
    message: "Hello!",
    isLastMessageYours: false,
    date: new Date("2023-12-24T12:12:12"),
    messageNumber: 0,
  },
  {
    id: "chat_8",
    user: "Киноклуб",
    message: "И тебе привет",
    isLastMessageYours: true,
    date: new Date("2023-12-24T12:12:12"),
    messageNumber: 3,
  },
  {
    id: "chat_9",
    user: "Андрей",
    message: "Hello!",
    isLastMessageYours: false,
    date: new Date("2023-12-24T12:12:12"),
    messageNumber: 0,
  },
  {
    id: "chat_10",
    user: "Киноклуб",
    message: "И тебе привет",
    isLastMessageYours: true,
    date: new Date("2023-12-24T12:12:12"),
    messageNumber: 3,
  },
  {
    id: "chat_11",
    user: "Андрей",
    message: "Hello!",
    isLastMessageYours: false,
    date: new Date("2023-12-24T12:12:12"),
    messageNumber: 0,
  },
  {
    id: "chat_12",
    user: "Киноклуб",
    message: "И тебе привет",
    isLastMessageYours: true,
    date: new Date("2023-12-24T12:12:12"),
    messageNumber: 3,
  },
];

const CURRENT_CHAT = {
  id: 0,
  user: "Тайлер Дерден",
  messages: [
    {
      id: 0, 
      message: "Привет, как дела?",
      date: new Date("2023-12-24T12:12:00"),
      isYours: false,
    },
    {
      id: 1, 
      message: "все хорошо, дом недавно сгорел",
      date: new Date("2023-12-24T12:12:10"),
      isYours: true,
    }, 
    {
      id: 2, 
      message: "могу предложить расслабиться и сварить немного мыла",
      date: new Date("2023-12-24T12:13:00"),
      isYours: false,
    },
    {
      id: 3, 
      message: `Нет, вместо этого лучше вставить эти великие строки: Lorem ipsum
       dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
       ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
       exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
       Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
       fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
       qui officia deserunt mollit anim id est laborum Lorem ipsum
       dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
       ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
       exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
       Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
       fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
       qui officia deserunt mollit anim id est laborum Lorem ipsum
       dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
       ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
       exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
       Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
       fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
       qui officia deserunt mollit anim id est laborum Lorem ipsum
       dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
       ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
       exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
       Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
       fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
       qui officia deserunt mollit anim id est laborum Lorem ipsum
       dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
       ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
       exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
       Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
       fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
       qui officia deserunt mollit anim id est laborum Lorem ipsum
       dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
       ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
       exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
       Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
       fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
       qui officia deserunt mollit anim id est laborum Lorem ipsum`,
      date: new Date("2023-12-24T12:13:10"),
      isYours: true,
    },
    {
      id: 4, 
      message: "Красиво сказано",
      date: new Date("2023-12-24T12:14:00"),
      isYours: false,
    },
    {
      id: 5, 
      message: "тогда увидимся через пару минут!",
      date: new Date("2023-12-24T12:14:30"),
      isYours: false,
    },
  ],
};

export { USER_INFO, CHAT_ELEMENTS, CURRENT_CHAT };
