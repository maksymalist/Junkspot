import { Camera, CameraCapturedPicture, CameraType } from "expo-camera";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { load_image_base64_encoding, save_to_local } from "../utils/save_local";
import CameraPreview from "./CameraPreview";
import { useNavigation } from "expo-router";
import { base64_to_url, upload_image_class } from "../utils/upload_image";

export default function CameraComponent() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [isPredicting, setIsPredicting] = useState<boolean>(false);

  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] =
    useState<CameraCapturedPicture | null>(null);
  let cam: Camera | null;

  const navigation = useNavigation();

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  async function takePicture() {
    if (permission && !permission.granted) {
      requestPermission();
      console.log("permission", permission);
    } else {
      const photo = await cam?.takePictureAsync();
      if (!photo) return;
      setCapturedImage(photo);
      setPreviewVisible(true);
    }
  }

  const __savePhoto = async () => {
    if (!capturedImage) return;

    console.log("capturedImage", capturedImage);
    const image = await load_image_base64_encoding(capturedImage.uri);
    await save_to_local(image.base64String, image.fileType);
    setCapturedImage(null);
    setPreviewVisible(false);
  };
  const __retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
  };

  const __predictionAPI = async () => {
    setIsPredicting(true);

    try {
      // upload image to firebase
      if (!capturedImage) return;
      const item = await load_image_base64_encoding(capturedImage.uri);
      console.log("item", item);
      const image_url = await base64_to_url(item.base64String, item.fileType);
      console.log("image_url", image_url);
      if (!image_url) return;

      const predction = await axios.post(
        "http://147.182.152.133:5000/api/v1/predict",
        {
          image: image_url.url,
        }
      );

      console.log("predction", predction);

      if (!predction.data) return;

      const real_url = await upload_image_class(
        item.base64String,
        item.fileType,
        predction.data,
        image_url.temp_id
      );

      console.log("real_url", real_url);
      setIsPredicting(false);

      //@ts-ignore
      navigation.navigate("prediction_modal", {
        prediction: predction.data,
        url: real_url,
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <View style={styles.container}>
      {previewVisible && capturedImage ? (
        <View style={styles.sub_container}>
          <CameraPreview
            photo={capturedImage}
            savePhoto={__savePhoto}
            retakePicture={__retakePicture}
            predictionAPI={__predictionAPI}
            isPredicting={isPredicting}
          />
        </View>
      ) : (
        <View style={styles.sub_container}>
          <Camera
            style={styles.camera}
            type={type}
            ref={(r) => {
              cam = r;
            }}
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={toggleCameraType}
              >
                <Text style={styles.text}>
                  {type === CameraType.back ? (
                    <Ionicons
                      name="camera-reverse-sharp"
                      size={24}
                      color="black"
                    />
                  ) : (
                    <Ionicons
                      name="camera-reverse-outline"
                      size={24}
                      color="black"
                    />
                  )}
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
          <TouchableOpacity style={styles.buttonPrimary} onPress={takePicture}>
            <Text style={styles.textBold}> trash goes there 👆</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

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
