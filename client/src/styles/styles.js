import { 
  StyleSheet
} from 'react-native';

export default StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: '#fff'
	},
	rowSpaceBetween: {
	  flexDirection: 'row', 
	  justifyContent: 'space-between', 
	  alignItems: 'center'
	},
	rowSpaceAround: {
	  flexDirection: 'row', 
	  justifyContent: 'space-around', 
	  alignItems: 'center'
	},
	rowLeft: {
	  flexDirection: 'row', 
	  justifyContent: 'flex-start', 
	  alignItems: 'center'
	},
	rowCenter: {
	  flexDirection: 'row', 
	  justifyContent: 'center', 
	  alignItems: 'center'
	},
	/*
	* Navigation
	*/
	tabNav: {
		height: 0,
		backgroundColor: 'black'
	}, 
	headerWrapper: {
		flex: 0,
		backgroundColor: 'black',
		// justifyContent: 'center',
		// alignItems: 'center',
		height: 44
	}
})