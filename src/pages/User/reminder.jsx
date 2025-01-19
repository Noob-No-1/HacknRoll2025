import React, { useState, useEffect } from "react";
import { Badge, Calendar, Card, Button, Tooltip, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { db } from "../../firebase-config"; // Import Firebase configuration
import { collection, getDocs } from "firebase/firestore"; // Import Firestore functionality
import "./reminder.css";
import { Link, useNavigate } from "react-router-dom";
import { doSignOut } from "../../config/auth";

// ReminderPage Component
const ReminderPage = () => {
  const navigate = useNavigate();
  const [reminders, setReminders] = useState([]); // State to store reminders from Firebase
  const [selectedDate, setSelectedDate] = useState(null); // State for the selected date
  const [selectedReminders, setSelectedReminders] = useState([]); // State to store reminders for the selected date
  const [isModalVisible, setIsModalVisible] = useState(false); // Control modal visibility

  // Fetch reminders from Firebase
  useEffect(() => {
    const fetchReminders = async () => {
      const remindersCollection = collection(db, "reminders"); // "reminders" is the Firestore collection name
      const remindersSnapshot = await getDocs(remindersCollection);
      const reminderList = remindersSnapshot.docs.map((doc) => {
        const data = doc.data();
        const date = new Date(data.date); // Convert the string date to Date object
        return {
          id: doc.id,
          title: data.title,
          date: date.toLocaleDateString(), // Format date to a readable string
          color: getUrgencyColor(data.urgency), // Get color based on urgency
          rawDate: date, // Store the raw Date object for comparison
        };
      });

      // Filter out reminders that are in the past
      const today = new Date();
      const futureReminders = reminderList.filter(
        (reminder) => reminder.rawDate >= today
      );
      setReminders(futureReminders); // Store the future reminders in state
    };

    fetchReminders();
  }, []);

  // Function to get urgency color
  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "Low":
        return "green"; // Green for low urgency
      case "Medium":
        return "orange"; // Orange for medium urgency
      case "High":
        return "red"; // Red for high urgency
      default:
        return "gray"; // Default color
    }
  };

  // Get reminders for a specific date
  const getListData = (value) => {
    const dateStr = value.format("YYYY-MM-DD");
    return reminders.filter((reminder) => reminder.date === dateStr);
  };

  // Handle date selection in the calendar
  const onDateSelect = (value) => {
    const dateStr = value.format("YYYY-MM-DD");
    setSelectedDate(dateStr); // Save the selected date
    const remindersForDate = getListData(value); // Get reminders for the selected date
    setSelectedReminders(remindersForDate); // Set reminders in state
    setIsModalVisible(true); // Show the modal
  };

  // Close the modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Render content in date cell
  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.title}>
            <Badge status={item.color} text={item.title} />
          </li>
        ))}
      </ul>
    );
  };

  // Function to render content in month cell (optional)
  const monthCellRender = (value) => {
    return null; // Empty for month cells
  };

  // Handle cell rendering
  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current); // Render date cell
    if (info.type === "month") return monthCellRender(current); // Render month cell
    return info.originNode;
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
        </ul>
      </div>

      {/* Main content area with Calendar */}
      <div className="main-content">
        <h1>Reminder Calendar</h1>

        {/* Calendar Component */}
        <Calendar cellRender={cellRender} onSelect={onDateSelect} />

        {/* Modal to show today's reminders */}
        <Modal
          title={`Reminders for ${selectedDate}`}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          {selectedReminders.length > 0 ? (
            <ul className="events">
              {selectedReminders.map((item) => (
                <li key={item.title}>
                  <Badge status={item.color} text={item.title} />
                </li>
              ))}
            </ul>
          ) : (
            <p>No reminders for this day.</p>
          )}
        </Modal>

        {/* Display Latest Reminders as Cards */}
        <div className="latest-reminders">
          <div className="card-container">
            {reminders.slice(0, 2).map((reminder, index) => (
              <Card
                key={index}
                title={`Latest Reminder #${index + 1}`}
                style={{ width: 300, marginBottom: 20 }}
              >
                <p>{reminder.title}</p>
                <p>{reminder.date}</p>
                {/* Urgency dot as Badge in top-right of card */}
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    backgroundColor: reminder.color,
                    borderRadius: "50%",
                    width: "12px",
                    height: "12px",
                  }}
                ></div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Floating button at the bottom-right corner */}
      <div className="floating-button">
        <Tooltip title="Add Reminder">
          <Button
            shape="circle"
            icon={<PlusOutlined />}
            size="large"
            onClick={() => console.log("Add reminder clicked")}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default ReminderPage;
