import { StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import CameraComponent from "../../components/CameraComponent";
import { useState } from "react";

export default function TabOneScreen() {
  const [prediction, setPrediction] = useState<string>("unknown 🥷");

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>junk type: {prediction}</Text>
      </View>
      <CameraComponent setPrediction={setPrediction} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
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
