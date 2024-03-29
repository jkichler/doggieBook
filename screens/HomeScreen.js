import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import {
  // Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  // TouchableOpacity,
  View,
  ImageBackground
} from 'react-native';
import {
  Container, Content, Header, Form, Input, Item, Button, Label
} from 'native-base';

import { connect } from 'react-redux';
import { getDogs, goWalking } from '../store/index';
// import { MonoText } from '../components/StyledText';
// import Auth from '../components/auth';
import Dogs from '../components/Dogs';


function distance(lat1, lon1, lat2, lon2, unit) {
  const radlat1 = Math.PI * lat1/180
  const radlat2 = Math.PI * lat2/180
  const radlon1 = Math.PI * lon1/180
  const radlon2 = Math.PI * lon2/180
  const theta = lon1-lon2
  const radtheta = Math.PI * theta/180
  let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist)
  dist = dist * 180/Math.PI
  dist = dist * 60 * 1.1515
  if (unit=="K") { dist = dist * 1.609344 }
  if (unit=="N") { dist = dist * 0.8684 }
  return dist
}

function HomeScreen(props) {
  useEffect(() => {
    props.getDogs();
  }, []);
  const [idx, setIdx] = useState(0);
  console.log('idx', idx)

  // const rotate = (idx) => {
  //   idx = idx + 1;
  //   setIdx(idx);
  //   console.log('idx:', idx)
  //   console.log('length', props.dogs.length)
  // };

  const rotate = (idx) => {
    idx = idx + 1;
    if (idx >= props.dogs
      .filter(el => distance(
        props.user.location.coords.latitude,
        props.user.location.coords.longitude,
        el.location.coords.latitude,
        el.location.coords.longitude
      ) < 1)
      .length) {idx = 0;}
    setIdx(idx);
    console.log('idx:', idx)
    console.log('length', props.dogs.length)
  };

  return (
    <Container>
    <View style={styles.container}>
    <ImageBackground
    source={{uri: 'https://firebasestorage.googleapis.com/v0/b/doggiebook-3d1a6.appspot.com/o/7175.jpg?alt=media&token=a4385bd5-ade0-43ee-a7ae-63c7fbcf65e1'}}
    style={{width: '100%', height: '100%', flex: 1}}
    imageStyle={{resizeMode: 'stretch'}}
 >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>

        <View style={styles.getStartedContainer}>


          <Text style={styles.getStartedText}>
            Welcome to Doggie Book
          </Text>

        </View>

       {props.user.loggedIn ? ( <Button
        style = {{marginTop: 10}}
        full
        rounded
        primary
        onPress = {() => {
          setIdx(0)
          props.getDogs()
          props.goWalking(props.user)
        }}
      >
        <Text
        style={{color: 'white'}}
        >Go Walking</Text>
        </Button>
       ) : (
         <Text
         style={{color: 'white', textAlign: 'center', marginTop: "40%", fontSize: 17}}
         > Please Log In or Sign Up </Text>
       )
       }
      {props.user.walking ?
        (
          props.dogs
          .filter(el => distance(
            props.user.location.coords.latitude,
            props.user.location.coords.longitude,
            el.location.coords.latitude,
            el.location.coords.longitude
          ) < 1)
          .slice(idx, idx + 3)
          .reverse()
          .map((el) => {
        return (
          <Dogs
          key={el.id}
          profile={el}
          onSwipeOff={() => {
            rotate(idx)
        }}
          />
        );
      })
      ) : (

          <Text></Text>

      )

      }
      </ScrollView>

      {/* <View style={styles.tabBarInfoContainer}>
        <Text style={styles.tabBarInfoText}>
          This is a tab bar. You can edit it in:
        </Text>

        <View
          style={[styles.codeHighlightContainer, styles.navigationFilename]}>
          <MonoText style={styles.codeHighlightText}>
            navigation/MainTabNavigator.js
          </MonoText>
        </View>
      </View> */}
    </ImageBackground>
    </View>
    </Container>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const mapStateToProps = (state) => {
  let dogs = state.dogs;
  let user = state.user;

  return { dogs, user };
}

const mapDispatchToProps = dispatch => {
  return { getDogs: () => dispatch(getDogs()), goWalking: (user) => dispatch(goWalking(user)) };
};


// function DevelopmentModeNotice() {
//   if (__DEV__) {
//     const learnMoreButton = (
//       <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
//         Learn more
//       </Text>
//     );

//     return (
//       <Text style={styles.developmentModeText}>
//         Development mode is enabled: your app will be slower but you can use
//         useful development tools. {learnMoreButton}
//       </Text>
//     );
//   } else {
//     return (
//       <Text style={styles.developmentModeText}>
//         You are not in development mode: your app will run at full speed.
//       </Text>
//     );
//   }
// }

// function handleLearnMorePress() {
//   WebBrowser.openBrowserAsync(
//     'https://docs.expo.io/versions/latest/workflow/development-mode/'
//   );
// }

// function handleHelpPress() {
//   WebBrowser.openBrowserAsync(
//     'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 24,
    color: 'white',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
