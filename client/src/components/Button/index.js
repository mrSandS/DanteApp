import React from 'react';
import { 
  TouchableOpacity,
  Text,
  View 
} from 'react-native';
import { AppColors, AppStyles } from '@styles';
import Icon from 'react-native-ionicons';

export default class Button extends React.Component {  
  render() {
    const {
      disable,
      onPress,
      title,
      iconName,
      iconSize,
      iconColor,
      containerStyle,
      textStyle
    } = this.props;

    const Component = onPress
      ? TouchableOpacity
      : View;

    return (
      <Component
        onPress={onPress}
        style={[AppStyles.rowCenter, containerStyle]}
      >
        {
          iconName
            ? <Icon
                name={iconName}
                color={iconColor}
                size={iconSize}
              />
            : null
        }
        {
          title
            ? <Text style={textStyle}>{title}</Text>
            : null
        }
      </Component>              
    );
  }
}

Button.defaultProps = {
  disable: false,
  onPress: function(){},
  iconColor: AppColors.gray,
  iconSize: 40
};