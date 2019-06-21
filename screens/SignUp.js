/* eslint-disable semi */
import React, {useEffect, useState}  from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Container, Content, Header, Form, Input, Item, Button, Label
} from 'native-base';
import { signUp, login, loginWithFacebook } from '../store';
import { connect } from 'react-redux';

// make an on change handler with a given stter
// will take the event and call the setter with that target's value

const SignUp = (props) => {

  const [email, setEmail] = useState(props.user.email);
  const [password, setPassword] = useState(props.user.password);
  const [age, setAge] = useState(props.user.age);
  const [breed, setBreed] = useState(props.user.breed);
  const [imgUrl, setImgUrl] = useState(props.user.imgUrl);
  const [owner, setOwner] = useState(props.user.owner);
  const [name, setName] = useState(props.user.name)
  let newUser = {
    email,
    age,
    breed,
    imgUrl,
    owner,
    name
  }

  return (
    <Container>
    <View style={styles.container}>
    <ScrollView>
      <Form>
      <Item floatingLabel>
        <Label>Name:</Label>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={(input) => setName(input)}
          />
      </Item>
      <Item floatingLabel>
        <Label>Age:</Label>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={(input) => setAge(input)}
          />
      </Item>
      <Item floatingLabel>
        <Label>Breed:</Label>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={(input) => setBreed(input)}
          />
      </Item>
      <Item floatingLabel>
        <Label>ImgUrl:</Label>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={(input) => setImgUrl(input)}
          />
      </Item>
      <Item floatingLabel>
        <Label>Owner Name:</Label>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={(input) => setOwner(input)}
          />
      </Item>
      <Item floatingLabel>
        <Label>Email:</Label>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={(mail) => setEmail(mail)}
          />
      </Item>
      <Item floatingLabel>
        <Label>Password:</Label>
        <Input
          secureTextEntry={true}
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={(pass) => setPassword(pass)}
          />
      </Item>

      <Button
        style = {{marginTop: 10}}
        full
        rounded
        primary
        onPress = {() => {
          if (password.length < 6) {
            alert("Password must be at least 6 characters")
          } else {props.signUp(newUser, password)}
          }}
      >
        <Text>Sign Up</Text>
      </Button>

      <Button
        style = {{marginTop: 10}}
        full
        rounded
        primary
        onPress = {() => {props.loginWithFacebook()}}
      >
        <Text>Login with Facebook</Text>
      </Button>

    </Form>
    </ScrollView>
    </View>
    </Container>
  )
}

const mapStateToProps = (state) => {
  let user = state.user;
  return { user };
}

const mapDispatchToProps = dispatch => {
  return { signUp: (newUser, password) => dispatch(signUp(newUser, password)), login: (email, password) => dispatch(login(email, password)),
  loginWithFacebook: () => dispatch(loginWithFacebook()) };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: '30%',
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
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
