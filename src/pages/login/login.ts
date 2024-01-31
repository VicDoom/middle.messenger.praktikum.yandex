import { Input } from "../../components/input";
import { Block } from "../../core/Block";
import { DEFAULT_PROPS, Router } from "../../core/Router";

type TLoginPageRefs = {
  login: Input;
  password: Input;
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
        console.log({ login, password });
        router.go("/chats");
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
                        value=""
                        id="password"
                        ref="password"
                        placeholder="введите пароль"
                        type="password"
                        validate=validateField
                    }}}
                  </div>
                  <div class="form-info__buttons">
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
