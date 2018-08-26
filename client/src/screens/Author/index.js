import React from 'react';
import {
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import {
  Button
} from '@components';
import Icon from 'react-native-ionicons';
import Utils from '@services/utils';
import { connect } from 'react-redux';
import {
  AppStyles,
  AppColors
} from '@styles';
import styles from './styles';

class Author extends React.Component {
  // static navigationOptions = ({navigation}) => {
  // };
  constructor(props) {
    super(props);
    this.state = {
      author: null,
      activeButton: "verses"
    };
  }
  componentWillMount () {
    const authorId = this.props.navigation.getParam("id");
    const author = this.props.authors.data.find(el => el._id === authorId);
    this.setState({
      author
    });
  }
  render() {
    const {
      author,
      activeButton
    } = this.state;
    if (!author) {
      return null;
    }
    const {
      name,
      _id
    } = author;
    const getActiveColor = isActive => isActive ?  "#adadad" : "#fff";
    return <View style={styles.container}>
      <Image
        source={{
          uri: Utils.getAvatar(_id),
          headers: {'Cache-Control': 'no-cache'}
        }}
        style={styles.photo}
      />
      <ScrollView style={styles.contentContainer}>
        <View style={AppStyles.rowSpaceAround}>
          <Text style={styles.name}>{name}</Text>
          <Icon
            name="ios-star-outline"
            size={40}
            color="#adadad"
          />
        </View>
        <View style={[AppStyles.rowCenter, styles.buttonsContainer]}>
          <Button
            title="Стихи"
            containerStyle={[styles.button, styles.leftButton, {backgroundColor: getActiveColor(activeButton === "verses")}]}
            textStyle={[styles.buttonTextStyle, {color: getActiveColor(activeButton === "bio")}]}
          />
          <Button
            title="Биография"
            containerStyle={[styles.button, styles.rightButton, {backgroundColor: getActiveColor(activeButton === "bio")}]}
            textStyle={[styles.buttonTextStyle, {color: getActiveColor(activeButton === "verses")}]}
          />
        </View>
        <View>
          {
            author.verses.map(verse => {
              return <Text key={verse._id}>{verse.title}</Text>
            })
          }
        </View>
      </ScrollView>
    </View>
  }
}

const mapStateToProps = state => ({
  authors: state.authors
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Author);