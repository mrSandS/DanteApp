import { 
  StyleSheet
} from 'react-native';
import { 
  AppStyles,
  AppColors
} from '@styles';

const BORDER_RADIUS = 6;

export default StyleSheet.create({
  wrapper: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#adadad"
  },
  titleWrapper: {
    flex: 5,
  },
  text: {
    fontSize: 16,
  },
  desc_emotionsContainer: {
    marginVertical: 3
  },
  desc_emotionWrapper: {
    marginRight: 8
  },
  desc_emotionRating: {
    marginRight: 2
  }
})