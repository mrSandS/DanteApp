import { 
  StyleSheet
} from 'react-native';
import { 
  AppStyles,
  AppColors
} from '@styles';

const BORDER_RADIUS = 6;

export default StyleSheet.create({
	container: {
    display: "flex",
    backgroundColor: "white",
    height: "100%"
  },
  photo: {
    width: "100%",
    height: 200
    // flex: 1
  },
  contentContainer: {
    padding: 10,
    display: "flex",
  },
  name: {
    fontSize: 26
  },
  buttonsContainer: {
    marginVertical: 12,
  },
  button: {
	  flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 6,
    borderWidth: 0.5,
    borderColor: "#adadad"
  },
  leftButton: {
    borderBottomLeftRadius: BORDER_RADIUS,
    borderTopLeftRadius: BORDER_RADIUS
  },
  rightButton: {
    borderBottomRightRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS
  },
  buttonTextStyle: {
	  color: "white",
    fontSize: 18
  }
})