/**
 * Created by Sergun on 13.05.2018.
 */
import React from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableHighlight
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
  // register,
  // login,
  authorize
} from '@redux/reducers/auth';
import {
  AppStyles,
  AppColors
} from '@styles';
// import styles from './styles';

class Register extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    passwordValue: '',
    emailValue: ''
  };
  componentWillMount () {

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
        if (res && res._id) {
          this.props.navigation.navigate(HomeScreen);
        }
      });
    // if (action === 'register') {
    //   this.props.register(profileData);
    // } else if (action === 'login') {
    //   this.props.login(profileData);
    // }
  };
  render() {
    const {
      emailValue,
      passwordValue
    } = this.state;

    return <View style={styles.container}>
      <View style={styles.inputsContainer}>
        <View style={styles.emailInputWrapper}>
          <TextInput
            style={styles.emailInput}
            onChangeText={this.onEmailTextChange}
            value={emailValue}
            placeholder='Your email'
          />
        </View>

        <View style={styles.passwordInputWrapper}>
          <TextInput
            style={styles.passwordInput}
            onChangeText={this.onPasswordTextChange}
            value={passwordValue}
            placeholder='Your password'
          />
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          onPress={() => this.authActionButtonPress('register')}
          iconName='ios-at-outline'
          title="Create New Account"
          containerStyle={styles.buttonContainer}
          textStyle={styles.buttonText}
        />
        <Button
          onPress={() => this.authActionButtonPress('login')}
          iconName='ios-log-in-outline'
          title="Log in"
          containerStyle={styles.buttonContainer}
          textStyle={styles.buttonText}
        />
      </View>
    </View>
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  authorize: payload => dispatch(authorize(payload))
  // register: payload => dispatch(register(payload)),
  // login: payload => dispatch(login(payload))
  // setCurrentValues: payload => dispatch(setCurrentValues(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);

const styles = {
  container: {
    height: '100%',
    padding: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputsContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%'
  },
  buttonsContainer: {
    flex: 1.2,
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 0.2,
  },
  buttonText: {
    marginHorizontal: 5,
    fontSize: 16
  },
  emailInputWrapper: {
    width: '100%'
  },
  emailInput: {

  },
  passwordInputWrapper: {
    width: '100%'
  },
  passwordInput: {

  },
  loginButtonContainer: {
    marginTop: 20,
    width: '100%'
  },
  loginButton: {
    backgroundColor: '#000'
  },
  signupButtonContainer: {
    marginTop: 10,
    width: '100%',

  },
  signupButton: {
    backgroundColor: '#777'
  },
  signupButtonText: {
    // color: '#333'
  }
};