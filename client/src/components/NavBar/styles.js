import { 
  StyleSheet
} from 'react-native';
import { 
  AppStyles,
  AppColors
} from '@styles';

export default StyleSheet.create({
	container: {
    // position: 'absolute',
    top: 0,
    width: '100%',
    // zIndex: 1,
  },
  innerContainer: {
    // position: 'absolute',
    // top: 0,
    // width: '100%',
    zIndex: 1,
  },
  mainInfoWrapper: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#adadad',
    zIndex: 2
  },
  title: {
	  marginHorizontal: 10
  },
  titleText: {
	  marginHorizontal: 5
  },
  slidingContainer: {
	  position: 'relative'
  },
  authorsPanel: {
	  zIndex:0,
    backgroundColor: "white"
  },
  versesPanel: {
	  // position: 'absolute',
    // top:-20,
    // width: '100%',
    // zIndex:0
  },
  verseTitleWrapper: {
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderBottomColor: '#adadad',

  },
  verseTitle: {
    paddingVertical: 8,
    paddingHorizontal: 20
    // textAlign: "center"
  }
})