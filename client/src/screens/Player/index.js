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
import { Icon } from 'react-native-elements';
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
    const verseId = props.navigation.getParam("id");
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
            if (el._id === verseId) {
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
    return <View>
      <Text>{this.verse.text}</Text>
      <Icon
        size={30}
        color="red"
        name="favorite"
      />
    </View>
  }
}

const mapStateToProps = state => ({
  authors: state.authors
});

const mapDispatchToProps = dispatch => ({
  setAuthors: () => dispatch(setAuthors())
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);