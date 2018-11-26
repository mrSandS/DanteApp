import React from 'react';
import {
  TouchableOpacity,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import {
  setAuthors,
  setCurrentValues
} from '@redux/reducers/authors';
import {
  setVerseEmotion
} from '@redux/reducers/auth';
import {
  love,
  laugh,
  sadness,
  like,
  EMO_ICONS
} from '@consts/emotions';
import { AppColors, AppStyles } from '@styles';
import { Icon } from 'react-native-elements';



class EmotionsView extends React.Component {

  componentWillMount () {
    this.setData(this.props);
  };
  componentWillUpdate(nextProps) {
    this.setData(nextProps);
  };
  setData = props => {
    const {
      versesEmotions = {}
    } = props.auth.data;

    const isEmoed = emo => versesEmotions && !!versesEmotions[emo].find(id => id === props.verseId);
    this.isLoved = isEmoed(love);
    this.isLaughed = isEmoed(laugh);
    this.isSad = isEmoed(sadness);
    this.isLiked = isEmoed(like);
    console.log("Is Emoed: ", isEmoed(love));
  };
  onEmotionIconPress = (emotion, status) => () => {
    console.log("Set Emotion", {
      authorId: this.props.auth.data._id,
      verseId: this.props.verseId,
      status,
      emotion
    })
    this.props.setVerseEmotion({
      authorId: this.props.authorId,
      verseId: this.props.verseId,
      status,
      emotion
    });
  };

  render() {
    const {
      containerStyle,
      inactiveIconColor,
      activeIconSize,
      inactiveIconSize,
      isIconsTouchable,
    } = this.props;
    const getActiveColor = (isActive, activeColor) => isActive ? activeColor : inactiveIconColor;
    const getActiveSize = isActive => isActive ? activeIconSize : inactiveIconSize;
    return (
      <View style={[AppStyles.rowSpaceAround, containerStyle]}>
        <Icon
          size={getActiveSize(this.isLoved)}
          color={getActiveColor(this.isLoved, EMO_ICONS[love].color)}
          name={EMO_ICONS[love].name}
          onPress={isIconsTouchable ? this.onEmotionIconPress(love, !this.isLoved) : null}
        />
        <Icon
          size={getActiveSize(this.isLaughed)}
          color={getActiveColor(this.isLaughed, EMO_ICONS[laugh].color)}
          name={EMO_ICONS[laugh].name}
          onPress={isIconsTouchable ? this.onEmotionIconPress(laugh, !this.isLaughed) : null}
        />
        <Icon
          size={getActiveSize(this.isSad)}
          color={getActiveColor(this.isSad, EMO_ICONS[sadness].color)}
          name={EMO_ICONS[sadness].name}
          onPress={isIconsTouchable ? this.onEmotionIconPress(sadness, !this.isSad) : null}
        />
        <Icon
          size={getActiveSize(this.isLiked)}
          color={getActiveColor(this.isLiked, EMO_ICONS[like].color)}
          name={EMO_ICONS[like].name}
          onPress={isIconsTouchable ? this.onEmotionIconPress(like, !this.isLiked) : null}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  authors: state.authors,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  setAuthors: () => dispatch(setAuthors()),
  setVerseEmotion: payload => dispatch(setVerseEmotion(payload))
});

EmotionsView.defaultProps = {
  activeIconSize: 30,
  inactiveIconSize: 30,
  activeIconColor: "#ffc107",
  inactiveIconColor: "#adadad",
  isIconsTouchable: false
};

export default connect(mapStateToProps, mapDispatchToProps)(EmotionsView);