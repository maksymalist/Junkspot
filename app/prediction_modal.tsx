import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  Image,
  useColorScheme,
  Button,
} from "react-native";
import { useState } from "react";

import { Text, View } from "../components/Themed";
import { useRoute } from "@react-navigation/native";
import PredictionImage from "../components/PredictionImage";

export default function ModalScreen() {
  const route = useRoute();
  const colorScheme = useColorScheme();
  const { prediction, img_base64, file_type } = route.params as any;
  //const prediction = "cardboard";

  const [cardboardIsDirty, setCardboardIsDirty] = useState(false);
  const [selectedDirtyCardboard, setSelectedDirtyCardboard] = useState(false);

  const [paperIsDirty, setPaperIsDirty] = useState(false);
  const [selectedDirtyPaper, setSelectedDirtyPaper] = useState(false);

  return (
    <View style={styles.container}>
      <PredictionImage
        base64={img_base64}
        file_type={file_type}
        width={300}
        height={300}
      />
      {
        prediction == "glass" ? (
          <Text style={styles.title}>Recyclable</Text>
        ) : // DONE
        prediction == "metal" ? (
          <Text style={styles.title}>Recyclable</Text> // DONE
        ) : prediction == "paper" ? (
          <View style={styles.subContainer}>
            {selectedDirtyPaper ? (
              <>
                {paperIsDirty ? (
                  <View>
                    <Text style={styles.title}>Compostable</Text>
                    <Button
                      onPress={() => {
                        setSelectedDirtyPaper(false);
                      }}
                      title="go back 👀"
                    />
                  </View>
                ) : (
                  <View>
                    <Text style={styles.title}>Recyclable</Text>
                    <Button
                      onPress={() => {
                        setSelectedDirtyPaper(false);
                      }}
                      title="go back 👀"
                    />
                  </View>
                )}
              </>
            ) : (
              <>
                <Text style={styles.title}>it's {prediction}!</Text>
                <Text style={{ fontSize: 20, marginTop: 40, marginBottom: 40 }}>
                  Is it dirty? 🐷
                </Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.buttonPrimary}
                    onPress={() => {
                      setPaperIsDirty(true);
                      setSelectedDirtyPaper(true);
                    }}
                  >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>
                      Yes ✅
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonSecondary}
                    onPress={() => {
                      setPaperIsDirty(false);
                      setSelectedDirtyPaper(true);
                    }}
                  >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>
                      No ❌
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View> // Check if dirty
        ) : prediction == "cardboard" ? (
          <View style={styles.subContainer}>
            {selectedDirtyCardboard ? (
              <>
                {cardboardIsDirty ? (
                  <View>
                    <Text style={styles.title}>Compostable</Text>
                    <Button
                      onPress={() => {
                        setSelectedDirtyCardboard(false);
                      }}
                      title="go back 👀"
                    />
                  </View>
                ) : (
                  <View>
                    <Text style={styles.title}>Recyclable</Text>
                    <Button
                      onPress={() => {
                        setSelectedDirtyCardboard(false);
                      }}
                      title="go back 👀"
                    />
                  </View>
                )}
              </>
            ) : (
              <>
                <Text style={styles.title}>it's {prediction}!</Text>
                <Text style={{ fontSize: 20, marginTop: 40, marginBottom: 40 }}>
                  Is it dirty? 🐷
                </Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.buttonPrimary}
                    onPress={() => {
                      setCardboardIsDirty(true);
                      setSelectedDirtyCardboard(true);
                    }}
                  >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>
                      Yes ✅
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonSecondary}
                    onPress={() => {
                      setCardboardIsDirty(false);
                      setSelectedDirtyCardboard(true);
                    }}
                  >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>
                      No ❌
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View> // Check if dirty
        ) : prediction == "plastic" ? (
          <Text style={styles.title}>Recyclable</Text> // Check if bendable and other stuff
        ) : prediction == "biological" ? (
          <Text style={styles.title}>Compostable</Text> // DONE
        ) : prediction == "trash" ? (
          <Text style={styles.title}>Trash</Text>
        ) : (
          <Text style={styles.title}>No clue!</Text>
        ) // DONE
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 40,
  },
  subContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 10,
    width: "100%",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    marginTop: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "80%",
  },
  buttonPrimary: {
    backgroundColor: "#3ed54b",
    width: 100,
    maxWidth: 350,
    height: 50,
    borderRadius: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonSecondary: {
    backgroundColor: "#c73cdb",
    width: 100,
    maxWidth: 350,
    height: 50,
    borderRadius: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
