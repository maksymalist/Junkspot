import React from "react";
import { Image, StyleSheet } from "react-native";
import { View, Text } from "./Themed";
import { OfflineImage } from "../types/offline_image";

type Props = {
  base64: string;
  file_type: string;
  width: number;
  height: number;
};

export default function PredictionImage(props: Props) {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: `data:${props.file_type};base64,${props.base64}`,
        }}
        style={{ width: props.width, height: props.height }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});
