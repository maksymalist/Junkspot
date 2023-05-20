import { Platform, StyleSheet, TouchableOpacity, Image } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { useRoute } from "@react-navigation/native";
import { base64_to_url } from "../utils/upload_image";

export default function ModalScreen() {
  const route = useRoute();
  const { prediction, url } = route.params as any;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: url }}
        style={{ width: 300, height: 300, borderRadius: 10 }}
      />
      <Text style={styles.title}>{prediction}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
    color: "#000",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
