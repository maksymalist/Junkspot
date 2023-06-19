import { Camera, CameraCapturedPicture, CameraType } from "expo-camera";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios, { AxiosRequestConfig } from "axios";
import { load_image_base64_encoding, save_to_local } from "../utils/save_local";
import CameraPreview from "./CameraPreview";
import { useNavigation } from "expo-router";
import { upload_image_class } from "../utils/upload_image";
import * as ImageManipulator from "expo-image-manipulator";
import { createNotionEntry } from "../utils/notion";

export default function CameraComponent() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [isPredicting, setIsPredicting] = useState<boolean>(false);
  const [predictionStep, setPredictionStep] = useState<number>(0);

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

      // Resize the image

      const resizedPhoto = await ImageManipulator.manipulateAsync(
        photo.uri,
        [{ resize: { width: 224 } }], // resize to width of 300 and preserve aspect ratio
        { compress: 0.7 }
      );
      setCapturedImage(resizedPhoto);
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

    try {
      if (!capturedImage) return;
      //@ts-ignore
      const item = await load_image_base64_encoding(capturedImage.uri);
      setPredictionStep(1);

      const response = await axios.post(
        "https://junk-judge-web.vercel.app/api/predict",
        {
          image_b64: item.base64String,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000, // Timeout value in milliseconds (e.g., 5 seconds)
        }
      );

      // Handle the response here
      const prediction = response.data.result[0];

      setPredictionStep(2);

      console.log("prediction", prediction);

      if (!prediction) return;
      setPredictionStep(3);
      setIsPredicting(false);
      setPredictionStep(0);
      //@ts-ignore
      navigation.navigate("prediction_modal", {
        prediction: prediction,
        img_base64: item.base64String,
        file_type: item.fileType,
      });

      // upload image to firebase data pipeline
      const data = await upload_image_class(
        item.base64String,
        item.fileType,
        prediction
      );

      createNotionEntry(
        data.url,
        prediction,
        item.fileType,
        data.size,
        data.key
      );
      console.log("img_url", data.url);
    } catch (error: any) {
      if (axios.isCancel(error)) {
        alert("Request canceled");
        setIsPredicting(false);
        setPredictionStep(0);
      } else {
        // Handle other errors here
        alert(error?.message || "Unknown Error");
        setIsPredicting(false);
        setPredictionStep(0);
      }
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
            predictionStep={predictionStep}
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
