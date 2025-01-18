import { collection, addDoc, Timestamp } from "firebase/firestore";
import {db} from "../firebase-config.js";

async function createCase() {
  try {
    const caseData = {
      title: "Example Case Title",
      description: "This is an example case description.",
      status: "open", 
      createdAt: Timestamp.now(),
    };

    const docRef = await addDoc(collection(db, "cases"), caseData);

    console.log(`Document created with ID: ${docRef.id}`);
  } catch (error) {
    console.error("Error creating document:", error);
  }
}

createCase();
