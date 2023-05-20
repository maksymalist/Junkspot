import { StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { Text, View } from "../../components/Themed";

import { auth } from "../../firebase";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

export default function ProfileTab() {
  const currentUser = auth.currentUser;

  const navigation = useNavigation();

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

  const signOut = () => {
    auth.signOut();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>" {currentUser?.displayName} "</Text>
      <Text style={styles.email}>{currentUser?.email}</Text>
      <TouchableOpacity style={styles.buttonSecondary} onPress={signOut}>
        <Text style={styles.textBold}> Sign Out </Text>
        <FontAwesome5 name="sign-out-alt" size={15} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  email: {
    fontSize: 15,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },

  button: {
    backgroundColor: "#fff",
    width: 50,
    height: 50,
    borderRadius: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  linkButtonText: {
    color: "#8AB3FD",
    textDecorationLine: "underline",
  },
  snackbar: {
    backgroundColor: "#fff",
    width: "100%",
    maxWidth: 350,
    height: 50,
    borderRadius: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    marginTop: 10,
  },
  buttonSecondary: {
    backgroundColor: "#FF4365",
    width: "100%",
    maxWidth: 350,
    height: 50,
    borderRadius: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 20,
  },
  text: {
    padding: 0,
  },
  textBold: {
    fontWeight: "bold",
    color: "#fff",
  },
});
