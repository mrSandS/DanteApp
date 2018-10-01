import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Animated
} from 'react-native';
import { Icon } from 'react-native-elements';
import {
  PlayerScreen
} from '@consts/navigation';
import styles from './styles';
import { connect } from 'react-redux';
import Utils from '@services/utils';
import { AppStyles } from '@styles';
import SlidingView from './SlidingView';

const HARDCODED_NAV_BAR_HEIGHT = 47;
const HARDCODED_VERSE_PANEL_HEIGHT = 36;
const HARDCODED_SLIDING_VIEW_HEIGHT = HARDCODED_VERSE_PANEL_HEIGHT * 3;

const DEFAULT_VIEW_HEIGHT = -HARDCODED_SLIDING_VIEW_HEIGHT;

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVersesPanelOpen: false,
      isAuthorsSVOpen: false,
      isVersesSVOpen: false,
      // versesPanel_top: new Animated.Value(-HARDCODED_SLIDING_VIEW_HEIGHT),
      authorsPanel_top: new Animated.Value(-200),
    };
  }
  onCurrentVersePress = () => {
    this.setState({
      isVersesSVOpen: !this.state.isVersesSVOpen
    });
  };
  onCurrentAuthorPress = () => {
    this.setState({
      isAuthorsSVOpen: !this.state.isAuthorsSVOpen
    });
  };
  render() {
    const {
      navigation = {},
      authors = {}
    } = this.props;

    const {
      isVersesSVOpen,
      isAuthorsSVOpen
    } = this.state;

    const {
      state: navState,
      goBack
    } = navigation;

    const {
      routeName,
      params = {}
    } = navState;

    const {
      authorId,
      verseId
    } = params;

    const {
      data: authorsData
    } = authors;

    let currentAuthor;
    let currentVerse;

    if (routeName === PlayerScreen) {
      currentAuthor = authorsData.find(author => author._id === authorId);
      currentVerse = currentAuthor.verses.find(verse => verse._id === verseId);
    }

    console.log("Header Props: ", this.props.navigation);

    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={[AppStyles.rowLeft, styles.mainInfoWrapper]}>
            <Icon
              size={30}
              color='#adadad'
              name='arrow-back'
              onPress={() => goBack()}
            />
            {
              currentAuthor
                ? <TouchableOpacity onPress={this.onCurrentAuthorPress} style={[AppStyles.rowLeft, styles.title]}>
                  <View>
                    <Image
                      style={{width:30, height: 30, borderRadius: 100}}
                      source={{
                        uri: Utils.getAvatar(authorId),
                        headers: {'Cache-Control': 'no-cache'}
                      }}
                    />
                    <Text style={styles.titleText}>{currentAuthor.fullName}</Text>
                  </View>
                </TouchableOpacity>
                : null
            }
          </View>
          <TouchableOpacity underlayColor='#fafafa' onPress={this.onCurrentVersePress} style={styles.verseTitleWrapper}>
            <Text style={styles.verseTitle}>{currentVerse.title}</Text>
          </TouchableOpacity>
        </View>
        <SlidingView
          isOpen={isVersesSVOpen}
          isAnimated={false}
          data={currentAuthor.verses.map(el => ({id: el._id, value: el.title}) )}
          viewHeight={150}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  authors: state.authors
});

export default connect(mapStateToProps)(NavBar);

/*
 <SlidingView
 isOpen={isAuthorsSVOpen}
 data={authorsData.map(el => ({id: el._id, value: el.fullName}) )}
 viewHeight={360}
 />
 */