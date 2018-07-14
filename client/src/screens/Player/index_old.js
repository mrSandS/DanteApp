import React from 'react';
import { 
  Text, 
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Animated,
  Easing 
} from 'react-native';
import { connect } from 'react-redux';
import {
  setAuthors
} from '@redux/reducers/authors';
import appStyles from '@styles';
import styles from './styles';
import {
  TOP_PANEL_MARGIN_TOP_VALUE,
  BOTTOM_PANEL_FLEX_VALUE,
  TAB_BAR_MARGIN_BOTTOM_VALUE,
  TOP_PANEL_MARGIN_TOP_TO_VALUE,
  BOTTOM_PANEL_FLEX_TO_VALUE,
  TAB_BAR_MARGIN_BOTTOM_TO_VALUE,

  CONTROL_PANEL_BUTTONS_SIZE,
  PROGRESS_BAR_WIDTH
} from './styles';
// import data from '@assets/data';
import {
  Button
} from '@components';

const TEXT_CHANGE_DURATION = 3500;
const ANIMATION_DURATION = 400;

const getProgressBarPercent = ({index, length}) => {
  return ((  index / (length - 1) ) * 100);
};
const getFavoriteAuthors = data => {
  return data.filter(author => author.isFavorite);
};
class Player extends React.Component {  
  state = {
    currentAuthorIndex: 0,
    currentVerseIndex: 0,
    currentVerseStringIndex: 0,
    isPlaying: false
  }
  componentWillMount () {
    this.props.setAuthors()
    /*
    * Setting animation values
    */
    this.animatedStringProgressLine = new Animated.Value(0);
    this.animatedTopPanelMarginTop = new Animated.Value(TOP_PANEL_MARGIN_TOP_VALUE);
    this.animatedBottomPanelFlex = new Animated.Value(BOTTOM_PANEL_FLEX_VALUE);
    this.props.navigation.setParams({
      tabBarMarginBottom: new Animated.Value(TAB_BAR_MARGIN_BOTTOM_VALUE)
    });
    /*
    * Setting main data
    */
    const {
      currentAuthorIndex,
      currentVerseIndex,
      currentVerseStringIndex,
      isPlaying
    } = this.state;
    const {
      authors: {
        data: authorsData
      }
    } = this.props;
    const favoriteAuthors = getFavoriteAuthors(authorsData);

    
    this.setData({
      favoriteAuthors,
      currentAuthorIndex, 
      currentVerseIndex, 
      currentVerseStringIndex,
      isPlaying
    });
  }
  componentWillUpdate (nextProps, nextState) {
    const {
      currentAuthorIndex,
      currentVerseIndex,
      currentVerseStringIndex,
      isPlaying
    } = nextState;
    const {
      authors: {
        data: authorsData
      }
    } = nextProps;
    const favoriteAuthors = getFavoriteAuthors(authorsData);

    this.setData({
      favoriteAuthors,
      currentAuthorIndex, 
      currentVerseIndex, 
      currentVerseStringIndex,
      isPlaying
    });
    if (isPlaying) {
      this.animatedStringProgressLine = new Animated.Value(0);
      this.createAnimation({
        value: this.animatedStringProgressLine, 
        toValue: PROGRESS_BAR_WIDTH,
        duration: TEXT_CHANGE_DURATION,
        easing: Easing.linear
      })
    }
    if (this.state.isPlaying !== isPlaying) {
      this.animate(isPlaying);
    }
  }
  setData = ({
    favoriteAuthors,
    currentAuthorIndex, 
    currentVerseIndex, 
    currentVerseStringIndex,
    isPlaying
  }) => {

    if (favoriteAuthors.length) {
      this.timeout && clearTimeout(this.timeout);
      this.favoriteAuthors = favoriteAuthors;
      this.currentAuthor = this.favoriteAuthors[currentAuthorIndex];
      this.currentVerse = this.currentAuthor.verses[currentVerseIndex];
      this.currentText = this.currentVerse.text
      .split('\n')
      .filter(string => string)
      .map(string => string.trim())
      this.currentString = this.currentText[currentVerseStringIndex];

      this.isFirstVerseString = currentVerseStringIndex === 0;
      this.isLastVerseString = currentVerseStringIndex === this.currentText.length - 1;
      this.isFirstVerse = currentVerseIndex === 0;
      this.isLastVerse = currentVerseIndex === this.currentAuthor.verses.length - 1;

      this.progressBarWidth = getProgressBarPercent({
        index: currentVerseStringIndex, 
        length: this.currentText.length
      }) + '%';

      if (isPlaying) {
        this.setNewTimeout(currentVerseStringIndex);      
      }
      
    }
  }
  setNewTimeout = (currentVerseStringIndex) => {
  	if (this.isLastVerseString) {
	  	this.setState({
	  	  isPlaying: false
	  	})  		
  	} else {
  		this.timeout = setTimeout(()=>{
  			this.setState({
  			  currentVerseStringIndex: currentVerseStringIndex + 1
  			})          
  		}, TEXT_CHANGE_DURATION);
  	}
  }
  createAnimation = ({
    value,
    toValue,
    duration=ANIMATION_DURATION,
    easing=Easing.ease
  }) => {
    return Animated.timing(
      value,
      {
        toValue,
        duration,
        easing
      }
    ).start();
  }
  animate = isPlaying => {

    let topPanelMarginTopToValue;
    let bottomPanelFlexToValue;
    let tabBarMarginBottomToValue;

    if (isPlaying) {
      delay = 0;
      topPanelMarginTopToValue = TOP_PANEL_MARGIN_TOP_TO_VALUE;
      bottomPanelFlexToValue = BOTTOM_PANEL_FLEX_TO_VALUE;
      tabBarMarginBottomToValue = TAB_BAR_MARGIN_BOTTOM_TO_VALUE;
    } else {
      delay = TEXT_CHANGE_DURATION;
      topPanelMarginTopToValue = TOP_PANEL_MARGIN_TOP_VALUE;
      bottomPanelFlexToValue = BOTTOM_PANEL_FLEX_VALUE;
      tabBarMarginBottomToValue = TAB_BAR_MARGIN_BOTTOM_VALUE;
    }

    setTimeout(()=>{
      Animated.parallel([
        this.createAnimation({
          value: this.animatedTopPanelMarginTop, 
          toValue: topPanelMarginTopToValue
        }),
        this.createAnimation({
          value: this.animatedBottomPanelFlex,
          toValue: bottomPanelFlexToValue    
        }),
        this.createAnimation({
          value: this.props.navigation.state.params.tabBarMarginBottom,
          toValue: tabBarMarginBottomToValue
        })        
      ]).start()
    }, delay)    
  }
  onAvatarPress = currentAuthorIndex => {
    this.setState({
      currentAuthorIndex,
      currentVerseIndex: 0,
      currentVerseStringIndex: 0
    })
  }
  onPreviousButtonPress = () => {
    if (this.isFirstVerseString) {
      this.setState({
        currentVerseIndex: this.state.currentVerseIndex - 1,
        currentVerseStringIndex: 0
      })
    } else {
      this.setState({
        currentVerseStringIndex: 0
      })
    }
  }
  onNextButtonPress = () => {
    this.setState({
      currentVerseIndex: this.state.currentVerseIndex + 1,
      currentVerseStringIndex: 0
    })
  }
  onPauseButtonPress = () => {    
    this.setState({
      isPlaying: false
    })
  }
  onPlayButtonPress = () => {
    this.setState({
      isPlaying: true
    })
  }
  onRepeatButtonPress = () => {
  	this.setState({
  		currentVerseStringIndex: 0,
  		isPlaying: true
  	})
  }
  onTextPress = () => {
    if (!this.isLastVerseString) {
      this.setState({
        currentVerseStringIndex: this.state.currentVerseStringIndex + 1
      })
    }
  }
  render() {
    console.log('CURRENT AUTHOR:', {
      currentAuthorIndex: this.state.currentAuthorIndex,
      currentVerseIndex: this.state.currentVerseIndex,
      currentVerseStringIndex: this.state.currentVerseStringIndex
    });
    const favoriteAuthors = getFavoriteAuthors(this.props.authors.data);
    if (favoriteAuthors.length) {
      return (
        <View style={[appStyles.container, styles.container]}>
          {
            /*
            * Verse progress bar
            */
          }
          {
            // <View style={styles.controlPanelProgressBarWrapper}>
            //   <View 
            //     style={[
            //       styles.controlPanelProgressBar, 
            //       {width: this.progressBarWidth}
            //     ]}>
            //   </View>
            // </View>  
          }
          {
            /*
            * String progress bar
            */
            <View style={{
              width: '100%',
              // justifyContent: 'flex-start'
            }}>
              <Animated.View
                style={{
                  height: 5,
                  backgroundColor: '#d80f7c',
                  width: this.animatedStringProgressLine
                }}
              >
              </Animated.View>
            </View>  
          }
          {
            /*
            * Authors avatars
            */
          }
          <View style={styles.avatarsPanelWrapper}>
            <Animated.ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={[styles.avatarsScrollView, {marginTop: this.animatedTopPanelMarginTop}]}
            >
              {

                this.favoriteAuthors.map((el, inx) => {
                  return <TouchableOpacity
                    onPress={() => this.onAvatarPress(inx)}
                    key={inx}
                    style={styles.avatarsImageWrapper}
                  >  
                    <Image 
                      style={styles.avatarsImage}
                      source={el.avatar}
                    />
                  </TouchableOpacity>
                })
              }     
            </Animated.ScrollView>
            <View style={styles.avatarsPanelAdditionslView}></View>
          </View>  
          {
            /*
            * Text
            */
          }
          {
            <TouchableHighlight
              onPress={this.onTextPress}
              underlayColor='#fff'
              style={styles.verseTextWrapper}
            >
              <Text style={styles.verseText}>{
                this.currentString
              }</Text>
            </TouchableHighlight>            
          }

          
          {
            /*
            * Bottom panel
            */
          }
          <Animated.View
            style={[styles.controlPanelWrapper, {flex: this.animatedBottomPanelFlex}]}
          >
            {
              /*
              * Author avatar and name
              */
            }
            <View style={[appStyles.rowLeft, styles.controlPanelAuthorInfo]}>
              <Image 
                source={this.currentAuthor.avatar}
                style={styles.controlPanelAuthorImage}
              />
              <Text style={styles.controlPanelAuthorName}>{this.currentAuthor.name}</Text>
            </View>
            {
              /*
              * Verse title
              */
            }
            <Text style={styles.controlPanelVerseTitle}>{this.currentVerse.title}</Text>

            {
              /*
              * Buttons
              */
            }
            <View 
              style={[appStyles.rowSpaceBetween, styles.controlPanelButtonsWrapper]}
            >
              <Button
                onPress={this.onPreviousButtonPress}
                iconName='ios-skip-backward'
                iconSize={CONTROL_PANEL_BUTTONS_SIZE}
              />

              {
                this.state.isPlaying && this.state.currentVerseStringIndex !== this.currentText.length - 1 ?
  	 							<Button
  	 							  onPress={this.onPauseButtonPress}
  	 							  iconName='ios-pause'
  	 							  iconSize={CONTROL_PANEL_BUTTONS_SIZE}
  	 							/> :
                	null
              }

              {
                !this.state.isPlaying && this.state.currentVerseStringIndex !== this.currentText.length - 1 ?
  	              <Button
  	                onPress={this.onPlayButtonPress}
  	                iconName='ios-play'
  	                iconSize={CONTROL_PANEL_BUTTONS_SIZE}
  	              /> :
  	              null
  	          }

  	          {
                !this.state.isPlaying && this.state.currentVerseStringIndex === this.currentText.length - 1 ?
  	              <Button
  	                onPress={this.onRepeatButtonPress}
  	                iconName='md-refresh'
  	                iconSize={CONTROL_PANEL_BUTTONS_SIZE}
  	              /> :
  	              null              
  	          }
                          
              <Button
                disable={this.isLastVerse} 
                onPress={this.onNextButtonPress}
                iconName='ios-skip-forward'
                iconSize={CONTROL_PANEL_BUTTONS_SIZE}
              />
            </View>
            {
              /*
              * String progress bar
              */
            }
            {
              // <View style={styles.stringProgressBarWrapper}>
              //   <Image 
              //     style={{width: '100%', height: '100%'}}
              //     source={require('@assets/images/wave-line2.png')}
              //     resizeMode='contain'
              //   />
              //   <Animated.View 
              //     style={[
              //     {
              //       width: '100%',
              //       height: '100%',
              //       backgroundColor: '#fff',                  
              //       position: 'absolute'
              //     },
              //     {
              //       right: this.animatedStringProgressLine,
              //     }]
              //   }
              //   >
              //   </Animated.View>
              // </View>
            }            

            
          </Animated.View>
        </View>
      ); 
    }
    return null
  }
}

const mapStateToProps = state => ({
  authors: state.authors
});

const mapDispatchToProps = dispatch => ({
  setAuthors: () => dispatch(setAuthors())
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);