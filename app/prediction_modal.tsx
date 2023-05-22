import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  Image,
  useColorScheme,
} from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { useRoute } from "@react-navigation/native";
import PredictionImage from "../components/PredictionImage";

export default function ModalScreen() {
  const route = useRoute();
  const colorScheme = useColorScheme();
  const { prediction, img_base64, file_type } = route.params as any;

  return (
    <View style={styles.container}>
      <PredictionImage
        base64={img_base64}
        file_type={file_type}
        width={300}
        height={300}
      />
      <Text
        style={[
          styles.title,
          { color: colorScheme === "light" ? "#000" : "#fff" },
        ]}
      >
        {prediction}
      </Text>
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
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
