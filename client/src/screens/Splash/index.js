import React from 'react';
import {
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import {
  loadSession
} from '@redux/reducers/auth';
import {
  HomeScreen,
  MainTabNav,
  RegisterScreen,
  LoginScreen
} from '@consts/navigation';
import {
  AppStyles,
  AppColors
} from '@styles';
import styles from './styles';

class Splash extends React.Component {
  static navigationOptions = {
    header: null
  };
  componentWillMount () {
    this.props.loadSession()
      .then(res => {
        if (res && res._id) {
          this.props.navigation.navigate(HomeScreen);
        } else {
          this.props.navigation.navigate(LoginScreen);
        }
      })
      .catch(err => {
        console.log('LOAD SESSION RES: ', err)
      })
  }
  render() {
    return <View>
      <Text>Splash</Text>
    </View>
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  loadSession: () => dispatch(loadSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(Splash);