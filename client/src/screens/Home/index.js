import React from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import {
  Button
} from '@components';
import {
  SettingsScreen
} from '@consts/navigation';
import Icon from 'react-native-ionicons';
import ApiService from '@services/api';
import Utils from '@services/utils';
import { connect } from 'react-redux';
import {
  setAuthors,
  setCurrentValues
} from '@redux/reducers/authors';
import {
  AppStyles,
  AppColors
} from '@styles';
import styles from './styles';

class Home extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerRight: <Button
        onPress={()=>navigation.navigate(SettingsScreen)}
        iconName='ios-settings-outline'
        iconColor='white'
        iconSize={40}
      />,
      headerLeft: null
    }
  };
  componentWillMount () {
    this.props.setAuthors();
  }
  render() {
    return <View>
      <Image
        disableCache={true}
        style={{width: 100, height: 100}}
        source={{
          uri: Utils.getAvatar('5aef5fa22aa29f16b4ca1cb0'),
          headers: {'Cache-Control': 'no-cache'}
        }}
      />
    </View>
  }
}

const mapStateToProps = state => ({
  authors: state.authors
});

const mapDispatchToProps = dispatch => ({
  setAuthors: () => dispatch(setAuthors()),
  setCurrentValues: payload => dispatch(setCurrentValues(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);