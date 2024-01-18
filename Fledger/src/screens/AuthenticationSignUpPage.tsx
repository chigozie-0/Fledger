import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert, // Import Alert for showing messages
  Keyboard
} from "react-native";
import { authenticateUserSignUp } from "../backend/backend_controller";

// Asynchronous function to handle the sign-up process.
async function signUp(
  name: string,
  username: string,
  password: string
): Promise<boolean> {
    let res = await authenticateUserSignUp(name, username, password);
    return res;
}

// Function to check if a password is strong.
function isPasswordStrong(password: string): boolean {
  // Check if the password is strong
  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);

  return hasMinLength && hasNumber;
}

const AuthenticationSignUpPage  = ({navigation}: {navigation: any}) => {
  // State variables to manage user input.
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameConflict, setUsernameConflict] = useState(false);

  // Function to handle the sign-up process.
  const handleSignUp = async () => {
    console.log("Signing Up");
    const success = await signUp(name, username, password);
    if (success) {
      // navigation.goBack();
      console.log("Navigating back to sign in page ")
      navigation.navigate("SignIn");
    }
    else
    {
      setUsernameConflict(true)
      console.log("Username conflict");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.designTop}></View>
      <Text style={styles.appName}>FLedger</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
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
        <TouchableOpacity style={styles.signUpButton} onPress={()=>{
          Keyboard.dismiss();
          handleSignUp();
        }}>
          <Text style={styles.loginButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.designBottom}></View>
      <Text style={styles.errorText}>
        {password != "" && !isPasswordStrong(password) && "Password is not strong" } 
      </Text>
      <Text style={styles.errorText}>
        {usernameConflict && "Username taken" } 
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "linear-gradient(to bottom, #330033, #660066)",
    justifyContent: "center",
    alignItems: "center"
  },
  designTop: {
    height: 40,
    backgroundColor: "transparent"
  },
  designBottom: {
    height: 40,
    backgroundColor: "transparent"
  },
  formContainer: {
    width: "80%"
  },
  input: {
    backgroundColor: "white",
    marginBottom: 10,
    padding: 15,
    borderRadius: 8
  },
  loginButton: {
    backgroundColor: "#ff6f61",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10
  },
  signUpButton: {
    backgroundColor: "#ff6f61",
    padding: 15,
    borderRadius: 8,
    alignItems: "center"
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
  },

  errorText: {
    color: "red",
    fontSize: 18,
    fontWeight: "bold"
  },

  appName: {
    fontSize: 48,
    color: "#ff6f61",
    marginBottom: 30,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  }
});

export default AuthenticationSignUpPage;