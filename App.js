import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import store from './store';
import {Provider} from 'react-redux';

import AppNavigator from './navigation/AppNavigator';

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (

      <Provider store={store}>
        <View style={styles.container}>
    <ImageBackground
    source={{uri: 'https://firebasestorage.googleapis.com/v0/b/doggiebook-3d1a6.appspot.com/o/7175.jpg?alt=media&token=a4385bd5-ade0-43ee-a7ae-63c7fbcf65e1'}}
    style={{width: '100%', height: '100%', flex: 1}}
    imageStyle={{resizeMode: 'stretch'}}
 >
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
        </ImageBackground>
        </View>
      </Provider>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);
}

function handleLoadingError(error: Error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
