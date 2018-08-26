import React from 'react';
import {
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import {
  Button
} from '@components';
import {
  SettingsScreen,
  AuthorScreen
} from '@consts/navigation';
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
        iconColor='#adadad'
        iconSize={40}
      />,
      headerLeft: null
    }
  };
  componentWillMount () {
    this.props.setAuthors();
  }
  onListItemPress = id => {
    this.props.navigation.navigate(AuthorScreen, {id});
  };
  renderItem = ({item}) => {
    return <TouchableOpacity
      style={styles.listItem}
      onPress={() => this.onListItemPress(item._id)}
    >
      <Image

        style={styles.image}
        source={{
          uri: Utils.getAvatar(item._id),
          headers: {'Cache-Control': 'no-cache'}
        }}
      />
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  };
  render() {
    const {
      authors
    } = this.props;
    return <FlatList
      style={styles.container}
      data={authors.data}
      renderItem={this.renderItem}
      keyExtractor={item => item._id}
      numColumns={2}
      contentContainerStyle={styles.contentContainer}
      columnWrapperStyle={styles.columnWrapperStyle}
    />
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