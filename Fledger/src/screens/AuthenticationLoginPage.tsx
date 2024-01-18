/* eslint-disable */
import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AppData, { authenticateUserLogin, getServers } from '../backend/backend_controller';
import { LocalUserContext } from '../../App';

async function signIn(username: string, password: string): Promise<boolean> {
  let res = await authenticateUserLogin(username, password);
    return res;
}

const AuthenticationLoginPage = ({navigation}: {navigation: any}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);

  const {
    localUser,
    setLocalUser
  } = useContext(LocalUserContext);

  const handleLogin = async () => {
    const success = await signIn(username, password);

    if (success) {
      console.log('Log in was successful');
      // Here, user can navigate to the homepage as the login was successful
      setLocalUser(AppData.localUser);
      navigation.navigate("Home");
      
    } else {
      console.log('Log in was not successful. Check username and password.');
    }
    setUsername('')
    setPassword('')
  };

  const moveToSignUpPage = () => {navigation.navigate("SignUp");}

  return (
    <View style={styles.container}>
      <View style={styles.designTop}></View>
      <Text style={styles.appName}>FLedger</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={moveToSignUpPage}>
          <Text style={styles.loginButtonText}>New? Sign up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.designBottom}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'linear-gradient(to bottom, #330033, #660066)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  designTop: {
    height: 40,
    backgroundColor: 'transparent',
  },
  designBottom: {
    height: 40,
    backgroundColor: 'transparent',
  },
  formContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 15,
    borderRadius: 8,
  },
  loginButton: {
    backgroundColor: '#ff6f61',
    marginBottom: 20,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  appName: {
    fontSize: 48,
    color: '#ff6f61',
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

export default AuthenticationLoginPage;