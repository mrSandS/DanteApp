import React from 'react';
import {
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Animated,
  Easing
} from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import {
  AppStyles,
  AppColors
} from '@styles';
import styles from './styles';
import EmotionsView from '@components/EmotionsView';

class Player extends React.Component {
  static navigationOptions = {

  };
  constructor(props) {
    super(props);
    this.state = {
      verse: ""
    };
  }
  componentWillMount () {
    this.setData(this.props);
  };
  componentWillUpdate(nextProps) {
    this.setData(nextProps);
  };
  setData = props => {
    this.verseId = props.navigation.getParam("verseId");
    this.authorId = props.navigation.getParam("authorId");
    let verse;
    let isAdded;
    props.authors.data
      .forEach(el => {
        if (isAdded) {
          return
        }
        el.verses
          .forEach(el => {
            if (isAdded) {
              return
            }
            if (el._id === this.verseId) {
              verse = el;
              isAdded = true;
            }
          })
      });
    this.verse = verse;
  };
  render() {
    if (!this.verse) {
      return null
    }
    return <View style={[AppStyles.columnCenter, styles.container]}>
      <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
        <Text style={styles.verse}>{this.verse.text}</Text>
      </ScrollView>
      <EmotionsView
        containerStyle={styles.emotionsPanel}
        authorId={this.authorId}
        verseId={this.verseId}
        isIconsTouchable={true}
      />
    </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Player);