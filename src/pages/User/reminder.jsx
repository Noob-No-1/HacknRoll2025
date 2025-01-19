import React, { useState, useEffect } from "react";
import {
  Badge,
  Calendar,
  Card,
  Button,
  Tooltip,
  Modal,
  Input,
  Select,
  Form,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { db } from "../../firebase-config"; // Import Firebase configuration
import { collection, getDocs, addDoc } from "firebase/firestore"; // Import Firestore functionality
import "./reminder.css";
import { Link, useNavigate } from "react-router-dom";
import { doSignOut } from "../../config/auth";

const ReminderPage = () => {
  const navigate = useNavigate();
  const [reminders, setReminders] = useState([]); // State to store reminders from Firebase
  const [selectedDate, setSelectedDate] = useState(null); // State for the selected date
  const [selectedReminders, setSelectedReminders] = useState([]); // State to store reminders for the selected date
  const [isModalVisible, setIsModalVisible] = useState(false); // Control modal visibility
  const [addReminderVisible, setAddReminderVisible] = useState(false); // Control add reminder modal visibility
  const [form] = Form.useForm(); // Form instance to handle form submission

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
          date: date.toLocaleDateString("en-CA"), // Format date to a readable string (YYYY-MM-DD)
          color: getUrgencyColor(data.urgency), // Get color based on urgency
          rawDate: date, // Store the raw Date object for comparison
        };
      });

      // Filter out reminders that are in the past
      const today = new Date();
      const futureReminders = reminderList;
      setReminders(futureReminders); // Store the future reminders in state
    };

    fetchReminders();
  }, []);

  // Function to get urgency color
  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "Low":
        return "#90EE90"; // 温和的浅绿色
      case "Medium":
        return "#FFA07A"; // 温和的浅橙色
      case "High":
        return "#FF6F61"; // 柔和的珊瑚红色
      default:
        return "gray"; // 默认颜色
    }
  };

  // Get reminders for a specific date
  const getListData = (value) => {
    const dateStr = value.format("YYYY-MM-DD"); // Calendar gives us a formatted date string
    return reminders.filter((reminder) => {
      const reminderDateStr = new Date(reminder.rawDate).toLocaleDateString(
        "en-CA"
      ); // Format the reminder date to 'YYYY-MM-DD'
      return reminderDateStr === dateStr; // Compare the date strings
    });
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

  // Handle form submission for adding reminder
  const handleAddReminder = async (values) => {
    const { title, date, urgency } = values;
    const newReminder = {
      title,
      date,
      urgency,
    };
    try {
      // Add the reminder to Firestore
      const remindersCollection = collection(db, "reminders");
      await addDoc(remindersCollection, newReminder);
      // Close the modal and reset the form
      setAddReminderVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Error adding reminder: ", error);
    }
  };

  // Define dateCellRender function
  const dateCellRender = (value) => {
    const listData = getListData(value);

    if (listData.length > 0) {
      return (
        <ul className="events">
          {listData.map((item) => (
            <li
              key={item.title}
              style={{
                backgroundColor: item.color, // 设置背景颜色
                padding: "5px 10px",
                borderRadius: "5px",
                marginBottom: "5px", // 让每个条目之间有间距
                color: "white", // 白色文字
              }}
            >
              {item.title}
            </li>
          ))}
        </ul>
      );
    }
    return null; // 没有提醒时不显示任何内容
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
            <Link to="/root/cases/add">Upload</Link>
          </li>
          <li>
            <Button variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </li>
          {/* <li><a href="#">People</a></li> */}
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
            <p></p>
          )}
        </Modal>

        {/* Add Reminder Modal */}
        <Modal
          title="Add Reminder"
          visible={addReminderVisible}
          onCancel={() => setAddReminderVisible(false)}
          footer={null}
        >
          <Form
            form={form}
            onFinish={handleAddReminder}
            layout="vertical"
            initialValues={{ urgency: "Low" }} // Default urgency value
          >
            <Form.Item
              name="title"
              label="Reminder Title"
              rules={[
                { required: true, message: "Please input reminder title!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="date"
              label="Date"
              rules={[
                { required: true, message: "Please input reminder date!" },
              ]}
            >
              <Input type="date" />
            </Form.Item>

            <Form.Item
              name="urgency"
              label="Urgency"
              rules={[{ required: true, message: "Please select urgency!" }]}
            >
              <Select>
                <Select.Option value="Low">Low</Select.Option>
                <Select.Option value="Medium">Medium</Select.Option>
                <Select.Option value="High">High</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Add Reminder
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>

      {/* Floating button at the bottom-right corner */}
      <div className="floating-button">
        <Tooltip title="Add Reminder">
          <Button
            shape="circle"
            icon={<PlusOutlined />}
            size="large"
            onClick={() => setAddReminderVisible(true)} // Show add reminder modal
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default ReminderPage;
