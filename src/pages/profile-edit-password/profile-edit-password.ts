import { Input } from "../../components/input";
import { Block, IProps } from "../../core/Block";
import { navigate } from "../../core/navigate";
import { Validator } from "../../helpers/validator";

type IProfileEditPasswordPageRefs = {
  old_password: Input
  new_password: Input
  repeat_new_password: Input
}

export class ProfileEditPasswordPage extends Block<{}, IProfileEditPasswordPageRefs> {
  constructor() {
    super({
      navigateBack: () => navigate("profile"),
      onSave: () => {
        const oldPassword = this.refs.old_password.value();
        const newPassword = this.refs.new_password.value();
        const repeatNewPassword = this.refs.repeat_new_password.value();
        if (!(
          !Validator.password(oldPassword)
          && !Validator.password(newPassword)
          && !Validator.password(repeatNewPassword)
          && !Validator.repeatPassword(newPassword, repeatNewPassword)
        )) {
          return;
        }
        console.log({ oldPassword, newPassword, repeatNewPassword });
        navigate("profile");
      },
      validatePassword: Validator.password,
      validateRepeatPassword: (value: string) => { 
        const validatorError = Validator.password(value);
        if (validatorError) return validatorError;
        const checkRepeatPasswordsError = Validator.repeatPassword(value, this.refs.new_password.value());
        if (checkRepeatPasswordsError) return checkRepeatPasswordsError;
        return false;
      },
    });
  };

  protected render(): string {
    return (`
      <div class="profile-page profile-page--edit-password">
        {{{ ButtonBack onClick=navigateBack }}}
        {{#> CenterLayout}}
            <div class="profile-page__content">
                <div class="profile-page__avatar">
                    <div class="profile-page__avatar-image">
                        <img src={{icons "icon-avatar"}} alt="avatar">
                    </div>
                </div>
                <div class="profile-page__inputs">
                    {{{ Input 
                        label="Старый пароль" 
                        id="old_password"
                        ref="old_password"
                        placeholder="введите старый пароль"
                        styleType="profile"
                        type="password"
                        validate=validatePassword
                    }}}
                    {{{ Input
                        label="Новый пароль" 
                        id="new_password"
                        ref="new_password"
                        placeholder="введите новый пароль"
                        styleType="profile"
                        type="password"
                        validate=validatePassword
                    }}}
                    {{{ Input
                        label="Новый пароль еще раз" 
                        id="repeat_new_password"
                        ref="repeat_new_password"
                        placeholder="повторите новый пароль"
                        styleType="profile"
                        type="password"
                        validate=validateRepeatPassword
                    }}}
                </div>
                <div class="profile-page__buttons">
                    {{{ Button
                        label="Сохранить"
                        onClick=onSave
                    }}}
                </div>
            </div>
        {{/CenterLayout}}
      </div>
    `);
  }
}
