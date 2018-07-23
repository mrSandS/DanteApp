/**
 * Created by Sergun on 13.05.2018.
 */
import React from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight,
  KeyboardAvoidingView
} from 'react-native';
import {
  Button
} from '@components';
import {
  HomeScreen
} from '@consts/navigation';
import Utils from '@services/utils';
import { connect } from 'react-redux';
import {
  authorize
} from '@redux/reducers/auth';
import {
  AppStyles,
  AppColors
} from '@styles';
import styles from './styles';

class AuthComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordValue: '',
      emailValue: '',
      errorsMessages: [],
      hasEmailFieldError: false,
      hasPasswordFieldError: false
    }
  }
  onEmailTextChange = (value) => {
    this.setState({
      emailValue: value
    })
  };
  onPasswordTextChange = (value) => {
    this.setState({
      passwordValue: value
    })
  };
  clearErrorsMessages = () => {
    this.setState({
      errorsMessages: [],
      hasEmailFieldError: false,
      hasPasswordFieldError: false
    });
  };
  authActionButtonPress = actionName => {
    const {
      passwordValue,
      emailValue
    } = this.state;
    const profileData = {
      passwordValue,
      emailValue
    };
    this.props.authorize({profileData, actionName})
      .then(res => {
        this.clearErrorsMessages();
        if (res && res._id) {
          this.props.navigation.navigate(HomeScreen);
        }
      })
      .catch(err => {
        this.clearErrorsMessages();
        if (err.messages && err.messages.length) {
          const state = {};
          state.errorsMessages = err.messages;
          err.messages.forEach(message => {
            if (message.source === "email") {
              state.hasEmailFieldError = true;
            } else if (message.source === "password") {
              state.hasPasswordFieldError = true;
            }
          });
          this.setState(state);
        }
      });
  };
  changeAuthMethodButtonPress = screen => {
    this.props.navigation.navigate(screen);
  };
  renderErrors = () => {
    const {
      errorsMessages = []
    } = this.state;

    return errorsMessages.map((message, inx) => {
      const {
        body
      } = message;

      return <Text
        style={styles.errorMessageText}
        key={`ErrorsMessages_${inx}`}
      >
        {body}
      </Text>
    })
  };

  render() {
    console.log("Errors: ", this.state.errors);

    const {
      hasPasswordFieldError,
      hasEmailFieldError,
      emailValue,
      passwordValue
    } = this.state;

    const emailFieldBorderBottomColor = hasEmailFieldError
      ? "red"
      : "white";
    const passwordFieldBorderBottomColor = hasPasswordFieldError
      ? "red"
      : "white";

    emailFieldAdditionalStyle = {
      borderBottomColor: emailFieldBorderBottomColor
    };
    passwordFieldAdditionalStyle = {
      borderBottomColor: passwordFieldBorderBottomColor
    };

    return <View
      style={{
      }}
    >
      <ImageBackground
        style={{
          width: '100%',
          height: '100%'
        }}
        source={require("@assets/images/authBg.jpg")}
      >
        <View style={styles.container}>
          <View style={styles.inputsContainer}>
            <View style={styles.emailInputWrapper}>
              <TextInput
                style={[styles.emailInput, emailFieldAdditionalStyle]}
                onChangeText={this.onEmailTextChange}
                value={emailValue}
                placeholder='E-mail'
                underlineColorAndroid="transparent"
                placeholderTextColor="white"
              />
            </View>

            <View style={styles.passwordInputWrapper}>
              <TextInput
                style={[styles.passwordInput, passwordFieldAdditionalStyle]}
                onChangeText={this.onPasswordTextChange}
                value={passwordValue}
                placeholder='Пароль'
                underlineColorAndroid="transparent"
                placeholderTextColor="white"
                secureTextEntry
              />
            </View>
          </View>

          <View style={styles.errorsMessagesContainer}>
            {this.renderErrors()}
          </View>

          <Button
            onPress={() => this.authActionButtonPress(this.props.authAction)}
            title={this.props.authButtonText}
            containerStyle={styles.buttonContainer}
            textStyle={styles.buttonText}
          />

          <View style={styles.registrationOfferPanelContainer}>
            <Text style={styles.registrationOfferPanelText}>
              { this.props.changeAuthMethodText }
            </Text>
            <Button
              onPress={() => this.changeAuthMethodButtonPress(this.props.changeAuthScreenTo)}
              title={` ${this.props.changeAuthMethodButtonText}`}
              containerStyle={styles.registrationOfferPanelButtonContainer}
              textStyle={styles.registrationOfferPanelButtonText}
            />
          </View>

        </View>
      </ImageBackground>
    </View>
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  authorize: payload => dispatch(authorize(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthComponent);