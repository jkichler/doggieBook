/* eslint-disable semi */
import React, {useEffect, useState}  from 'react';
import { Text, ImageBackground } from 'react-native';
import {
  Container, Content, Header, Form, Input, Item, Button, Label
} from 'native-base';
import { signUp, login, loginWithFacebook } from '../store';
import { connect } from 'react-redux';

// make an on change handler with a given stter
// will take the event and call the setter with that target's value

const Login = (props) => {
  console.log('props:', props.navigation)

  const [email, setEmail] = useState(props.email);
  const [password, setPassword] = useState(props.password);

  return (
    <ImageBackground
    source={{uri: 'https://firebasestorage.googleapis.com/v0/b/doggiebook-3d1a6.appspot.com/o/7175.jpg?alt=media&token=a4385bd5-ade0-43ee-a7ae-63c7fbcf65e1'}}
    style={{width: '100%', height: '100%', flex: 1}}
    imageStyle={{resizeMode: 'stretch', opacity: 0.7}}
 >
    <Form
    style={{color: 'black'}}
    >
      <Item floatingLabel
      style={{color: 'black'}}
      >
        <Label
        style={{color: 'black'}}
        >Email:</Label>
        <Input
        style={{color: 'black'}}
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={(mail) => setEmail(mail)}
          />
      </Item>
      <Item floatingLabel>
        <Label
        style={{color: 'black'}}
        >Password:</Label>
        <Input
        style={{color: 'black'}}
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
        onPress = {() =>  {if (email === undefined) {
          alert('Please enter an email address')
        }  else
          {props.login(email, password)
           props.navigation.navigate('Home')
          }

        }

        }
      >
        <Text
        style={{color: 'white'}}
        >Login</Text>
      </Button>

      <Button
        style = {{marginTop: 10}}
        full
        rounded
        primary
        onPress = {() => {
          props.loginWithFacebook()
          props.navigation.navigate('Home')
        }}
      >
        <Text
        style={{color: 'white'}}
        >Login with Facebook</Text>
      </Button>

    </Form>
    </ImageBackground>
  )
}

const mapStateToProps = (state) => {
  let dogs = state.dogs;
  let email = state.email;
  let password = state.password;
  return { dogs, email, password };
}

const mapDispatchToProps = dispatch => {
  return { signUp: (email, password) => dispatch(signUp(email, password)), login: (email, password) => dispatch(login(email, password)),
  loginWithFacebook: () => dispatch(loginWithFacebook()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
