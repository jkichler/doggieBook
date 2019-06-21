/* eslint-disable semi */
import React, {useEffect, useState}  from 'react';
import { Text } from 'react-native';
import {
  Container, Content, Header, Form, Input, Item, Button, Label
} from 'native-base';
import { signUp, login } from '../store';
import { connect } from 'react-redux';

// make an on change handler with a given stter
// will take the event and call the setter with that target's value

const Auth = (props) => {

  const [email, setEmail] = useState(props.email);
  const [password, setPassword] = useState(props.password);

  return (
    <Form>
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
        success
        onPress = {() => {props.login(email, password)}}
      >
        <Text>Login</Text>
      </Button>

      <Button
        style = {{marginTop: 10}}
        full
        rounded
        primary
        onPress = {() => {
          if (password.length < 6) {
            alert("Password must be at least 6 characters")
          } else {props.signUp(email, password)}
          }}
      >
        <Text>Sign Up</Text>
      </Button>

    </Form>
  )
}

const mapStateToProps = (state) => {
  let dogs = state.dogs;
  let email = state.email;
  let password = state.password;
  return { dogs, email, password };
}

const mapDispatchToProps = dispatch => {
  return { signUp: (email, password) => dispatch(signUp(email, password)), login: (email, password) => dispatch(login(email, password)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
