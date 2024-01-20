import { Input } from "../../components/input";
import { Block } from "../../core/Block";
import { navigate } from "../../core/navigate";
import { Validator } from "../../helpers";

type TRegisterPageRefs = {
    email: Input;
    login: Input;
    first_name: Input;
    second_name: Input;
    phone: Input;
    password: Input;
    repeat_password: Input;
}

export class RegisterPage extends Block<{}, TRegisterPageRefs> {
  constructor() {
    super({
      navigateLogin: () => navigate("login"),
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
        const email = this.refs.email.value();
        const login = this.refs.login.value();
        const firstName = this.refs.first_name.value();
        const secondName = this.refs.second_name.value();
        const phone = this.refs.phone.value();
        const password = this.refs.password.value();
        const repeatPassword = this.refs.repeat_password.value();
        if (!(
          !Validator.email(email)
          && !Validator.login(login)
          && !Validator.name(firstName)
          && !Validator.name(secondName)
          && !Validator.phone(phone)
          && !Validator.password(password)
          && !Validator.password(repeatPassword)
          && !Validator.repeatPassword(password, repeatPassword)
        )) {
          return;
        }
        console.log({ email, login, firstName, secondName, phone, password, repeatPassword });
        navigate("login");
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
