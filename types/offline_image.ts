export type OfflineImage = {
  id: string;
  base64: string;
  time: number;
  file_type: string;
  location: string;
  predicted: boolean;
  predicted_label: string | null;
};
