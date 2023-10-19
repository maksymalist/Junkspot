import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { auth } from "../../firebase";

const LoginScreen = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      if (!user) {
        //@ts-ignore
        navigation?.navigate("(auth)");
      } else {
        //@ts-ignore
        navigation?.navigate("(tabs)");
      }
    });

    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    if (displayName === "" || email === "" || password === "") {
      return alert("Please fill in all fields");
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials: any) => {
        const user = userCredentials.user;
        console.log("Registered with:", user.email);
        // add display name

        auth.currentUser?.updateProfile({
          displayName: displayName,
        });

        // login user

        auth.signInWithEmailAndPassword(email, password);
      })
      .catch((error: any) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nickname"
          value={displayName}
          onChangeText={(text) => setDisplayName(text)}
          style={colorScheme === "dark" ? styles.input_dark : styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={colorScheme === "dark" ? styles.input_dark : styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={colorScheme === "dark" ? styles.input_dark : styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignUp} style={styles.button}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  input_dark: {
    backgroundColor: "#333",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    color: "white",
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#3ed54b",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});
