import React, { Component, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  PanResponder,
  Animated,
  Dimensions //gets dimensions of device
} from 'react-native';

import { Card, ListItem, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { getDogs } from '../store/index';
import { Button } from 'native-base';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    width: width -20,
    height: height * 0.65,
    top: (height * 0.1) / 2,
    overflow: 'hidden',
    backgroundColor: 'darkorchid',
    margin: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 12,
  },
  pic: {
    height: height * 0.4,
    width: width - 20
  },
});


function Dogs (props) {
  const pan = new Animated.ValueXY();

  const cardPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      { dx: pan.x, dy: pan.y }, //takes an array, dx is distance traveled
    ]),
    onPanResponderRelease: (event, gesture) => {
      const threshold = Math.abs(gesture.dx);
      const direction = threshold / gesture.dx

      if (threshold > 120) {
        // if swipe is greater than threshold, remove card
        Animated.decay(pan, {
          velocity: {x: 3* direction, y:0},
          deceleration: 0.995,
        }).start(props.onSwipeOff);
      } else {
        Animated.spring(pan, { //spring back animation
          toValue: {x: 0, y: 0}, //spring back to center
          friction: 5 //friction of animation higher is more friction
        }).start(); //starts the animation
      }
    },
  });
  useEffect(() => {
}, []);

    const rotateCard = pan.x.interpolate({  //this sets card rotation on move
      inputRange: [-200, 0, 200],
      outputRange: ['-10deg', '0deg', '10deg']
    });

    const animatedStyle = {
      transform: [
        {translateX: pan.x},
        {translateY: pan.y},
        {rotate: rotateCard}
      ]
    };
    const { name, age, breed, imgUrl } = props.profile;
    return (
      <Animated.View
        {...cardPanResponder.panHandlers}
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
          {`${props.profile.breed}, ${props.profile.age} years old`}
          </Text>
          <Button
           style = {{marginTop: 10}}
           full
           rounded
           primary
          >
            <Text>Walk with {props.profile.name}</Text>
          </Button>
        </Card>
      </Animated.View>
    );
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
