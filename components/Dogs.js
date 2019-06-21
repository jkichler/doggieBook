import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  PanResponder,
  Animated,
  Dimensions //gets dimensions of device
} from 'react-native';

import { Card, ListItem, Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { getDogs } from '../store/index';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    width: width -20,
    height: height * 0.6,
    top: (height * 0.3) / 2,
    overflow: 'hidden',
    backgroundColor: 'darkorchid',
    margin: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 12,
  },
  pic: {
    height: height * 0.5,
    width: width - 20
  },
});


class Dogs extends Component {

  // componentDidMount () {
  //   this.props.getDogs();
  // }

  componentWillMount() {
    this.pan = new Animated.ValueXY();
    this.cardPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        { dx: this.pan.x, dy: this.pan.y }, //takes an array, dx is distance traveled
      ]),
      onPanResponderRelease: (event, gesture) => {
        const threshold = Math.abs(gesture.dx);
        const direction = threshold / gesture.dx

        if (threshold > 120) {
          // if swipe is greater than threshold, remove card
          Animated.decay(this.pan, {
            velocity: {x: 3* direction, y:0},
            deceleration: 0.995,
          }).start();
        } else {
          Animated.spring(this.pan, { //spring back animation
            toValue: {x: 0, y: 0}, //spring back to center
            friction: 5 //friction of animation higher is more friction
          }).start(); //starts the animation
        }
      },
    });
  }



  render() {
    const rotateCard = this.pan.x.interpolate({  //this sets card rotation on move
      inputRange: [-200, 0, 200],
      outputRange: ['-10deg', '0deg', '10deg']
    });

    const animatedStyle = {
      transform: [
        {translateX: this.pan.x},
        {translateY: this.pan.y},
        {rotate: rotateCard}
      ]
    };
    const { name, age, breed, imgUrl } = this.props.profile;
    return (
      <Animated.View
        {...this.cardPanResponder.panHandlers}
        style={[animatedStyle]}
      >
        <Card
          containerStyle={styles.card}
          title={name}
          titleStyle={{fontSize: 20, color: 'white'}}
          image= {{uri: imgUrl}}
          imageStyle={styles.pic}
          >
          <Text style={{marginBottom: 10, color: 'white'}}>
          {`${this.props.profile.breed}, ${this.props.profile.age} years old`}
          </Text>
        </Card>
      </Animated.View>
    );
  }
}

//  const mapStateToProps = (state) => {
//    let dogs = state.dogs;
//    return { dogs };
//  }

//  const mapDispatchToProps = dispatch => {
//    return { getDogs: () => dispatch(getDogs()) };
//  };

export default Dogs

// export default connect(mapStateToProps, mapDispatchToProps)(Dogs);
