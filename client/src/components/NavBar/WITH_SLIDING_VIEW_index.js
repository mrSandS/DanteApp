import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  PanResponder
} from 'react-native';
import { Icon } from 'react-native-elements';
import {
  PlayerScreen
} from '@consts/navigation';
import styles from './styles';
import { connect } from 'react-redux';
import Utils from '@services/utils';
import { AppStyles } from '@styles';

const HARDCODED_NAV_BAR_HEIGHT = 59;
const HARDCODED_HEIGHT_FROM_TOP = 0;
const HARDCODED_TOUCH_PANEL_HEIGHT = 32;
const HARDCODED_SLIDING_VIEW_HEIGHT = HARDCODED_TOUCH_PANEL_HEIGHT * 3;
const HARDCODED_SLIDING_VIEW_TOP = -HARDCODED_SLIDING_VIEW_HEIGHT + HARDCODED_HEIGHT_FROM_TOP + HARDCODED_NAV_BAR_HEIGHT + HARDCODED_TOUCH_PANEL_HEIGHT;

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVersesPanelOpen: false,
      versesPanel_top: -20
    };
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!

        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}
        const {
          locationX,
          locationY
        } = evt.nativeEvent;
        const {
          moveY
        } = gestureState;
        console.log("Pan Move: ", {
          locationY,
          moveY,
        });

        if (
            moveY > (HARDCODED_HEIGHT_FROM_TOP + HARDCODED_NAV_BAR_HEIGHT + HARDCODED_TOUCH_PANEL_HEIGHT) &&
            moveY < (HARDCODED_HEIGHT_FROM_TOP + HARDCODED_NAV_BAR_HEIGHT + HARDCODED_TOUCH_PANEL_HEIGHT + HARDCODED_SLIDING_VIEW_HEIGHT)
          ) {
          const yDelta = moveY - (HARDCODED_HEIGHT_FROM_TOP + HARDCODED_NAV_BAR_HEIGHT + HARDCODED_TOUCH_PANEL_HEIGHT );
          this.setState({
            versesPanel_top: HARDCODED_SLIDING_VIEW_TOP + yDelta
          });
        }
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    });
  }
  openVersesPanel = () => {
    this.setState({
      isVersesPanelOpen: true
    })
  };
  closeVersesPanel = () => {
    this.setState({
      isVersesPanelOpen: false
    })
  };
  NO_ANIMATION_renderVersesPanel = (author, verse) => {
    if (author && verse) {
      const onPress = this.state.isVersesPanelOpen ? this.closeVersesPanel : this.openVersesPanel;
      return <View {...this._panResponder.panHandlers} style={styles.verseTitleWrapper} onPress={onPress}>
        {
          !this.state.isVersesPanelOpen
            ? <Text style={styles.verseTitle}>{verse.title}</Text>
            : author.verses.map(el => {
                return <TouchableOpacity style={styles.verseTitleWrapper} key={el._id}>
                  <Text style={[styles.verseTitle]}>{el.title}</Text>
                </TouchableOpacity>
            })
        }
      </View>
    }
    return null;
  };
  renderVersesPanel = (author, verse) => {
    if (author && verse) {
      return <View {...this._panResponder.panHandlers} style={styles.slidingContainer}>
        <View style={styles.verseTitleWrapper}>
          <Text style={styles.verseTitle}>{verse.title}</Text>
        </View>
      </View>
    }
    return null;
  };
  render() {
    const {
      navigation = {},
      authors = {}
    } = this.props;

    const {
      versesPanel_top
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
        <View style={[styles.versesPanel, {top: versesPanel_top}]}>
          {
            currentAuthor.verses.map(el => {
              return <TouchableOpacity style={styles.verseTitleWrapper} key={el._id}>
                <Text style={[styles.verseTitle]}>{el.title}</Text>
              </TouchableOpacity>
            })
          }
        </View>
        <View style={[AppStyles.rowLeft, styles.innerContainer]}>
          <Icon
            size={30}
            color='#adadad'
            name='arrow-back'
            onPress={() => goBack()}
          />
          {
            currentAuthor
              ? <View style={[AppStyles.rowLeft, styles.title]}>
                <Image
                  style={{width:30, height: 30, borderRadius: 100}}
                  source={{
                    uri: Utils.getAvatar(authorId),
                    headers: {'Cache-Control': 'no-cache'}
                  }}
                />
                <Text style={styles.titleText}>{currentAuthor.fullName}</Text>
              </View>
              : null
          }
        </View>
        {this.renderVersesPanel(currentAuthor, currentVerse)}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  authors: state.authors
});

export default connect(mapStateToProps)(NavBar);