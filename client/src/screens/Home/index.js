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
import { Icon } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/MaterialIcons';
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

// TODO:
// 1. Not all material-icons are seen in react-native-vector-icons (No outlined calendar).
// 2. Set favorites Icon apart from other icons

const alphaIcon = "sort-by-alpha";
const ratingIcon = "insert-chart";
const favoriteIcon = "star-border";
const dateIcon = "date-range";

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
  constructor(props) {
    super(props);
    this.state = {
      activeIcon: alphaIcon
    }
  }
  componentWillMount () {
    this.props.setAuthors();
  }
  onFilterIconPress = activeIcon => () => {
    this.setState({
      activeIcon
    }, ()=>console.log(this.state.activeIcon));
  };
  onListItemPress = id => {
    this.props.navigation.navigate(AuthorScreen, {id});
  };
  renderHeader = () => {
    const {
      activeIcon
    } = this.state;

    return <View style={[AppStyles.rowSpaceAround, styles.headerWrapper]}>
      <WrappedIcon
        name={alphaIcon}
        isActive={activeIcon === alphaIcon}
        onPress={this.onFilterIconPress}
        text="По алфавиту"
      />
      <WrappedIcon
        name={ratingIcon}
        isActive={activeIcon === ratingIcon}
        onPress={this.onFilterIconPress}
        text="По рейтингу"
      />
      <WrappedIcon
        name={favoriteIcon}
        isActive={activeIcon === favoriteIcon}
        onPress={this.onFilterIconPress}
        text="Коллекция"
      />
      <WrappedIcon
        name={dateIcon}
        isActive={activeIcon === dateIcon}
        onPress={this.onFilterIconPress}
        text="По дате рождения"
      />
    </View>
  };
  renderItem = ({item}) => {
    return <TouchableOpacity
      style={[styles.listItem]}
      onPress={() => this.onListItemPress(item._id)}
    >
      <Image

        style={styles.image}
        source={{
          uri: Utils.getAvatar(item._id),
          headers: {'Cache-Control': 'no-cache'}
        }}
      />
      <Text style={styles.name}>{`${item.lastName} ${item.firstName[0]}.${item.middleName[0]}.`}</Text>
    </TouchableOpacity>
  };
  render() {
    const {
      activeIcon
    } = this.state;
    const {
      authors,
      auth
    } = this.props;

    let sortedData = [...authors.data];
    switch (activeIcon) {
      case alphaIcon:
        sortedData = authors.data.sort((a,b) => {
          const nameA = a.lastName.toUpperCase();
          const nameB = b.lastName.toUpperCase();

          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
        break;
      case ratingIcon:
        sortedData = sortedData = authors.data.sort((a,b) => b.rating - a.rating);
        break;
      case favoriteIcon:
        sortedData = auth.data.favoriteAuthors;
        break;
      default:
        return sortedData;
    }
    return <FlatList
      extraData={this.state}
      ListHeaderComponent={this.renderHeader}
      style={styles.container}
      data={sortedData}
      renderItem={this.renderItem}
      keyExtractor={item => item._id}
      numColumns={2}
      contentContainerStyle={styles.contentContainer}
      columnWrapperStyle={[styles.columnWrapperStyle]}
    />
  }
}

const WrappedIcon = props => {
  const {
      name,
      onPress,
      isActive,
      text,
      ...other
    } = props;

  return <View style={AppStyles.columnCenter}>
    <Icon
      name={name}
      onPress={onPress(name)}
      color={isActive ? "black" : "#adadad"}
      size={isActive ? 40 : 35}
      {...other}
    />
    {
      isActive
        ? <Text>{text}</Text>
        : null
    }
  </View>
};

const mapStateToProps = state => ({
  authors: state.authors,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  setAuthors: () => dispatch(setAuthors()),
  setCurrentValues: payload => dispatch(setCurrentValues(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);