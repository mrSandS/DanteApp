import { 
  StyleSheet
} from 'react-native';
import { 
  AppStyles,
  AppColors
} from '@styles';

export const ACCENT_COLOR = '#f5e23a';

export default StyleSheet.create({
	container: {
    backgroundColor: "white",
	},
  contentContainer: {
    paddingBottom: 20
    // justifyContent: "center",
    // alignItems: "center"
  },
  columnWrapperStyle: {
    // display: "flex",
    // flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center"
    // borderBottomWidth: 0.5,
    // borderBottomColor: "#adadad",
    marginTop: 40

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
	  marginTop: 5,
    textAlign: "center"
  },
  date: {
    textAlign: "center"
  },
  headerWrapper: {
    paddingTop: 30,
    paddingBottom: 30,
    borderBottomWidth: 0.5,
    borderBottomColor: "#adadad",
  },
  iconWrapper: {

  },
})