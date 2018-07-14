import React from 'react';
import { 
  Image
} from 'react-native';
import {
  DEFAULT_SIZE
} from './styles';
import styles  from './styles';

export default class Avatar extends React.Component {  
  render() {
    const {
      size,      
      imageStyle,
      ...other
    } = this.props;
    const additionalImageStyle = {
      width: size,
      height: size,
      borderRadius: 100
    }
    return <Image
      style={[styles.imageStyle, additionalImageStyle, imageStyle]}
      {...other}
    />
  }
}

Avatar.defaultProps = {
  size: DEFAULT_SIZE 
}