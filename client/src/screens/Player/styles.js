import { 
  StyleSheet,
  Dimensions
} from 'react-native';
import { 
  AppStyles,
  AppColors
} from '@styles';

export default StyleSheet.create({
	container: {
	  height: "100%",
    backgroundColor: "#f2f2f2"
	},
  navBarTitle: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 8
  },
  scrollViewContentContainer: {
	  marginTop: 120,
    marginBottom: 20,
    marginHorizontal: 15
  },
  verse: {
	  fontSize: 17,
    lineHeight: 23
  },
	emotionsPanel: {
		position: "absolute",
		bottom: 0,
		width: "100%",
    backgroundColor: "white",
    paddingVertical: 10
	}
})