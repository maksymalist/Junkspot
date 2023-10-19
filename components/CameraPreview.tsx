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
import {
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

import * as Network from "expo-network";

const CameraPreview = ({
  photo,
  retakePicture,
  savePhoto,
  predictionAPI,
  isPredicting,
  predictionStep,
}: any) => {
  const colorScheme = useColorScheme();
  const [isConnected, setIsConnected] = useState(false);

  const steps = [
    "Converting image to base64...",
    "Uploading to AI model...",
    "Predicting...",
    "Done! ✅",
  ];

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
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: colorScheme === "dark" ? "#fff" : "#000",
                  fontSize: 15,
                }}
              >
                re-take
              </Text>
              <Ionicons name="refresh" size={24} color="black" />
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
                flexDirection: "row",
                justifyContent: "center",
                paddingHorizontal: 10,
              }}
            >
              <Text
                style={{
                  color: colorScheme === "dark" ? "#fff" : "#000",
                  fontSize: 15,
                  marginRight: 5,
                }}
              >
                save photo
              </Text>
              <Feather name="download" size={24} color="black" />
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
            "identify"
          )}{" "}
        </Text>
        {!isPredicting ? (
          <MaterialIcons name="bubble-chart" size={24} color="white" />
        ) : null}
      </TouchableOpacity>
      {isConnected && isPredicting ? (
        <Text
          style={{
            color: colorScheme === "dark" ? "#fff" : "#000",
            fontSize: 18,
            marginTop: 40,
            fontWeight: "bold",
          }}
        >
          {steps[predictionStep]}
        </Text>
      ) : null}
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
    borderRadius: 10,
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
    backgroundColor: "#3ed54b",
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
