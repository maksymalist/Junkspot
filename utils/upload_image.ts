import { Prediction } from "./../types/prediction";
import { storage } from "../firebase";
import { decode } from "base-64";

if (typeof atob === "undefined") {
  global.atob = decode;
}

interface Image {
  url: string;
  temp_id: string;
}

export const base64_to_url = async (
  base64: string,
  file_type: string
): Promise<Image | null> => {
  const storage_ref = storage.ref("temp/");
  const id = new Date().getTime().toString();
  const data_uri = `data:${file_type};base64,${base64}`;

  const res = await fetch(data_uri);
  const blob = await res.blob();

  const metadata = {
    contentType: file_type,
  };

  const snapshot = await storage_ref.child(id).put(blob, metadata);
  const url = await snapshot.ref.getDownloadURL();
  let out: Image = {
    url: url,
    temp_id: id,
  };
  return out;
};

export const upload_image_class = async (
  base64: string,
  file_type: string,
  prediction: Prediction,
  temp_id: string
): Promise<string> => {
  // upload image to class folder
  const storage_ref = storage.ref(`${prediction}/`);
  const id = new Date().getTime().toString();
  const data_uri = `data:${file_type};base64,${base64}`;

  const res = await fetch(data_uri);
  const blob = await res.blob();

  const metadata = {
    contentType: file_type,
  };

  const snapshot = await storage_ref.child(id).put(blob, metadata);
  const url = await snapshot.ref.getDownloadURL();

  // delete image from temp folder

  const temp_ref = storage.ref(`temp/${temp_id}`);
  await temp_ref.delete();

  return url;
};
