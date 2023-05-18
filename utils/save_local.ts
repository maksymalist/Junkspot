import AsyncStorage from "@react-native-async-storage/async-storage";
import { OfflineImage } from "../types/offline_image";

export interface ImageData {
  base64String: string;
  fileType: string;
}

export const load_image_base64_encoding = async (
  file_path: string
): Promise<ImageData> => {
  try {
    const response = await fetch(file_path);
    const blob = await response.blob();
    const reader = new FileReader();
    return new Promise<ImageData>((resolve, reject) => {
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const encodedData = base64String.split(",")[1];
        resolve({
          base64String: encodedData,
          fileType: blob.type,
        });
      };
      reader.onerror = (error) => {
        reject(
          new Error("An error occurred while reading the image: " + error)
        );
      };
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    throw new Error("An error occurred while fetching the image: " + error);
  }
};

export const save_to_local = async (base64IMG: string, file_type: string) => {
  const img: OfflineImage = {
    id: Date.now().toString(),
    base64: base64IMG,
    time: Date.now(),
    location: "local",
    file_type,
  };

  const images = await AsyncStorage.getItem("offline_images");
  if (images) {
    const images_array = JSON.parse(images);
    images_array.push(img);
    AsyncStorage.setItem("offline_images", JSON.stringify(images_array));
  } else {
    AsyncStorage.setItem("offline_images", JSON.stringify([img]));
  }
};
