import React from "react";
import { Image, StyleSheet } from "react-native";
import { View, Text } from "./Themed";
import { OfflineImage } from "../types/offline_image";

type Props = {
  item: OfflineImage;
};

export default function Base64Image(props: Props) {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: `data:${props.item.file_type};base64,${props.item.base64}`,
        }}
        style={{ width: 100, height: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});
