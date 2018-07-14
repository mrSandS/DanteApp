import React from 'react';
import { 
  Text, 
  View,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Animated,
  Easing 
} from 'react-native';
import { connect } from 'react-redux';
import {
  setAuthors,
  setCurrentValues
} from '@redux/reducers/authors';
import { 
  AppStyles, 
  AppColors 
} from '@styles';
import styles from './styles';
import {
  TOP_PANEL_MARGIN_TOP_VALUE,
  BOTTOM_PANEL_FLEX_VALUE,
  TAB_BAR_MARGIN_BOTTOM_VALUE,
  VERSES_LIST_TOP_VALUE,

  TOP_PANEL_MARGIN_TOP_TO_VALUE,
  BOTTOM_PANEL_FLEX_TO_VALUE,
  TAB_BAR_MARGIN_BOTTOM_TO_VALUE,
  VERSES_LIST_TOP_TO_VALUE,

  CONTROL_PANEL_BUTTONS_SIZE,
  PROGRESS_BAR_WIDTH
} from './styles';
// import data from '@assets/data';
import {
  Avatar,
  Button
} from '@components';

const TEXT_CHANGE_DURATION = 3500;
const ANIMATION_DURATION = 400;

/*
* 1. Not to set author in nav bar when setting authors initially
* 2. Not to change a verse in nav bar when pressing author avatar 
* and change the current author
* 3. Update current author after adding to / removing from the favorites 
*/

const getProgressBarPercent = ({index, length}) => {
  return ((  index / (length - 1) ) * 100);
};
const getFavoriteAuthors = data => {
  return data.filter(author => author.isFavorite);
};
class Player extends React.Component {  
  static navigationOptions = {

  }
  componentWillMount () {
    this.props.setAuthors()
    /*
    * Setting animation values
    */
    this.animatedVersesList = new Animated.Value(VERSES_LIST_TOP_VALUE);
    this.animatedStringProgressLine = new Animated.Value(0);
    this.animatedTopPanelMarginTop = new Animated.Value(TOP_PANEL_MARGIN_TOP_VALUE);
    this.animatedBottomPanelFlex = new Animated.Value(BOTTOM_PANEL_FLEX_VALUE);
    this.props.navigation.setParams({
      tabBarMarginBottom: new Animated.Value(TAB_BAR_MARGIN_BOTTOM_VALUE)
    });
    /*
    * Setting main data
    */
    this.setData(this.props.authors);
  }
  componentWillUpdate (nextProps, nextState) {
    const {
      authors: {
        isPlaying
      }
    } = nextProps;

    this.setData(nextProps.authors);

    if (this.props.authors.isPlaying !== isPlaying) {
      this.changePlayingMode({isPlayingMode: isPlaying});
    }
    // if (isPlaying) {
    //   this.animatedStringProgressLine = new Animated.Value(0);
    //   this.createAnimation({
    //     value: this.animatedStringProgressLine, 
    //     toValue: PROGRESS_BAR_WIDTH,
    //     duration: TEXT_CHANGE_DURATION,
    //     easing: Easing.linear
    //   })
    // }
  }
  setData = authors => {
    const {
      favorites,
      currentAuthorIndex, 
      currentVerseIndex, 
      currentVerseStringIndex,
      isPlaying,

      currentAuthor,
      currentVerses,
      currentVerse,
      currentText,
      currentString
    } = authors;

    if (favorites.length) {
      this.favoriteAuthors = favorites;
      this.currentAuthor = currentAuthor;
      this.currentVerses = currentVerses;
      this.currentVerse = currentVerse;
      this.currentText = currentText;
      this.currentString = currentString;

      this.isFirstVerseString = currentVerseStringIndex === 0;
      this.isLastVerseString = currentVerseStringIndex === this.currentText.length - 1;
      this.isFirstVerse = currentVerseIndex === 0;
      this.isLastVerse = currentVerseIndex === this.currentAuthor.verses.length - 1;

      // this.progressBarWidth = getProgressBarPercent({
      //   index: currentVerseStringIndex, 
      //   length: this.currentText.length
      // }) + '%';
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
  changePlayingMode = ({isPlayingMode}) => {

    let topPanelMarginTopToValue;
    let bottomPanelFlexToValue;
    let tabBarMarginBottomToValue;
    let versesListTopToValue;

    if (isPlayingMode) {
      topPanelMarginTopToValue = TOP_PANEL_MARGIN_TOP_TO_VALUE;
      bottomPanelFlexToValue = BOTTOM_PANEL_FLEX_TO_VALUE;
      tabBarMarginBottomToValue = TAB_BAR_MARGIN_BOTTOM_TO_VALUE;
      versesListTopToValue = VERSES_LIST_TOP_TO_VALUE;
    } else {
      topPanelMarginTopToValue = TOP_PANEL_MARGIN_TOP_VALUE;
      bottomPanelFlexToValue = BOTTOM_PANEL_FLEX_VALUE;
      tabBarMarginBottomToValue = TAB_BAR_MARGIN_BOTTOM_VALUE;
      versesListTopToValue = VERSES_LIST_TOP_VALUE;
    }

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
      }),
      this.createAnimation({
        value: this.animatedVersesList,
        toValue: versesListTopToValue
      })        
    ]).start();
        
  }
  onAvatarPress = currentAuthorIndex => {
    this.props.setCurrentValues({
      currentAuthorIndex,
      currentVerseIndex: 0,
      currentVerseStringIndex: 0
    })
    // this.props.navigation.setParams({
    //   navBarData: {
    //     avatarSource: this.favoriteAuthors[currentAuthorIndex].avatar,
    //     name: this.favoriteAuthors[currentAuthorIndex].name,
    //     verseTitle: null
    //   }
    // });
  }
  onTextPress = () => {
    if (!this.isLastVerseString) {
      this.props.setCurrentValues({
        currentVerseStringIndex: this.props.authors.currentVerseStringIndex + 1
      })
    }
  }
  onVersesListItemPress = id => {
    let verseInx;
    this.currentVerses.forEach((verse, inx) => {
      if (verse._id === id) {
        this.props.setCurrentValues({
          currentVerseIndex: inx,
          currentVerseStringIndex: 0,
          isPlaying: true
        })
        verseInx = inx;
      }
    });
  }
  versesListItemRender = ({item, index}) => {
    const backgroundColor = index%2 === 0 ? 'white' : '#fafafa';
    return <TouchableOpacity 
      onPress={() => this.onVersesListItemPress(item._id)} 
      style={[ AppStyles.rowLeft, styles.versesListItemWrapper, {backgroundColor}]}
    >
      <Text style={styles.versesItemTitle}>{item.title}</Text>
    </TouchableOpacity>
  }
  render() {
    
    if (this.props.authors.favorites.length) {
      return (
        <View style={[AppStyles.container, styles.container]}>
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
            * Verses List
            */
          }
          <Animated.View style={[styles.versesListWrapper, {top: this.animatedVersesList}]}>
            <View style={{alignItems: 'center'}}>
              <Button
                iconName='ios-search-outline'
              />
            </View>

            <View style={[AppStyles.rowLeft, {flex: 0, marginLeft: 15, marginTop: 40, marginBottom: 10}]}>
              <Avatar 
                size={30}
                source={this.currentAuthor.avatar}
              />
              <Text style={{fontSize: 18, marginLeft: 6}}>{this.currentAuthor.name}:</Text>
            </View>

            <FlatList 
              // style={{marginTop: 10}}
              data={this.currentVerses}
              renderItem={this.versesListItemRender}
              keyExtractor={item => `key=${item._id}`}
            />
          </Animated.View>              
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
            * Bottom Panel
            */
            <View style={{marginBottom: 20}}>
              <Button 
                onPress={()=>this.props.setCurrentValues({isPlaying: false})}
                iconName='ios-list-outline'
                iconSize={50}
              />
            </View>                
          }
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
  setAuthors: () => dispatch(setAuthors()),
  setCurrentValues: payload => dispatch(setCurrentValues(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);