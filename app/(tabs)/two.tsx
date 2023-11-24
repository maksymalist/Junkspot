import {
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";

import LocalImage from "../../components/LocalImage";
import { Text, View } from "../../components/Themed";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { OfflineImage } from "../../types/offline_image";
import { useNavigation } from "expo-router";
import { auth } from "../../firebase";

const ItemSeparatorView = () => {
  return (
    <View
      style={{
        height: 1,
        width: "100%",
        backgroundColor: "#C8C8C8",
      }}
    />
  );
};

export default function TabTwoScreen() {
  const [offlineImages, setOfflineImages] = useState<OfflineImage[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState<OfflineImage[]>([]);

  const getOfflineImages = async () => {
    const offlineImages = await AsyncStorage.getItem("offline_images");
    if (offlineImages) {
      setOfflineImages(JSON.parse(offlineImages) as OfflineImage[]);
    }
  };

  const clearStorage = async () => {
    await AsyncStorage.setItem("offline_images", JSON.stringify([]));
    getOfflineImages();
  };

  const logStorage = async () => {
    const offlineImages = await AsyncStorage.getItem("offline_images");
    const parsed = JSON.parse(offlineImages || "[]") as OfflineImage[];
    parsed.forEach((i) => {
      i.base64 = "";
    });
    console.log("\n\n\n\n\n");
    console.log(parsed);
  };

  const toggleSelectedImage = (image: OfflineImage) => {
    const index = selectedImages.findIndex((i) => i.id === image.id);
    if (index === -1) {
      setSelectedImages([...selectedImages, image]);
    } else {
      const newSelectedImages = selectedImages.filter((i) => i.id !== image.id);
      setSelectedImages(newSelectedImages);
    }
  };

  const clearSelectedImages = async (selectedImages: OfflineImage[]) => {
    let offline_images_clone = [...offlineImages];
    for (const image of selectedImages) {
      offline_images_clone = offline_images_clone.filter(
        (i) => i.id !== image.id
      );
    }
    await AsyncStorage.setItem(
      "offline_images",
      JSON.stringify(offline_images_clone)
    );
    setOfflineImages(offline_images_clone);
  };

  useEffect(() => {
    getOfflineImages();
  }, []);

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      if (!user) {
        //@ts-ignore
        navigation?.navigate("(auth)");
      } else {
        //@ts-ignore
        navigation?.navigate("(tabs)");
      }
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      {offlineImages.length <= 0 && (
        <View style={styles.snackbar}>
          <Text style={{ color: "#000" }}>
            no offline images,{" "}
            <Text onPress={getOfflineImages} style={styles.linkButtonText}>
              {" "}
              reload?
            </Text>
          </Text>
        </View>
      )}
      {offlineImages.length > 0 && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonSecondaryOutlined}
            onPress={() => {
              if (selectedImages.length > 0 && editMode) {
                clearSelectedImages(selectedImages);
                setSelectedImages([]);
                setEditMode(false);
              } else if (editMode) {
                setSelectedImages([]);
                setEditMode(false);
              } else {
                setEditMode(true);
              }
            }}
          >
            <Text
              style={
                editMode && selectedImages.length > 0
                  ? {
                      color: "red",
                      fontWeight: "bold",
                    }
                  : editMode
                  ? {
                      color: "red",
                      fontWeight: "bold",
                    }
                  : {
                      color: "#000",
                      fontWeight: "bold",
                    }
              }
            >
              {editMode && selectedImages.length > 0
                ? `delete (${selectedImages.length})`
                : editMode
                ? "cancel"
                : "edit"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        style={{
          marginTop: 20,
          padding: 10,
        }}
        numColumns={3}
        horizontal={false}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        data={offlineImages}
        renderItem={({ item }) => (
          <LocalImage
            item={item}
            navigation={navigation}
            editMode={editMode}
            selected={selectedImages.findIndex((i) => i.id === item.id) !== -1}
            toggle={toggleSelectedImage}
            sync={getOfflineImages}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={getOfflineImages}
          />
        }
      />
      {/* <TouchableOpacity style={styles.buttonSecondary} onPress={logStorage}>
        <Text style={styles.textBold}> clear storage </Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    display: "flex",
    width: "100%",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: "80%",
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
  linkButtonText: {
    color: "#8AB3FD",
    textDecorationLine: "underline",
  },
  snackbar: {
    backgroundColor: "#fff",
    width: "100%",
    maxWidth: 350,
    height: 50,
    borderRadius: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    marginTop: 10,
  },
  snackback_left: {
    width: "100%",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
  },
  buttonSecondary: {
    backgroundColor: "#FF4365",
    width: "100%",
    maxWidth: 350,
    height: 50,
    borderRadius: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonAction: {
    backgroundColor: "#3095dc",
    maxWidth: 350,
    height: 50,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
  },
  buttonSecondaryOutlined: {
    borderColor: "#000",
    borderWidth: 1,
    width: 80,
    height: 35,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  text: {
    padding: 0,
  },
  textBold: {
    fontWeight: "bold",
    color: "#fff",
  },
  textBoldBlue: {
    fontWeight: "bold",
    color: "#3095dc",
  },
});
