import React from 'react';
import AuthComponent from "../AuthComponent.js";
import {
  LoginScreen
} from '@consts/navigation';

class Register extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return <AuthComponent
      changeAuthMethodText="Уже есть аккаунт?"
      changeAuthMethodButtonText="Войти"
      authButtonText="Создать аккаунт"
      changeAuthScreenTo={LoginScreen}
      authAction="register"
      navigation={this.props.navigation}
    />
  }
}

export default Register
