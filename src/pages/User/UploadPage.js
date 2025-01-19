import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app, auth, db, storage } from "../../firebase-config.js"; // Ensure this is the correct path
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./reminder.css";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button.jsx";
import { doSignOut } from "../../config/auth.js";

const UploadPage = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null); // For storing the selected file
  const [status, setStatus] = useState(""); // For tracking upload status

  // File upload function
  const uploadFile = async (fileBuffer, fileName) => {
    try {
      const uniqueName = `${Date.now()}-${fileName}`;
      const storageRef = ref(storage, `cases/${uniqueName}`); // Use backticks for dynamic string
      await uploadBytes(storageRef, fileBuffer); // Upload the file buffer to Firebase Storage
      const downloadURL = await getDownloadURL(storageRef); // Get the download URL
      return downloadURL;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error; // Rethrow the error to handle it in the calling function
    }
  };

  // Handle file input change
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setStatus(""); // Clear any previous status
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
      toast.error("No file selected!");
      return;
    }

    try {
      setStatus("Uploading...");
      toast.info("Uploading file...");

      // Convert file to array buffer for upload
      const fileBuffer = await file.arrayBuffer();
      const fileName = file.name;

      // Call the uploadFile function
      const downloadURL = await uploadFile(fileBuffer, fileName);

      // Update status
      setStatus("Upload successful!");
      toast.success("File uploaded successfully!");
      console.log("Download URL:", downloadURL);
    } catch (error) {
      console.error("Error during file upload:", error);
      setStatus("Upload failed. Please try again.");
      toast.error("Upload failed!");
    }
  };

  
  const handleLogout = async () => {
    try {
      await doSignOut();
      navigate("/login");
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  return (
    // <div>
    //   <h1>Upload File</h1>
    //   <input type="file" onChange={handleFileChange} />
    //   <button onClick={handleUpload}>Upload</button>
    //   <p>{status}</p>
    //   <ToastContainer />
    // </div>
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>MMA Portal</h2>
        <ul>
          <li>
            <Link to="/root">Home</Link>
          </li>
          <li>
            <Link to="/root/cases">Cases</Link>
          </li>
          <li>
            <Link to="/root/cases/add">Reminder</Link>
          </li>
          <li>
            <Link to="/root">People</Link>
          </li>
          <li>
            <Button variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </li>
          {/* <li><a href="#">People</a></li> */}
        </ul>
      </div>
      <div>
       <h1>Upload File</h1>
       <input type="file" onChange={handleFileChange} />
       <button onClick={handleUpload}>Upload</button>
       <p>{status}</p>
       <ToastContainer />
     </div>

     
    </div>
  );
};

export default UploadPage;