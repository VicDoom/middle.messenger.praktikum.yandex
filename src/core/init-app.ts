import { ChatsController, ResourcesController } from "../controllers";
import { AuthController } from "../controllers/auth-controller";
import { Router } from "./Router";

const initApp = async () => {
  let me = null;
  const router = new Router();
  const currentLocation = location.pathname;
  try {
    me = await AuthController.getUser();
  } catch (error) {
    if (currentLocation !== "/sign-up") {
      router.go("/");
      return;
    }
    router.go(currentLocation);
    return;
  }

  await ChatsController.getChats();
  window.store.set({ user: me });

  await ResourcesController.getAvatar(me.avatar);
  router.go(currentLocation);
};

export {
  initApp,
  // initChatPage,
};
