import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { View, Text } from "./Themed";
import { OfflineImage } from "../types/offline_image";
import { useNavigation } from "expo-router";

type Props = {
  item: OfflineImage;
  navigation?: any;
};

export default function Base64Image(props: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          //@ts-ignore
          props.navigation?.navigate("image_modal", { image: props.item });
        }}
      >
        <Image
          source={{
            uri: `data:${props.item.file_type};base64,${props.item.base64}`,
          }}
          style={{ width: 100, height: 100 }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});
