import { Input } from "../../components/input";
import { Block } from "../../core/Block";
import { Validator } from "../../helpers/validator";
import { DEFAULT_PROPS, Router } from "../../core/Router";
import { UserController } from "../../controllers";
import { ErrorMessage } from "../../components/error-message";
import connect from "../../utils/connect";
import { UserDTO } from "../../api/types";
import { AvatarModal } from "../profile/components/AvatarModal/avatar-modal";

type IProfileEditFieldsPageRefs = {
    email: Input
    login: Input
    first_name: Input
    second_name: Input
    display_name: Input
    phone: Input
    error: ErrorMessage
    avatarModal: AvatarModal
}

class ProfileEditFieldsPage extends Block<{}, IProfileEditFieldsPageRefs> {
  constructor(props: UserDTO) {
    const router = new Router(DEFAULT_PROPS);
    super({
      ...props,
      navigateBack: () => router.go("/profile"),
      onSave: () => {
        const editUser = {
          email: this.refs.email.value()!,
          login: this.refs.login.value()!,
          first_name: this.refs.first_name.value()!,
          second_name: this.refs.second_name.value()!,
          display_name: this.refs.display_name.value()!,
          phone: this.refs.phone.value()!,
        };
        if (!(
          !Validator.login(editUser.login) && 
          !Validator.email(editUser.email) &&
          !Validator.name(editUser.first_name) && 
          !Validator.name(editUser.second_name) && 
          !Validator.displayName(editUser.display_name) &&
          !Validator.phone(editUser.phone)
        )) {
          return;
        }
        UserController.editProfile(editUser).catch(error => this.refs.error.setProps({ error }));
      },
      validateLogin: Validator.login,
      validateName: Validator.name,
      validateDisplayName: Validator.displayName,
      validateEmail: Validator.email,
      validatePhone: Validator.phone,
      openAvatarModal: () => window.store.set({ isOpenEditAvatarModal: true }),
      closeAvatarModal: () => window.store.set({ isOpenEditAvatarModal: false }),
      onSaveAvatar: () => UserController.editAvatar()
        .then(() => window.store.set({ isOpenEditAvatarModal: false }))
        .catch(error => this.refs.avatarModal.setError(error)),
    });
  }

  protected render(): string {
    return (`
        <div class="profile-page profile-page--edit-fields">
            {{{ ButtonBack onClick=navigateBack }}}
            {{#> CenterLayout}}
                <div class="profile-page__content">
                    <div class="profile-page__avatar">
                      {{{ AvatarButton onClick=openAvatarModal }}}
                    </div>
                    <form class="profile-page__form" id="profile-edit-fields-page">
                      <div class="profile-page__inputs">
                      {{{ Input 
                          label="Почта" 
                          value=user.email
                          id="email"
                          ref="email"
                          placeholder="введите почту"
                          styleType="profile"
                          validate=validateEmail
                      }}}
                      {{{ Input 
                          label="Логин" 
                          value=user.login
                          id="login"
                          ref="login"
                          placeholder="введите логин"
                          styleType="profile"
                          validate=validateLogin
                      }}}
                      {{{ Input 
                          label="Имя" 
                          value=user.firstName
                          id="first_name"
                          ref="first_name"
                          placeholder="введите имя"
                          styleType="profile"
                          validate=validateName
                      }}}
                      {{{ Input 
                          label="Фамилия" 
                          value=user.secondName
                          id="second_name"
                          ref="second_name"
                          placeholder="введите фамилию"
                          styleType="profile"
                          validate=validateName
                      }}}
                      {{{ Input 
                          label="Имя в чате" 
                          value=user.displayName
                          id="displayName"
                          ref="display_name"
                          placeholder="введите имя"
                          styleType="profile"
                          validate=validateDisplayName
                      }}}
                      {{{ Input 
                          label="Телефон" 
                          value=user.phone
                          id="phone"
                          ref="phone"
                          placeholder="введите номер телефона"
                          styleType="profile"
                          validate=validatePhone
                      }}}
                      </div>
                      <div class="profile-page__buttons">
                        {{{ ErrorMessage ref="error" error=error }}}
                        {{{ Button
                            label="Сохранить"
                            onClick=onSave
                            action="submit"
                            form="profile-edit-fields-page"
                        }}}
                      </div>
                    </form>
                </div>
            {{/CenterLayout}}
            {{{ AvatarModal onSave=onSaveAvatar onClose=closeAvatarModal ref="avatarModal" }}}
        </div>  
      `);
  }
}

export default connect(({ user }) => ({ user }))(ProfileEditFieldsPage);
