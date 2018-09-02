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
    const verseId = this.props.navigation.getParam("id");
    let verse;
    let isAdded;
    this.props.authors.data
      .forEach(
        el => {
          if (isAdded) {
            return
          }
          el.verses
            .forEach(
              el => {
                if (isAdded) {
                  return
                }
                if (el._id === verseId) {
                  verse = el;
                  isAdded = true;
                }
              }
            )
        }
      );

    this.setState({
      verse
    });
  };
  render() {
    return <Text>{this.state.verse.text}</Text>
  }
}

const mapStateToProps = state => ({
  authors: state.authors
});

const mapDispatchToProps = dispatch => ({
  setAuthors: () => dispatch(setAuthors())
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);