import React from 'react';
import { Text } from 'react-native';
import {
  Container, Content, Header, Form, Input, Item, Button, Label
} from 'native-base';

export const Auth = () => {
  return (
    <Form>
      <Item floatingLabel>
        <Label>Email:</Label>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          />
      </Item>
      <Item floatingLabel>
        <Label>Password:</Label>
        <Input
          secureTextEntry={true}
          autoCorrect={false}
          autoCapitalize="none"
          />
      </Item>
      <Button
        style = {{marginTop: 10}}
        full
        rounded
        success
      >
        <Text>Login</Text>
      </Button>

      <Button
        style = {{marginTop: 10}}
        full
        rounded
        primary
      >
        <Text>Sign Up</Text>
      </Button>

    </Form>
  )
}
