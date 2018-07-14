import React from 'react';
import {
  Text, 
  View,
  Image,
  FlatList
} from 'react-native';
import {
  Avatar,
  Button
} from '@components';
import { connect } from 'react-redux';
import { 
  AppStyles,
  AppColors
} from '@styles';
import {
  setAuthors,
  addToFavorites,
  removeFromFavorites
} from '@redux/reducers/authors';
// import styles from './styles';
import data from '@assets/data';

class Search extends React.Component {
  componentWillMount () {
    this.props.setAuthors()
  }  
  onAddButtonPress = id => {
    this.props.addToFavorites(id);
  }
  onRemoveButtonPress = id => {
    this.props.removeFromFavorites(id);
  }
  renderItem = ({item}) => {
    return <View style={[AppStyles.rowLeft, {
      padding: 20,
      borderBottomWidth: 0.5,
      borderBottomColor: AppColors.gray
    }]}>
      <Avatar 
        source={item.avatar}
      />
      <View style={[AppStyles.rowSpaceBetween, {paddingHorizontal: 10}]}>
        <Text style={{
          color: AppColors.text
        }}>{item.name}</Text>
        {
          item.isFavorite ?
          <Button 
            onPress={() => this.onRemoveButtonPress(item._id)}
            iconName='ios-remove-outline'
          /> :
          <Button 
            onPress={() => this.onAddButtonPress(item._id)}
            iconName='ios-add'
          />          
        }
      </View>
    </View>    
  }
  render() {

    return (
      <View style={AppStyles.container}>
        {
          <FlatList 
            data={this.props.authors.data}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => `key=${item._id}`}
          />
        }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  authors: state.authors
});

const mapDispatchToProps = dispatch => ({
  setAuthors: () => dispatch(setAuthors()),  
  addToFavorites: payload => dispatch(addToFavorites(payload)),
  removeFromFavorites: payload => dispatch(removeFromFavorites(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);