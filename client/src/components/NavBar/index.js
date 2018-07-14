import React, { Component } from 'react';
import {
  View,
  Text,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { AppStyles } from '@styles';

class NavBar extends Component {

  render() {

    const {
      currentAuthor,
      currentVerses,
      currentVerse, 
      currentText,
      currentString
    } = this.props.authors;

    return (
      <View style={[AppStyles.headerWrapper]}>
        {
          currentAuthor && currentVerse ?
            <View style={AppStyles.rowLeft}>
              <Image 
                style={{
                  width: 30, 
                  height: 30,
                  borderRadius: 100,
                  marginLeft: 17
                }}
                source={currentAuthor.avatar}
              /> 
              <View style={{marginLeft: 10}}>
                <Text style={{color: 'white', fontSize: 11}}>{currentAuthor.name}</Text>
                <Text style={{color: 'white', fontSize: 11}}>{currentVerse.title}</Text>
              </View> 
            </View> :
            null
        }        
      </View>       
    );
  }
}

const mapStateToProps = state => ({
  authors: state.authors
});

export default connect(mapStateToProps)(NavBar);