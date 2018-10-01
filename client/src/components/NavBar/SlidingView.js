import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Animated
} from 'react-native';
import {
  PlayerScreen
} from '@consts/navigation';
import styles from './styles';
import { AppStyles } from '@styles';

const HARDCODED_NAV_BAR_HEIGHT = 47;
const HARDCODED_VERSE_PANEL_HEIGHT = 36;
const HARDCODED_SLIDING_VIEW_HEIGHT = HARDCODED_VERSE_PANEL_HEIGHT * 3;

const DEFAULT_VIEW_HEIGHT = -HARDCODED_SLIDING_VIEW_HEIGHT;

class SlidingView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marginTop: -this.props.viewHeight
    };
  }
  componentDidMount() {
    console.log("Did Mount State: ", this.state);

    const marginTop = this.props.isAnimated
      ? new Animated.Value(this.getMarginTopValue(this.props.isOpen))
      : this.getMarginTopValue(this.props.isOpen);

    this.setState({
      marginTop
    });
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("Did Update State: ", this.state);
    if (
      prevProps.isOpen !== this.props.isOpen
    ) {
      this.props.isAnimated
        ? this.animate()
        : this.setState({
          marginTop: this.getMarginTopValue(this.props.isOpen)
        });
    }
  }
  getMarginTopValue = isOpen => {
    const value = isOpen
      ? 0
      : -this.props.viewHeight;
    return value;
  };
  animate = () => {
    Animated.timing(
      this.state.marginTop,
      {
        toValue: this.getMarginTopValue(this.props.isOpen),
        duration: 400,
      }
    ).start();
  };
  render() {
    const {
      data,
      isAnimated
    } = this.props;
    const {
      marginTop
    } = this.state;

    const Component = isAnimated
      ? Animated.View
      : View;

    return (
      <Component
        style={[styles.versesPanel, {marginTop}]}
      >
        {
          data.map(el => {
            return <TouchableOpacity style={styles.verseTitleWrapper} key={el.id}>
              <Text style={[styles.verseTitle]}>{el.value}</Text>
            </TouchableOpacity>
          })
        }
      </Component>
    );
  }
}

export default SlidingView;