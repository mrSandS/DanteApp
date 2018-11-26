import React from 'react';
import {
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import {
  AppStyles,
  AppColors
} from '@styles';
import {
  love,
  laugh,
  sadness,
  like,
  EMO_ICONS
} from '@consts/emotions';
import {
  Button
} from '@components';
import {
  PlayerScreen
} from '@consts/navigation';
import {
  setFavoriteAuthor
} from '@redux/reducers/auth';
// import Icon from 'react-native-ionicons';
import { Icon } from 'react-native-elements';
import Utils from '@services/utils';
import { connect } from 'react-redux';
import styles from './styles';
import VersesListItem from '@components/VersesListItem'

//TODO:
// 1. To make sure that an author name is not out of its field (on the next line)
// when it's too long.
// 2. If an author doesn't have a bio, no up arrow should be to open
// the bio field

class Author extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeContent: "verses",
      isBiographyOpen: false,
    };
  }
  componentWillMount() {
    this.setData(this.props);
  }
  componentWillUpdate(nextProps) {
    this.setData(nextProps);
  }
  setData = (props) => {
    const {
      data: {
        favoriteAuthors
      }
    } = props.auth;
    this.authorId = props.navigation.getParam("id");
    this.author = props.authors.data.find(el => el._id === this.authorId);
    this.isFavorite = !!favoriteAuthors.find(fav => fav._id === this.authorId);
  };
  onVersePress = id => {
    this.props.navigation.navigate(PlayerScreen, {verseId: id, authorId: this.authorId});
  };
  onChangeContentButtonPress = content => {
    this.setState({
      activeContent: content
    });
  };
  onAuthorNamePress = () => {
    this.setState({
      isBiographyOpen: !this.state.isBiographyOpen
    });
  };
  onFavPress = () => {
    this.props.setFavoriteAuthor({
      id: this.authorId,
      status: !this.isFavorite
    });
  };
  render() {
    if (!this.author) {
      return null;
    }
    const {
      isBiographyOpen,
    } = this.state;
    const {
      firstName,
      middleName,
      lastName,
      bio,
      _id,
      verses,
    } = this.author;
    const getActiveColor = isActive => isActive ?  "#333333" : "#f2f2f2b3";
    let favIconName;
    let favIconColor;
    let favIconSize;
    if (this.isFavorite) {
      favIconName = "ios-heart";
      // favoriteIconColor = "#ff425b";
      favIconColor = AppColors.accent;
      favIconSize = 50;
    }
     else {
      favIconName = "ios-heart-outline";
      favIconColor = "#adadad";
      favIconSize = 40;
    }


    return <View style={styles.container}>

      {/* TOP IMAGE */}

      <ImageBackground
        source={{
          uri: Utils.getAvatar(_id),
          headers: {'Cache-Control': 'no-cache'}
        }}
        style={styles.photo}
      >

        <TouchableOpacity
          onPress={this.onFavPress}
          style={styles.favIcon}
        >
          <Icon
            size={favIconSize}
            color={favIconColor}
            //name="ios-more-outline"
            name="star"
          />
        </TouchableOpacity>

        {/* NAME/BIOGRAPHY PANEL */}

        <View style={[styles.authorNameContainer]}>
          <TouchableOpacity onPress={this.onAuthorNamePress} style={AppStyles.rowCenter}>
              <Icon
                size={20}
                color="white"
                name={`keyboard-arrow-${isBiographyOpen ? "down" : "up"}`}
              />
            <Text style={styles.authorName}>{`${lastName} ${firstName} ${middleName}`}</Text>
          </TouchableOpacity>
          {
            isBiographyOpen
              ? <Text style={styles.bio}>{bio}</Text>
              : null
          }
        </View>

      </ImageBackground>

      {/* INTERMEDIARY ICON */}

      <View style={[AppStyles.rowCenter, styles.separatorWrapper]}>
        <Icon
          size={30}
          color="#333"
          name="more-horiz"
        />
      </View>

      {/* VERSES LIST */}

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.versesContainer}>
          {
            verses.map(verse => {
              return <VersesListItem key={verse._id} verse={verse} onVersePress={this.onVersePress} />
            })
          }
        </View>
      </ScrollView>
    </View>
  }
}

const mapStateToProps = state => ({
  authors: state.authors,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  setFavoriteAuthor: payload => dispatch(setFavoriteAuthor(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Author);