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
	  position: "relative",
    width: "100%",
    height: 300,
    display: "flex",
    justifyContent: "flex-end"
  },
  authorNameContainer: {
    backgroundColor: "rgba(0,0,0,0.8)"
  },
  authorName: {
    paddingVertical: 8,
    marginLeft: 6,
	  textAlign: "center",
    fontSize: 18,
    color: "white",
  },
  bio: {
	  padding: 10,
    paddingTop: 0,
    fontSize: 12,
    color: "#fff",
  },
  favIcon: {
    position: "absolute",
    top: 10,
    left: 20,
  },
  lifeDates: {
	  position: "absolute",
    paddingVertical: 3,
    paddingHorizontal: 5,
    backgroundColor: "rgba(0,0,0,0.5)",
    top: 10,
    right: 0,
    fontSize: 24,
    color: "#ccc"
  },
  separatorWrapper: {
	  marginVertical: 20
  },
  content: {
    padding: 10,
    paddingTop:0
  },
  contentContainer: {
    display: "flex",
    alignItems: "center"
  },
  headContainer: {
	  width: "27%"
  },
  name: {
    fontSize: 26
  },
  buttonsContainer: {
	  width: "57%",
    justifyContent: "space-between",
    marginVertical: 24,
  },
  button: {
	  width: "45%",
    paddingVertical: 5,
    paddingHorizontal: 6,
    borderWidth: 0.5,
    borderColor: "#333333"
  },
  leftButton: {
    borderRadius: BORDER_RADIUS,
    borderRadius: BORDER_RADIUS
  },
  rightButton: {
    borderRadius: BORDER_RADIUS,
    borderRadius: BORDER_RADIUS
  },
  buttonTextStyle: {
	  // color: "#333333",
    fontSize: 16
  },
  versesContainer: {
	  width:"100%"
  },
  verseWrapper: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#adadad"
  },
  verse: {
	  flex: 5,
    fontSize: 16,
  },
  emotionsViewContainer: {
	  flex: 1
  },
  verseTotalRating: {
	  backgroundColor: '#adadad',
    paddingHorizontal: 5,
    marginHorizontal: 3,
    borderRadius: 10,
    color: 'white'
  },
  wrappedIconStyle: {
	  position: 'relative',
  },
})