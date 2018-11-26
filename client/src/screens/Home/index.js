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
// 3. Change header right/left icons to material

const alphaIcon = "sort-by-alpha";
const ratingIcon = "insert-chart";
const favoriteIcon = "star-border";
const favoriteIcon_full = 'star';
const dateIcon = "date-range";

const sortedByAlpha = 'alpha';
const sortedByRating = 'rating';
const sortedByDate = 'date';
const sortedByFavorite = 'favorite';

class Home extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerRight: <Button
        onPress={()=>navigation.navigate(SettingsScreen)}
        iconName='settings'
        iconColor='#adadad'
        iconSize={30}
      />,
      headerLeft: null
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      sortedBy: sortedByAlpha
    }
  }
  componentWillMount () {
    this.props.setAuthors();
  }
  onFilterIconPress = activeIcon => () => {
    let sortedBy;
    switch (activeIcon) {
      case alphaIcon:
        sortedBy = sortedByAlpha;
        break;
      case ratingIcon:
        sortedBy = sortedByRating;
        break;
      case favoriteIcon:
        sortedBy = sortedByFavorite;
        break;
      case dateIcon:
        sortedBy = sortedByDate;
        break;
    }
    this.setState({sortedBy});
  };
  onListItemPress = id => {
    this.props.navigation.navigate(AuthorScreen, {id});
  };
  renderHeader = () => {
    const {
      sortedBy
    } = this.state;

    return <View style={[AppStyles.rowSpaceAround, styles.headerWrapper]}>
      <WrappedIcon
        name={sortedBy === sortedByFavorite ? favoriteIcon_full : favoriteIcon}
        isActive={sortedBy === sortedByFavorite}
        onPress={this.onFilterIconPress}
        text="Коллекция"
        color={sortedBy === sortedByFavorite ? AppColors.accent : '#adadad'}
      />
      <WrappedIcon
        name={alphaIcon}
        isActive={sortedBy === sortedByAlpha}
        onPress={this.onFilterIconPress}
        text="По алфавиту"
      />
      <WrappedIcon
        name={ratingIcon}
        isActive={sortedBy === sortedByRating}
        onPress={this.onFilterIconPress}
        text="По рейтингу"
      />
      <WrappedIcon
        name={dateIcon}
        isActive={sortedBy === sortedByDate}
        onPress={this.onFilterIconPress}
        text="По дате рождения"
      />
    </View>
  };
  renderItem = ({item}) => {
    const {
      data: {
        favoriteAuthors
      }
    } = this.props.auth;
    const {
      sortedBy,
    } = this.state;
    const isFavorite = !!favoriteAuthors.find(fav => fav._id === item._id);
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
      <Text style={styles.name}>{item.lastName} {item.firstName[0]}.{item.middleName[0]}.</Text>
      {
        sortedBy === sortedByDate
          ? <Text style={styles.date}>{item.birthDate}-{item.deathDate}</Text>
          : null
      }
      {
        sortedBy === sortedByRating
         ?  <WrappedIcon
            isActive
            name={isFavorite ? favoriteIcon_full : favoriteIcon}
            text={item.rating}
            textSize={13}
            // textColor='white'
            size={32}
            color={isFavorite ? AppColors.accent : '#adadad'}
            containerStyle={{flexDirection: 'row', justifyContent: 'flex-start', position: 'absolute', left: 123, top: 65}}
          />
          : null
      }
    </TouchableOpacity>
  };
  render() {
    const {
      sortedBy
    } = this.state;
    const {
      authors,
      auth
    } = this.props;

    let sortedData = [...authors.data];
    switch (sortedBy) {
      case sortedByAlpha:
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
      case sortedByRating:
        sortedData = authors.data.sort((a,b) => b.rating - a.rating);
        break;
      case sortedByFavorite:
        sortedData = auth.data.favoriteAuthors;
        break;
      case sortedByDate:
        sortedData = authors.data.sort((a,b) => b.birthDate - a.birthDate);
        break;
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
      onPress = ()=>{},
      isActive,
      text,
      textSize,
      textColor,
      containerStyle,
      ...other
    } = props;

  return <View style={[styles.wrappedIconStyle, AppStyles.columnCenter, containerStyle]}>
    <Icon
      name={name}
      onPress={onPress(name)}
      color={isActive ? "black" : "#adadad"}
      size={isActive ? 40 : 35}
      {...other}
    />
    {
      isActive
        ? <Text style={{fontSize: textSize, color: textColor}}>{text}</Text>
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