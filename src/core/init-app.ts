import { ChatsController, ResourcesController } from "../controllers";
import { AuthController } from "../controllers/auth-controller";
import { Router } from "./Router";

const initApp = async () => {
  let me = null;
  const router = new Router();
  try {
    me = await AuthController.getUser();
  } catch (error) {
    router.go("/login");
    return;
  }

  await ChatsController.getChats();
  window.store.set({ user: me });

  await ResourcesController.getAvatar(me.avatar);
  
  const currentLocation = location.pathname;
  router.go(currentLocation);
};

// const initChatPage = async () => {
//   const chats = await getChats();
//   window.store.set({chats});
// }

export {
  initApp,
  // initChatPage,
};
