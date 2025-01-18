import React, { useState } from 'react';
import { Badge, Calendar, Card, Button, Tooltip, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons'; 
import './reminder.css'; 

// Example reminder data
const reminders = [
  { date: '2025-01-06', title: 'Call Meeting with Health', color: 'green' },
  { date: '2025-01-14', title: 'Find resume for XYZ', color: 'orange' },
  { date: '2025-01-19', title: 'Do Task XYZ', color: 'red' },
  { date: '2025-01-19', title: 'Florence\'s Birthday', color: 'yellow' },
];

// Function to get list data for a specific date
const getListData = (value) => {
  const dateStr = value.format('YYYY-MM-DD');
  return reminders.filter((reminder) => reminder.date === dateStr);
};

const ReminderPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedReminders, setSelectedReminders] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Handle date selection
  const onDateSelect = (value) => {
    const dateStr = value.format('YYYY-MM-DD');
    setSelectedDate(dateStr); // Save selected date in state
    const remindersForDate = getListData(value); // Get reminders for the selected date
    setSelectedReminders(remindersForDate); // Set reminders in state
    setIsModalVisible(true); // Show the modal
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
            <Badge status={item.color} text={item.title} />
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
          <h2>Latest Reminders</h2>
          <div className="card-container">
            {reminders.slice(0, 3).map((reminder, index) => (
              <Card key={index} title={`Reminder #${index + 1}`} style={{ width: 300, marginBottom: 20 }}>
                <p>{reminder.title}</p>
                <Badge status={reminder.color} text={`Urgency: ${reminder.color}`} />
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
