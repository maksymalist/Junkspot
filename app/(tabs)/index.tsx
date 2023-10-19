import { StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import CameraComponent from "../../components/CameraComponent";
import { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { auth } from "../../firebase";

export default function TabOneScreen() {
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

  return (
    <View style={styles.container}>
      <CameraComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
