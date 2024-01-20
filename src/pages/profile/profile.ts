import { Button } from "../../components/button";
import { AvatarModal } from "./components";
import { Block } from "../../core/Block";
import { navigate } from "../../core/navigate";
import { Validator } from "../../helpers";
import { USER_INFO } from "../../mocks";

type IProfilePageRefs = {
  changeAvatarModal: AvatarModal
  getAvatarButton: Button
}

export class ProfilePage extends Block<{}, IProfilePageRefs> {
  constructor() {
    super({
      navigateProfileEditPage: () => navigate("profile-edit-fields"),
      navigatePasswordEditPage: () => navigate("profile-edit-password"),
      navigatePage404: () => navigate("page404"),
      navigatePage500: () => navigate("page500"),
      navigateChat: () => navigate("chat"),
      navigateLoginPage: () => navigate("login"),
      validateLoginField: (value: string) => Validator.login(value),
      openAvatarModal: () => this.refs.changeAvatarModal.show(),
      closeAvatarModal: () => this.refs.changeAvatarModal.hide(),
    });
  }

  protected render(): string {
    return (`
      <div class="profile-page">
        {{{ ButtonBack onClick=navigateChat }}}
            {{#> CenterLayout}}
                <div class="profile-page__content">
                    <div class="profile-page__avatar">
                        {{{ AvatarButton onClick=openAvatarModal }}}
                        <div class="profile-page__avatar-name">
                            ${USER_INFO.first_name}
                        </div>
                    </div>
                    <div class="profile-page__inputs">
                        {{{ Input 
                            label="Почта" 
                            value="${USER_INFO.email}"
                            id="email"
                            placeholder="введите почту"
                            styleType="profile"
                            disabled="true"
                        }}}
                        {{{ Input 
                            label="Логин" 
                            value="${USER_INFO.login}"
                            id="login"
                            ref="login"
                            placeholder="введите логин"
                            styleType="profile"
                            validate=validateLoginField
                            disabled="true"
                        }}}
                        {{{ Input 
                            label="Имя" 
                            value="${USER_INFO.first_name}"
                            id="first_name"
                            placeholder="введите имя"
                            styleType="profile"
                            disabled="true"
                        }}}
                        {{{ Input 
                            label="Фамилия" 
                            value="${USER_INFO.second_name}"
                            id="second_name"
                            placeholder="введите фамилию"
                            styleType="profile"
                            disabled="true"
                        }}}
                        {{{ Input 
                            label="Имя в чате" 
                            value="${USER_INFO.display_name}"
                            id="display_name"
                            placeholder="введите имя"
                            styleType="profile"
                            disabled="true"
                        }}}
                        {{{ Input 
                            label="Телефон" 
                            value="${USER_INFO.phone}"
                            id="phone"
                            placeholder="введите номер телефона"
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
                            onClick=navigateLoginPage
                        }}}
                        {{{ Divider }}}
                        <div>Временные кнопки для перехода на 404 и 500 страницы, будут удалены после ревью</div>
                        {{{ Divider }}}
                        {{{ Button
                            type="link"
                            label="404 ошибка"
                            color="red"
                            onClick=navigatePage404
                        }}}
                        {{{ Divider }}}
                        {{{ Button
                            type="link"
                            label="500 ошибка"
                            color="red"
                            onClick=navigatePage500
                        }}}
                    </div>
                </div>
            {{/CenterLayout}}
            {{{ AvatarModal ref="changeAvatarModal" }}}
        </div>
      `);
  }
}
