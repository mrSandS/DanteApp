/**
 * Created by Sergun on 09.06.2018.
 */
import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import {
  Button
} from '@components';
import {
  LoginScreen
} from '@consts/navigation';
import Icon from 'react-native-ionicons';
import ApiService from '@services/api';
import Utils from '@services/utils';
import { connect } from 'react-redux';
import {
  logOut
} from '@redux/reducers/auth';
import {
  AppStyles,
  AppColors
} from '@styles';
// import styles from './styles';

class Settings extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerLeft: <Button
        onPress={() => navigation.goBack()}
        iconName="ios-arrow-round-back-outline"
        iconColor='white'
      />,
      headerTitle: 'Settings',
      headerTitleStyle: {
        color: 'white'
      }
    }
  };
  logOutButtonPress = () => {
    this.props.navigation.navigate(LoginScreen);
    this.props.logOut();
  };
  render() {
    const {
      auth: {
        data: {
          email
        }
      }
    } = this.props;
    return <View>
      <Text style={{textAlign: 'center', fontSize: 18, paddingVertical: 15}}>Email: {email}</Text>
      <Button
        onPress={this.logOutButtonPress}
        title="Log out"
        iconName="ios-log-out-outline"
        containerStyle={{paddingVertical: 15}}
      />
    </View>
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});
const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOut())
});
export default connect(mapStateToProps, mapDispatchToProps)(Settings);

const styles = {

};