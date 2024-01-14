import { Input } from "../../components/input";
import { Block } from "../../core/Block";
import { navigate } from "../../core/navigate";
import { USER_INFO } from "../../mocks";
import { Validator } from "../../helpers/validator";

type IProfileEditFieldsPageRefs = {
    email: Input
    login: Input
    first_name: Input
    second_name: Input
    display_name: Input
    phone: Input
}

export class ProfileEditFieldsPage extends Block<{}, IProfileEditFieldsPageRefs> {
  constructor() {
    super({
      navigateBack: () => navigate("profile"),
      onSave: () => {
        const email = this.refs.email.value();
        const login = this.refs.login.value();
        const first_name = this.refs.first_name.value();
        const second_name = this.refs.second_name.value();
        const display_name = this.refs.display_name.value();
        const phone = this.refs.phone.value();
        if (!(
          !Validator.login(login) && 
          !Validator.email(email) &&
          !Validator.name(first_name) && 
          !Validator.name(second_name) && 
          !Validator.displayName(display_name) &&
          !Validator.phone(phone)
        )) {
          return;
        }
        console.log({
          email, login, first_name, second_name, display_name, phone,
        });
        navigate("profile");
      },
      validateLogin: Validator.login,
      validateName: Validator.name,
      validateDisplayName: Validator.displayName,
      validateEmail: Validator.email,
      validatePhone: Validator.phone,
    });
  }

  protected render(): string {
    return (`
        <div class="profile-page profile-page--edit-fields">
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
                        label="Почта" 
                        value="${USER_INFO.email}"
                        id="email"
                        ref="email"
                        placeholder="введите почту"
                        styleType="profile"
                        validate=validateEmail
                    }}}
                    {{{ Input 
                        label="Логин" 
                        value="${USER_INFO.login}"
                        id="login"
                        ref="login"
                        placeholder="введите логин"
                        styleType="profile"
                        validate=validateLogin
                    }}}
                    {{{ Input 
                        label="Имя" 
                        value="${USER_INFO.first_name}"
                        id="first_name"
                        ref="first_name"
                        placeholder="введите имя"
                        styleType="profile"
                        validate=validateName
                    }}}
                    {{{ Input 
                        label="Фамилия" 
                        value="${USER_INFO.second_name}"
                        id="second_name"
                        ref="second_name"
                        placeholder="введите фамилию"
                        styleType="profile"
                        validate=validateName
                    }}}
                    {{{ Input 
                        label="Имя в чате" 
                        value="${USER_INFO.display_name}"
                        id="display_name"
                        ref="display_name"
                        placeholder="введите имя"
                        styleType="profile"
                        validate=validateDisplayName
                    }}}
                    {{{ Input 
                        label="Телефон" 
                        value="${USER_INFO.phone}"
                        id="phone"
                        ref="phone"
                        placeholder="введите номер телефона"
                        styleType="profile"
                        validate=validatePhone
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
