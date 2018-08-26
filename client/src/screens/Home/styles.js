import { 
  StyleSheet
} from 'react-native';
import { 
  AppStyles,
  AppColors
} from '@styles';

export default StyleSheet.create({
	container: {
    backgroundColor: "white"
	},
  contentContainer: {
    // justifyContent: "center",
    // alignItems: "center"
  },
  columnWrapperStyle: {
    // display: "flex",
    // flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center"
    paddingVertical: 20
  },
	listItem: {
    width: "50%",
    display: "flex",
    alignItems: "center"
	},
  image: {
	  width: 100,
    height: 100,
    borderRadius: 100
  },
  name: {
	  marginTop: 5
  }
})