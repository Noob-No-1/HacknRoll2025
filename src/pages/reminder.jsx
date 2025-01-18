import React, { useState, useEffect } from 'react';
import { Badge, Calendar, Card, Button, Tooltip, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase-config';
import './reminder.css'; 


const ReminderPage = () => {
  const [reminders, setReminders] = useState([]);
  const fetchReminders = async () => {
       await getDocs(collection(db, "reminders"))
           .then((querySnapshot)=>{            
               const newData = querySnapshot.docs
                   .map((rem) => ({...rem.data() }));
               setReminders(newData);                
               console.log(reminders, newData);
           })
   }
   useEffect(()=>{
    try {
      fetchReminders();
    } catch (error) {
       console.error("Error fetching posts: ", error);
    }
   }, [])

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedReminders, setSelectedReminders] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Handle date selection
  const onDateSelect = (value) => {
    const dateStr = value.format('YYYY-MM-DD');
    setSelectedDate(dateStr); // Save selected date in state
    const remindersForDate = getListData(value); // Get reminders for the selected date
    console.log("DATE", remindersForDate);
    setSelectedReminders(remindersForDate); // Set reminders in state
    setIsModalVisible(true); // Show the modal
  };

  // Function to get list data for a specific date
  const getListData = (value) => {
    const dateStr = value.format('YYYY-MM-DD');
    return reminders.filter((reminder) => reminder.date === dateStr);
  };

  // Handle Modal close
  const handleCancel = () => {
    setIsModalVisible(false); // Close the modal
  };

  // Function to render content in date cell
  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.title}>
            <Badge status={item.urgency === "High" ? "error" :
                    item.urgency === "Medium" ? "warning" : "success"} text={item.title} />
          </li>
        ))}
      </ul>
    );
  };

  // Function to render content in month cell (optional)
  const monthCellRender = (value) => {
    return null; // We can leave this empty or add something here if needed
  };

  // Function to handle cell rendering
  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>MMA Portal</h2>
        <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Cases</a></li>
            <li><a href="#">Schedule</a></li>
            <li><a href="#">People</a></li>
        </ul>
      </div>

      {/* Main content area with Calendar */}
      <div className="main-content">
        <h1>Reminder Calendar</h1>

        {/* Calendar */}
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
                  <Badge status={item.urgency === "High" ? "error" :
                    item.urgency === "Medium" ? "warning" : "success"} text={item.title} />
                </li>
              ))}
            </ul>
          ) : (
            <p>No reminders for this day.</p>
          )}
        </Modal>

        {/* Display Latest Reminders as Cards */}
        <div className="latest-reminders">
          <h2>Latest Reminders</h2>
          <div className="card-container">
            {reminders.slice(0, 3).map((reminder, index) => (
              <Card key={index} title={`Reminder #${index + 1}`} style={{ width: 300, marginBottom: 20 }}>
                <p>{reminder.title}</p>
                <Badge status={reminder.urgency === "High" ? "error" :
                    reminder.urgency === "Medium" ? "warning" : "success"} text={`Urgency: ${reminder.urgency}`} />
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
            onClick={() => console.log('Add reminder clicked')}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default ReminderPage;
