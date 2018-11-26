import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ScrollView,
} from 'react-native';
import styles from './styles';
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
import EmotionsView from '@components/EmotionsView';

const emoArray = [love, laugh, sadness, like];

class VersesListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDescriptionOpen: false,
    };
  }
  render() {
    const {
      verse,
      auth,
      onVersePress,
    } = this.props;
    const {
      data: {
        versesEmotions
      } = {},
    } = auth;
    const {
      isDescriptionOpen,
    } = this.state;
    console.log("VERSE SHORT: ", verse.text.split("\n"))
    return (
      <View>
        <View
          style={[AppStyles.rowSpaceBetween, styles.wrapper]}
        >
          {/* EXPAND MORE ICON */}

          <Icon
            onPress={()=>this.setState({isDescriptionOpen: !isDescriptionOpen})}
            name={`expand-${isDescriptionOpen ? 'less' : 'more'}`}
            size={20}
            containerStyle={{paddingHorizontal: 8}}
          />

          {/* VERSE'S TITLE */}

          <TouchableOpacity style={styles.titleWrapper} onPress={() => onVersePress(verse._id)}>
            <Text style={styles.text}>{verse.title.length > 30 ? `${verse.title.substring(0, 33 )}...` : verse.title}</Text>
          </TouchableOpacity>

          {/* EMOTIONS ICONS */}

          {
            Object.keys(versesEmotions).map((emo, inx) => {
              if (!!versesEmotions[emo].find(el => el === verse._id)) {
                return <Icon
                  key={inx}
                  size={20}
                  color={EMO_ICONS[emo].color}
                  name={EMO_ICONS[emo].name}
                />
              }
              return null
            })
          }
        </View>

        {/* VERSE'S DESCRIPTION */}

        {
          isDescriptionOpen
            ? <ScrollView>

              {/* VERSE'S EMOTIONS */}

              <View style={[AppStyles.rowLeft, styles.desc_emotionsContainer]}>{
                emoArray.map((emo, inx) => {
                  return <View style={[AppStyles.rowLeft, styles.desc_emotionWrapper]} key={inx}>
                    <Text style={styles.desc_emotionRating}>{verse.emoRating[emo]}</Text>
                    <Icon
                      size={15}
                      color={EMO_ICONS[emo].color}
                      name={EMO_ICONS[emo].name}
                    />
                  </View>
                })
              }</View>

              {/* VERSE'S FRAGMENT */}

              <Text>{
                verse.text
                  .split("\n")
                  .filter(el => el && el.length>1)
                  .map((el, inx) => inx < 4 && `${el}\n`)
              }</Text>
              <Text>...</Text>
            </ScrollView>
            : null
        }
      </View>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});
const mapDispatchToProps = dispatch => ({

});

VersesListItem.defaultProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(VersesListItem);