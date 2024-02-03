import { Input } from "../../components/input";
import { Block } from "../../core/Block";
import { DEFAULT_PROPS, Router } from "../../core/Router";
import { AuthController } from "../../controllers";
import { ErrorMessage } from "../../components/error-message";

type TLoginPageRefs = {
  login: Input;
  password: Input;
  error: ErrorMessage;
}

export class LoginPage extends Block<{}, TLoginPageRefs> {
  constructor() {
    const router = new Router(DEFAULT_PROPS);
    super({
      navigateRegister: () => router.go("/register"),
      onLogin: () => {
        const login = this.refs.login.value();
        const password = this.refs.password.value();
        if (!login || !password) {
          return;
        }
        
        AuthController.login({ login, password }).catch(error => this.refs.error.setProps({ error }));
      },
      validateField: (value: string) => {
        return value.length ? false : "Поле не должно быть пустым";
      },
    });
  }

  protected render(): string {
    return (`
      {{#> CenterLayout }}
        {{#> FormLayout }}
            <div class="form-info login-page">
                <div class="form-info__title">Войти</div>
                <form id="login-form">
                  <div class="form-info__inputs">
                    {{{ Input 
                        label="Логин"
                        id="login"
                        ref="login"
                        placeholder="введите логин"
                        validate=validateField
                    }}}
                    {{{ Input 
                        label="Пароль" 
                        id="password"
                        ref="password"
                        placeholder="введите пароль"
                        type="password"
                        validate=validateField
                    }}}
                  </div>
                  <div class="form-info__buttons">
                    {{{ ErrorMessage error=error ref="error" }}}
                    {{{ Button
                        label="Авторизоваться"
                        page="chat"
                        onClick=onLogin
                        action="submit"
                        id="login-form"
                    }}}
                    {{{ Button
                        label="Нет аккаунта?"
                        page="register"
                        type="link"
                        onClick=navigateRegister
                    }}}
                  </div>
                </form>
            </div>
        {{/ FormLayout }}
      {{/ CenterLayout }}
    `);
  }
}
