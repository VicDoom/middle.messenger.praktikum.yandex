import { AuthController } from "../controllers/auth-controller";
import { Router } from "./Router";

const initApp = async () => {
  let me = null;
  const router = new Router();
  try {
    me = await AuthController.getUser();
  } catch (error) {
    router.go('/login');
    return;
  }

  // const chats = await getChats();
  // window.store.set({user: me, chats});
  window.store.set({user: me});

  router.go('/profile');
}

// const initChatPage = async () => {
//   const chats = await getChats();
//   window.store.set({chats});
// }

export {
  initApp,
  // initChatPage,
}