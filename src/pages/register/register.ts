import { ErrorMessage } from "../../components/error-message";
import { Input } from "../../components/input";
import { AuthController } from "../../controllers";
import { Block } from "../../core/Block";
import { DEFAULT_PROPS, Router } from "../../core/Router";
import { Validator } from "../../helpers";

type TRegisterPageRefs = {
    email: Input;
    login: Input;
    first_name: Input;
    second_name: Input;
    phone: Input;
    password: Input;
    repeat_password: Input;
    error: ErrorMessage;
}

export class RegisterPage extends Block<{}, TRegisterPageRefs> {
  constructor() {
    const router = new Router(DEFAULT_PROPS);
    super({
      navigateLogin: () => router.go("/login"),
      validateEmail: Validator.email,
      validateLogin: Validator.login,
      validateName: Validator.name,
      validateSecondName: Validator.name,
      validatePhone: Validator.phone,
      validatePassword: Validator.password,
      validateRepeatPassword: (value: string) => { 
        const validatorError = Validator.password(value);
        if (validatorError) return validatorError;
        const checkRepeatPasswordsError = Validator.repeatPassword(value, this.refs.password.value());
        if (checkRepeatPasswordsError) return checkRepeatPasswordsError;
        return false;
      },
      onRegister: () => {
        const newUser = {
          email: this.refs.email.value()!,
          login: this.refs.login.value()!,
          first_name: this.refs.first_name.value()!,
          second_name: this.refs.second_name.value()!,
          phone: this.refs.phone.value()!,
          password: this.refs.password.value()!,
        };
        const repeatPassword = this.refs.repeat_password.value();
        if (!(
          !Validator.email(newUser.email)
          && !Validator.login(newUser.login)
          && !Validator.name(newUser.first_name)
          && !Validator.name(newUser.second_name)
          && !Validator.phone(newUser.phone)
          && !Validator.password(newUser.password)
          && !Validator.password(repeatPassword)
          && !Validator.repeatPassword(newUser.password, repeatPassword)
        )) {
          return;
        }
        AuthController.register(newUser).catch(error => this.refs.error.setProps({ error }));
      },
    });
  }

  protected render(): string {
    return (`
      {{#> CenterLayout }}
        {{#> FormLayout }}
            <div class="form-info register-page">
                <div class="form-info__title">Регистрация</div>
                <form id="register-form">
                  <div class="form-info__inputs">
                    {{{ Input 
                        label="Почта"
                        id="email"
                        ref="email"
                        placeholder="введите почту"
                        validate=validateEmail
                    }}}
                    {{{ Input 
                        label="Логин" 
                        id="login"
                        ref="login"
                        placeholder="введите логин"
                        validate=validateLogin
                    }}}
                    {{{ Input 
                        label="Имя" 
                        id="first_name"
                        ref="first_name"
                        placeholder="введите имя"
                        validate=validateName
                    }}}
                    {{{ Input 
                        label="Фамилия"
                        id="second_name"
                        ref="second_name"
                        placeholder="введите фамилию"
                        validate=validateName
                    }}}
                    {{{ Input 
                        label="Телефон" 
                        id="phone"
                        ref="phone"
                        placeholder="введите номер телефона"
                        validate=validatePhone
                    }}}
                    {{{ Input 
                        label="Пароль"
                        id="password"
                        ref="password"
                        placeholder="введите пароль"
                        type="password"
                        validate=validatePassword
                    }}}
                    {{{ Input 
                        label="Пароль (еще раз)"
                        id="repeat_password"
                        ref="repeat_password"
                        placeholder="повторите пароль"
                        type="password"
                        validate=validateRepeatPassword
                    }}}
                  </div>
                  <div class="form-info__buttons">
                    {{{ ErrorMessage error=error ref="error" }}}
                    {{{ Button
                        label="Зарегистрироваться"
                        page="register"
                        onClick=onRegister
                        action="submit"
                        id="register-form"
                    }}}
                    {{{ Button
                        label="Войти"
                        page="login"
                        type="link"
                        onClick=navigateLogin
                    }}}
                  </div>
                </form>
            </div>
        {{/ FormLayout }}
      {{/ CenterLayout }}
    `);
  }
}
