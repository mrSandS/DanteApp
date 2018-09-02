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
  Button
} from '@components';
import {
  PlayerScreen
} from '@consts/navigation';
import {
  setFavoriteStatus
} from '@redux/reducers/authors';
import Icon from 'react-native-ionicons';
import Utils from '@services/utils';
import { connect } from 'react-redux';
import {
  AppStyles,
  AppColors
} from '@styles';
import styles from './styles';
import ApiService from '@services/api';

class Author extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeContent: "verses",
      isBiographyOpen: false
    };
  }
  componentWillMount() {
    this.authorId = this.props.navigation.getParam("id");
    this.author = this.props.authors.data.find(el => el._id === this.authorId);
  }
  componentWillUpdate(nextProps) {
    this.author = nextProps.authors.data.find(el => el._id === this.authorId);
  }
  onVersePress = id => {
    this.props.navigation.navigate(PlayerScreen, {id});
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
  onHeartPress = () => {
    this.props.setFavoriteStatus({id: this.authorId, status: !this.author.isFavorite});
  };
  render() {
    const {
      activeContent,
      isBiographyOpen,
      isHeartActive
    } = this.state;
    if (!this.author) {
      return null;
    }
    const {
      name,
      lifeDates,
      bio,
      _id,
      verses,
      isFavorite
    } = this.author;
    const getActiveColor = isActive => isActive ?  "#333333" : "#f2f2f2b3";
    let heartIconName;
    let heartColor;
    let heartSize;
    if (isFavorite) {
      heartIconName = "ios-heart";
      heartColor = "#ff425b";
      heartSize = 50;
    }
     else {
      heartIconName = "ios-heart-outline";
      heartColor = "#adadad";
      heartSize = 40;
    }
    return <View style={styles.container}>
      <ImageBackground
        source={{
          uri: Utils.getAvatar(_id),
          headers: {'Cache-Control': 'no-cache'}
        }}
        style={styles.photo}
      >
        <Text style={styles.lifeDates}>{lifeDates}</Text>
        <TouchableOpacity
          onPress={this.onHeartPress}
          style={styles.heart}
        >
          <Icon
            size={heartSize}
            color={heartColor}
            //name="ios-more-outline"
            name="ios-heart"
          />
        </TouchableOpacity>
        <View style={[styles.authorNameContainer]}>
          <TouchableOpacity onPress={this.onAuthorNamePress} style={AppStyles.rowCenter}>
              <Icon
                size={20}
                color="white"
                name={`ios-arrow-${isBiographyOpen ? "down" : "up"}-outline`}
              />
            <Text style={styles.authorName}>{name}</Text>
          </TouchableOpacity>
          {
            isBiographyOpen
              ? <Text style={styles.bio}>{bio}</Text>
              : null
          }
        </View>
      </ImageBackground>
      <View style={AppStyles.rowCenter}>
        <Icon
          size={30}
          color="#333"
          name="ios-more-outline"
          style={styles.separatorField}
        />
      </View>
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.versesContainer}>
          {
            verses.map(verse => {
              return <TouchableOpacity
                key={verse._id}
                style={styles.verseWrapper}
                onPress={() => this.onVersePress(verse._id)}
              >
                <Text style={styles.verse} >{verse.title}</Text>
              </TouchableOpacity>
            })
          }
        </View>
      </ScrollView>
    </View>
  }
}

const mapStateToProps = state => ({
  authors: state.authors
});

const mapDispatchToProps = dispatch => ({
  setFavoriteStatus: payload => dispatch(setFavoriteStatus(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Author);

{/*<View style={[AppStyles.rowCenter, styles.buttonsContainer]}>*/}
  {/*<Button*/}
    {/*title="Стихи"*/}
    {/*containerStyle={[styles.button, styles.leftButton, {backgroundColor: getActiveColor(activeContent === "verses")}]}*/}
    {/*textStyle={[styles.buttonTextStyle, {color: getActiveColor(activeContent === "bio")}]}*/}
    {/*onPress={() => this.onChangeContentButtonPress("verses")}*/}
  {/*/>*/}
  {/*<Button*/}
    {/*title="Биография"*/}
    {/*containerStyle={[styles.button, styles.rightButton, {backgroundColor: getActiveColor(activeContent === "bio")}]}*/}
    {/*textStyle={[styles.buttonTextStyle, {color: getActiveColor(activeContent === "verses")}]}*/}
    {/*onPress={() => this.onChangeContentButtonPress("bio")}*/}
  {/*/>*/}
{/*</View>*/}

{/*<View style={[AppStyles.rowSpaceBetween, styles.headContainer]}>*/}
  {/*<Text style={styles.name}>{name}</Text>*/}
  {/*<Icon*/}
    {/*name="ios-star-outline"*/}
    {/*size={40}*/}
    {/*color="#adadad"*/}
  {/*/>*/}
{/*</View>*/}