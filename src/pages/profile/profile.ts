import { Button } from "../../components/button";
import { Block } from "../../core/Block";
import { Validator } from "../../helpers";
import { DEFAULT_PROPS, Router } from "../../core/Router";
import connect from "../../utils/connect";
import { UserDTO } from "../../api/types";
import { AuthController, UserController } from "../../controllers";

const DEFAULT_USER_NAME = "Имя в чате не определено";

type IProfilePageRefs = {
  avatarModal: any
  getAvatarButton: Button
}

class ProfilePage extends Block<{}, IProfilePageRefs> {
  constructor(props: UserDTO) {
    const router = new Router(DEFAULT_PROPS);
    super({
      ...props,
      navigateProfileEditPage: () => router.go("/profile/edit-fields"),
      navigatePasswordEditPage: () => router.go("/profile/edit-password"),
      navigatePage404: () => router.go("/page-404"),
      navigatePage500: () => router.go("/page-500"),
      navigateChat: () => router.go("/chats"),
      validateLoginField: (value: string) => Validator.login(value),
      openAvatarModal: () => window.store.set({ isOpenEditAvatarModal: true }),
      closeAvatarModal: () => window.store.set({ isOpenEditAvatarModal: false }),
      onSaveAvatar: () => UserController.editAvatar()
        .then(() => window.store.set({ isOpenEditAvatarModal: false }))
        .catch(error => this.refs.avatarModal.setError(error)),
      navigateLogOut: () => AuthController.logout(),
    });
  }

  protected render(): string {
    const displayName = window.store.getState().user?.displayName ?? DEFAULT_USER_NAME;
    return (`
      <div class="profile-page">
        {{{ ButtonBack onClick=navigateChat }}}
            {{#> CenterLayout}}
                <div class="profile-page__content">
                    <div class="profile-page__avatar">
                        {{{ AvatarButton onClick=openAvatarModal }}}
                        <div class="profile-page__avatar-name">
                            ${ displayName }
                        </div>
                    </div>
                    <div class="profile-page__inputs">
                        {{{ Input 
                            label="Почта" 
                            value=user.email
                            id="email"
                            placeholder="-"
                            styleType="profile"
                            disabled="true"
                        }}}
                        {{{ Input 
                            label="Логин" 
                            value=user.login
                            id="login"
                            ref="login"
                            placeholder="-"
                            styleType="profile"
                            validate=validateLoginField
                            disabled="true"
                        }}}
                        {{{ Input 
                            label="Имя" 
                            value=user.firstName
                            id="first_name"
                            placeholder="-"
                            styleType="profile"
                            disabled="true"
                        }}}
                        {{{ Input 
                            label="Фамилия" 
                            value=user.secondName
                            id="second_name"
                            placeholder="-"
                            styleType="profile"
                            disabled="true"
                        }}}
                        {{{ Input 
                            label="Имя в чате" 
                            value=user.displayName
                            id="display_name"
                            placeholder="-"
                            styleType="profile"
                            disabled="true"
                        }}}
                        {{{ Input 
                            label="Телефон" 
                            value=user.phone
                            id="phone"
                            placeholder="-"
                            styleType="profile"
                            disabled="true"
                        }}}
                    </div>
                    <div class="profile-page__buttons">
                        {{{ Button
                            type="link"
                            label="Изменить данные"
                            onClick=navigateProfileEditPage
                        }}}
                        {{{ Divider }}}
                        {{{ Button
                            type="link"
                            label="Изменить пароль"
                            onClick=navigatePasswordEditPage
                        }}}
                        {{{ Divider }}}
                        {{{ Button
                            type="link"
                            label="Выйти"
                            color="red"
                            onClick=navigateLogOut
                        }}}
                        {{{ Divider }}}
                    </div>
                </div>
            {{/CenterLayout}}
            {{{ AvatarModal onSave=onSaveAvatar onClose=closeAvatarModal ref="avatarModal" }}}
        </div>
      `);
  }
}

export default connect(({ user, avatarHref }) => ({ user, avatarHref }))(ProfilePage);
