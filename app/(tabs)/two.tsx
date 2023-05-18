import {
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";

import Base64Image from "../../components/Base64Image";
import { Text, View } from "../../components/Themed";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { OfflineImage } from "../../types/offline_image";

import { Feather } from "@expo/vector-icons";

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

  useEffect(() => {
    getOfflineImages();
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
      <FlatList
        style={{
          marginTop: 20,
          padding: 10,
        }}
        numColumns={3}
        horizontal={false}
        data={offlineImages}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={Base64Image}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={getOfflineImages}
          />
        }
      />
      <TouchableOpacity style={styles.buttonPrimary} onPress={clearStorage}>
        <Text style={styles.textBold}> clear storage </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
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
  buttonPrimary: {
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
  text: {
    padding: 0,
  },
  textBold: {
    fontWeight: "bold",
    color: "#fff",
  },
});
