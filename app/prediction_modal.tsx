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
  const { prediction1, img_base64, file_type } = route.params as any;
  const prediction = "trash";

  // Cardboard state
  const [cardboardIsDirty, setCardboardIsDirty] = useState(false);
  const [selectedDirtyCardboard, setSelectedDirtyCardboard] = useState(false);

  // Paper state
  const [paperIsDirty, setPaperIsDirty] = useState(false);
  const [selectedDirtyPaper, setSelectedDirtyPaper] = useState(false);

  // Plastic state
  const [isRigidPlastic, setIsRigidPlastic] = useState(false); // ither is rigid or flexible
  const [selectedRigidPlastic, setSelectedRigidPlastic] = useState(false);

  const [isRecyclablePlastic, setIsRecyclablePlastic] = useState(false); // ither is recyclable or not
  const [selectedRecyclablePlastic, setSelectedRecyclablePlastic] =
    useState(false);

  const [isStrechablePlastic, setIsStrechablePlastic] = useState(false); // ither is stretchable or not
  const [selectedStrechablePlastic, setSelectedStrechablePlastic] =
    useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>it's {prediction}!</Text>
      <PredictionImage
        base64={img_base64}
        file_type={file_type}
        width={300}
        height={300}
      />
      {
        prediction == "glass" ? (
          <>
            <Text style={styles.title}>Recyclable</Text>
            <View style={{ marginBottom: 30 }} />
            <Image
              source={{
                uri: "https://img.icons8.com/?size=256&id=ulWyep8ifsWu&format=png",
              }}
              width={200}
              height={200}
              alt="recyclable"
            />
          </>
        ) : prediction == "metal" ? (
          <>
            <Text style={styles.title}>Recyclable</Text>
            <View style={{ marginBottom: 30 }} />
            <Image
              source={{
                uri: "https://img.icons8.com/?size=256&id=ulWyep8ifsWu&format=png",
              }}
              width={200}
              height={200}
              alt="recyclable"
            />
          </>
        ) : prediction == "paper" ? (
          <View style={styles.subContainer}>
            {selectedDirtyPaper ? (
              <>
                {paperIsDirty ? (
                  <View style={styles.subContainer}>
                    <Text style={styles.title}>Compostable</Text>
                    <Button
                      onPress={() => {
                        setSelectedDirtyPaper(false);
                      }}
                      title="go back 👀"
                    />
                    <View style={{ marginBottom: 5 }} />
                    <Image
                      source={{
                        uri: "https://img.icons8.com/?size=256&id=m4aadlK9yuE1&format=png",
                      }}
                      width={200}
                      height={200}
                      alt="compostable"
                    />
                  </View>
                ) : (
                  <View style={styles.subContainer}>
                    <Text style={styles.title}>Recyclable</Text>
                    <Button
                      onPress={() => {
                        setSelectedDirtyPaper(false);
                      }}
                      title="go back 👀"
                    />
                    <View style={{ marginBottom: 5 }} />
                    <Image
                      source={{
                        uri: "https://img.icons8.com/?size=256&id=ulWyep8ifsWu&format=png",
                      }}
                      width={200}
                      height={200}
                      alt="recyclable"
                    />
                  </View>
                )}
              </>
            ) : (
              <>
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
                  <View style={styles.subContainer}>
                    <Text style={styles.title}>Compostable</Text>
                    <Button
                      onPress={() => {
                        setSelectedDirtyCardboard(false);
                      }}
                      title="go back 👀"
                    />
                    <View style={{ marginBottom: 5 }} />
                    <Image
                      source={{
                        uri: "https://img.icons8.com/?size=256&id=m4aadlK9yuE1&format=png",
                      }}
                      width={200}
                      height={200}
                      alt="compostable"
                    />
                  </View>
                ) : (
                  <View style={styles.subContainer}>
                    <Text style={styles.title}>Recyclable</Text>
                    <Button
                      onPress={() => {
                        setSelectedDirtyCardboard(false);
                      }}
                      title="go back 👀"
                    />
                    <View style={{ marginBottom: 5 }} />
                    <Image
                      source={{
                        uri: "https://img.icons8.com/?size=256&id=ulWyep8ifsWu&format=png",
                      }}
                      width={200}
                      height={200}
                      alt="recyclable"
                    />
                  </View>
                )}
              </>
            ) : (
              <>
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
          <View style={styles.subContainer}>
            {selectedRigidPlastic ? (
              <>
                {isRigidPlastic ? (
                  <>
                    {selectedRecyclablePlastic ? (
                      <>
                        {isRecyclablePlastic ? (
                          <View style={styles.subContainer}>
                            <Text style={styles.title}>Recyclable</Text>
                            <Button
                              onPress={() => {
                                setSelectedRigidPlastic(false);
                                setSelectedRecyclablePlastic(false);
                              }}
                              title="go back 👀"
                            />
                            <View style={{ marginBottom: 5 }} />
                            <Image
                              source={{
                                uri: "https://img.icons8.com/?size=256&id=ulWyep8ifsWu&format=png",
                              }}
                              width={200}
                              height={200}
                              alt="recyclable"
                            />
                          </View>
                        ) : (
                          <View style={styles.subContainer}>
                            <Text style={styles.title}>Trash</Text>
                            <Button
                              onPress={() => {
                                setSelectedRigidPlastic(false);
                                setSelectedRecyclablePlastic(false);
                              }}
                              title="go back 👀"
                            />
                            <View style={{ marginBottom: 5 }} />
                            <Image
                              source={{
                                uri: "https://img.icons8.com/?size=512&id=109470&format=png",
                              }}
                              width={255}
                              height={255}
                              alt="trash"
                            />
                          </View>
                        )}
                      </>
                    ) : (
                      <>
                        <View>
                          <Text style={{ fontSize: 20, marginTop: 40 }}>
                            What type of plastic is it?
                          </Text>
                          <Button
                            onPress={() => {
                              setSelectedRigidPlastic(false);
                            }}
                            title="go back 👀"
                          />
                        </View>
                        <View style={{ marginBottom: 40 }} />
                        <View style={styles.buttonContainer}>
                          <TouchableOpacity
                            style={styles.buttonPrimaryLG}
                            onPress={() => {
                              setIsRecyclablePlastic(true);
                              setSelectedRecyclablePlastic(true);
                            }}
                          >
                            <Text
                              style={{
                                color: "#fff",
                                fontWeight: "bold",
                                fontSize: 30,
                              }}
                            >
                              ♳ ♴ ♵ ♶ ♷ ♹ ♻ ♼ ♽
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.buttonSecondary}
                            onPress={() => {
                              setIsRecyclablePlastic(false);
                              setSelectedRecyclablePlastic(true);
                            }}
                          >
                            <Text
                              style={{
                                color: "#fff",
                                fontWeight: "bold",
                                fontSize: 30,
                              }}
                            >
                              ♸ ♺
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {selectedStrechablePlastic ? (
                      <>
                        {isStrechablePlastic ? (
                          <View style={styles.subContainer}>
                            <Text style={styles.title}>Recyclable</Text>
                            <Button
                              onPress={() => {
                                setSelectedRigidPlastic(false);
                                setSelectedStrechablePlastic(false);
                              }}
                              title="go back 👀"
                            />
                            <View style={{ marginBottom: 5 }} />
                            <Image
                              source={{
                                uri: "https://img.icons8.com/?size=256&id=ulWyep8ifsWu&format=png",
                              }}
                              width={200}
                              height={200}
                              alt="recyclable"
                            />
                          </View>
                        ) : (
                          <View style={styles.subContainer}>
                            <Text style={styles.title}>Trash</Text>
                            <Button
                              onPress={() => {
                                setSelectedRigidPlastic(false);
                                setSelectedStrechablePlastic(false);
                              }}
                              title="go back 👀"
                            />
                            <View style={{ marginBottom: 5 }} />
                            <Image
                              source={{
                                uri: "https://img.icons8.com/?size=512&id=109470&format=png",
                              }}
                              width={255}
                              height={255}
                              alt="trash"
                            />
                          </View>
                        )}
                      </>
                    ) : (
                      <>
                        <View>
                          <Text style={{ fontSize: 20, marginTop: 40 }}>
                            Is it strechable?
                          </Text>
                          <Button
                            onPress={() => {
                              setSelectedRigidPlastic(false);
                            }}
                            title="go back 👀"
                          />
                        </View>
                        <View style={{ marginBottom: 40 }} />
                        <View style={styles.buttonContainer}>
                          <TouchableOpacity
                            style={styles.buttonPrimary}
                            onPress={() => {
                              setIsStrechablePlastic(true);
                              setSelectedStrechablePlastic(true);
                            }}
                          >
                            <Text
                              style={{
                                color: "#fff",
                                fontWeight: "bold",
                              }}
                            >
                              Yes ✅
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.buttonSecondary}
                            onPress={() => {
                              setIsStrechablePlastic(false);
                              setSelectedStrechablePlastic(true);
                            }}
                          >
                            <Text
                              style={{
                                color: "#fff",
                                fontWeight: "bold",
                              }}
                            >
                              No ❌
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                <Text style={{ fontSize: 20, marginTop: 40, marginBottom: 40 }}>
                  Is it rigid or flexible?
                </Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.buttonPrimary}
                    onPress={() => {
                      setIsRigidPlastic(true);
                      setSelectedRigidPlastic(true);
                    }}
                  >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>
                      Rigid 🧱
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonSecondary}
                    onPress={() => {
                      setIsRigidPlastic(false);
                      setSelectedRigidPlastic(true);
                    }}
                  >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>
                      Flexible 💪
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        ) : // Check if bendable and other stuff
        prediction == "biological" ? (
          <>
            <Text style={styles.title}>Compostable</Text>
            <View style={{ marginBottom: 30 }} />
            <Image
              source={{
                uri: "https://img.icons8.com/?size=256&id=m4aadlK9yuE1&format=png",
              }}
              width={200}
              height={200}
              alt="compostable"
            />
          </>
        ) : prediction == "trash" ? (
          <>
            <Text style={styles.title}>Trash</Text>
            <View style={{ marginBottom: 5 }} />
            <Image
              source={{
                uri: "https://img.icons8.com/?size=512&id=109470&format=png",
              }}
              width={255}
              height={255}
              alt="trash"
            />
          </>
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
    height: 50,
    borderRadius: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonPrimaryLG: {
    backgroundColor: "#3ed54b",
    width: 200,
    padding: 5,
    height: "auto",
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
