import fs from "fs/promises";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase-config.js";

export const uploadFile = async (filePath, fileName) => {
  try {
    const fileBuffer = await fs.readFile(filePath);

    const storageRef = ref(storage, `cases/${fileName}`);

    await uploadBytes(storageRef, fileBuffer);

    const downloadURL = await getDownloadURL(storageRef);

    console.log("File uploaded successfully:", downloadURL);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};


(async () => {
  const filePath = ""; 
  const fileName = "test.pdf"; 
  await uploadFile(filePath, fileName);
})();
