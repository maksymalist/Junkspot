import {
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  useColorScheme,
} from "react-native";

import { Text, View } from "../components/Themed";
import { useRoute } from "@react-navigation/native";
import { OfflineImage } from "types/offline_image";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { upload_image_class } from "../utils/upload_image";

import * as Network from "expo-network";
import { useNavigation } from "expo-router";

export default function ModalScreen() {
  const route = useRoute();
  const colorScheme = useColorScheme();
  const { image } = route.params as { image: OfflineImage };
  const [isPredicting, setIsPredicting] = useState<boolean>(false);
  const [predictionStep, setPredictionStep] = useState<number>(0);

  const [isConnected, setIsConnected] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    Network.getNetworkStateAsync().then((state: any) => {
      setIsConnected(state.isConnected);
    });
  };

  const steps = [
    "Converting image to base64...",
    "Uploading to AI model...",
    "Predicting...",
    "Done! ✅",
  ];

  const __predictionAPI = async () => {
    setIsPredicting(true);

    try {
      if (!image) return;
      setPredictionStep(1);

      const response = await axios.post(
        "https://junk-judge-web.vercel.app/api/predict",
        {
          image_b64: image.base64,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 5000, // Timeout value in milliseconds (e.g., 5 seconds)
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
        img_base64: image.base64,
        file_type: image.file_type,
      });

      // upload image to firebase data pipeline
      const img_url = await upload_image_class(
        image.base64,
        image.file_type,
        prediction
      );
      console.log("img_url", img_url);
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
      <Image
        source={{
          uri: `data:${image.file_type};base64,${image.base64}`,
        }}
        style={styles.camera}
      />
      <TouchableOpacity
        style={
          isConnected && !isPredicting
            ? styles.buttonPrimary
            : styles.buttonDisabled
        }
        onPress={__predictionAPI}
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
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
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
    marginTop: 20,
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
