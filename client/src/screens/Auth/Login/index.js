import React from 'react';
import AuthComponent from "../AuthComponent.js";
import {
  RegisterScreen
} from '@consts/navigation';

class Login extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return <AuthComponent
      changeAuthMethodText="Еще нет аккаунта?"
      changeAuthMethodButtonText="Регистрация"
      authButtonText="Войти"
      changeAuthScreenTo={RegisterScreen}
      authAction="login"
      navigation={this.props.navigation}
    />
  }
}

export default Login
