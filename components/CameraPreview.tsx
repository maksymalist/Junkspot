import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  useColorScheme,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import * as Network from "expo-network";

const CameraPreview = ({
  photo,
  retakePicture,
  savePhoto,
  predictionAPI,
  isPredicting,
}: any) => {
  const colorScheme = useColorScheme();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    Network.getNetworkStateAsync().then((state: any) => {
      setIsConnected(state.isConnected);
    });
  };
  return (
    <View
      style={{
        display: "flex",
        width: "100%",
        alignItems: "center",
      }}
    >
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={styles.camera}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            padding: 15,
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={retakePicture}
              style={{
                width: 130,
                height: 40,
                backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
                alignItems: "center",
                borderRadius: 50,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: colorScheme === "dark" ? "#fff" : "#000",
                  fontSize: 15,
                }}
              >
                Re-take
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={savePhoto}
              style={{
                width: 130,
                height: 40,
                backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
                alignItems: "center",
                borderRadius: 50,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: colorScheme === "dark" ? "#fff" : "#000",
                  fontSize: 15,
                }}
              >
                save photo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <TouchableOpacity
        style={
          isConnected && !isPredicting
            ? styles.buttonPrimary
            : styles.buttonDisabled
        }
        onPress={predictionAPI}
        disabled={isConnected && !isPredicting ? false : true}
      >
        <Text style={styles.textBold}>
          {" "}
          {isPredicting ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            "predict"
          )}{" "}
        </Text>
        {!isPredicting ? (
          <MaterialIcons name="bubble-chart" size={24} color="white" />
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

export default CameraPreview;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 10,
  },
  sub_container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  camera: {
    margin: 10,
    width: "100%",
    maxWidth: 350,
    height: "100%",
    maxHeight: 450,
    borderRadius: 10,
  },
  buttonContainer: {
    padding: 5,
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
  buttonPrimary: {
    backgroundColor: "#87C159",
    width: "100%",
    maxWidth: 350,
    height: 50,
    borderRadius: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
    width: "100%",
    maxWidth: 350,
    height: 50,
    borderRadius: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    padding: 0,
  },
  textBold: {
    fontWeight: "bold",
    color: "#fff",
  },
});
