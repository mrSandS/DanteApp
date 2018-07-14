import { 
  StyleSheet,
  Dimensions
} from 'react-native';
import { 
  AppStyles,
  AppColors
} from '@styles';

const {
	width,
	height
} = Dimensions.get('window');

export const TOP_PANEL_MARGIN_TOP_VALUE =  0;
export const BOTTOM_PANEL_FLEX_VALUE = 0.23;
export const TAB_BAR_MARGIN_BOTTOM_VALUE = 0;
export const VERSES_LIST_TOP_VALUE = 140;

export const TOP_PANEL_MARGIN_TOP_TO_VALUE =  -120;
export const BOTTOM_PANEL_FLEX_TO_VALUE = 0.25;
export const TAB_BAR_MARGIN_BOTTOM_TO_VALUE = -60;
export const VERSES_LIST_TOP_TO_VALUE = height;

export const CONTROL_PANEL_BUTTONS_SIZE = 40;

const CONTROL_PANEL_HOR_PADDINGS = 50;

// export const CONTROL_PANEL_WIDTH = width - CONTROL_PANEL_HOR_PADDINGS * 2;
export const PROGRESS_BAR_WIDTH = width;

export default StyleSheet.create({
	container: {
	  alignItems: 'center',
	  justifyContent: 'center',
	  width
	},
	avatarsPanelWrapper: {
	  flex:1,
	  height: 100
	},
	avatarsScrollView: {
		paddingTop: 10
	},
	avatarsImageWrapper: {
		width: 90,
  	height: 90
	},
	avatarsImage: {  
		width: '100%',
		height: '100%',                  
		borderRadius: 100
	},
	avatarsPanelAdditionslView: {
		flex: 1
	},

	versesListWrapper: {
		width: '100%', 
		height: '100%', 
		backgroundColor: 'white',
		position: 'absolute', 
		zIndex: 1
	},
	versesListItemWrapper: {		
	  padding: 15,
	  borderBottomWidth: 0.5,
	  borderBottomColor: AppColors.gray 	
	},
	versesItemTitle: {
		fontSize: 16
	},

	verseTextWrapper: {
	  position: 'absolute',
	  zIndex: 0,
	  top: 250,
	  height: 100,
	},
	verseText: {
	  fontSize: 18, 
	  textAlign: 'center', 
	  color: '#777'
	},

	controlPanelWrapper: {
		width: '100%', 		 
		paddingHorizontal: CONTROL_PANEL_HOR_PADDINGS
	},
	controlPanelAuthorInfo: {
		flex: 0
	},
	controlPanelAuthorImage: {
    width: 30, 
    height: 30,
    borderRadius: 100
  },
  controlPanelAuthorName: {
  	paddingLeft: 7
  },
  controlPanelVerseTitle: {
  	marginTop:4
  },
  controlPanelButtonsWrapper: {
  	flex: 0,
    marginTop: 6
  },
  controlPanelProgressBarWrapper: {
  	width: '100%', 
  	height: 5  	
	},
	controlPanelProgressBar: {
		height: '100%', 
		backgroundColor: '#0f83d8'
	},	

	stringProgressBarWrapper: {
		width: '100%', 
		height: 20,  
		marginTop: 10,

		justifyContent: 'center',
		alignItems: 'center'
	}
})