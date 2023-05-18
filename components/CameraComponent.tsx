import { Camera, CameraCapturedPicture, CameraType } from "expo-camera";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { load_image_base64_encoding, save_to_local } from "../utils/save_local";
import CameraPreview from "./CameraPreview";

import * as Network from "expo-network";

type Props = {
  setPrediction: React.Dispatch<React.SetStateAction<string>>;
};

export default function CameraComponent(props: Props) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [isPredicting, setIsPredicting] = useState<boolean>(false);

  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] =
    useState<CameraCapturedPicture | null>(null);
  let cam: Camera | null;
  const setPrediction = props.setPrediction;

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
    // predict the image and upload to firebase
    const predction = await axios.post(
      "http://143.110.214.128:5000/api/v1/predict",
      {
        image:
          "https://junk-judge-models.s3.us-west-2.amazonaws.com/IMG_2439.jpg",
      }
    );
    // TODO : upload the image to firebase then replace the mock image url

    console.log("predction", predction.data);
    setPrediction(predction.data);
    setIsPredicting(false);
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
