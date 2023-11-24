import { useState } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { View, Text } from "./Themed";
import { OfflineImage } from "../types/offline_image";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";

type Props = {
  item: OfflineImage;
  navigation?: any;
  editMode: boolean;
  toggle: any;
  selected: boolean;
  sync: any;
};

const logStorage = async () => {
  const offlineImages = await AsyncStorage.getItem("offline_images");
  const parsed = JSON.parse(offlineImages || "[]") as OfflineImage[];
  parsed.forEach((i) => {
    i.base64 = "";
  });
  console.log("\n\n\n\n\n");
  console.log(parsed);
};

const update_local_image = async (image: OfflineImage) => {
  const offlineImages = await AsyncStorage.getItem("offline_images");
  if (offlineImages) {
    const parsedImages = JSON.parse(offlineImages) as OfflineImage[];
    const index = parsedImages.findIndex((i) => i.id === image.id);
    parsedImages[index] = image;
    await AsyncStorage.setItem("offline_images", JSON.stringify(parsedImages));
  }
};

export default function Base64Image(props: Props) {
  const [predicted, setPredicted] = useState<boolean>(props.item.predicted);
  const [predictedLabel, setPredictedLabel] = useState<string>(
    props.item.predicted_label || ""
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          //@ts-ignore
          props.navigation?.navigate("image_modal", {
            image: props.item,
            setPredicted: setPredicted,
            setPredictedLabel: setPredictedLabel,
            update_local_image: update_local_image,
            sync: props.sync,
          });
        }}
      >
        {
          //@ts-ignore
          predicted && (
            <View style={styles.prediction}>
              <MaterialIcons name="verified" size={18} color="#3ed54b" />
              <Text
                style={{ marginLeft: 5, color: "#fff", fontWeight: "bold" }}
              >
                {predictedLabel}
              </Text>
            </View>
          )
        }
        <Image
          source={{
            uri: `data:${props.item.file_type};base64,${props.item.base64}`,
          }}
          style={{ width: 100, height: 100 }}
        />
      </TouchableOpacity>
      {props.editMode && (
        <Checkbox
          style={{ marginTop: -22, marginLeft: 2, backgroundColor: "#fff" }}
          value={props.selected}
          onValueChange={() => {
            props.toggle(props.item);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  prediction: {
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    marginBottom: -22,
    zIndex: 1,
    padding: 2,
  },
});
