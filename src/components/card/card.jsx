import React from 'react';
import './card.css'; 

const Card = ({ name, category, description, date, urgentLevel }) => {
  const getUrgentColor = () => {
    if (urgentLevel === "high") return "#FF6F61";
    if (urgentLevel === "medium") return "#FFB84D";
    return "#81C784";  
  };

  return (
    <div className="card">
      <div className="urgent-dot" style={{ backgroundColor: getUrgentColor() }}></div>
      <h3>{name}</h3>
      <p><strong>Category:</strong> {category}</p>
      <p>{description}</p>
      <p><small><strong>Date:</strong> {date}</small></p>
    </div>
  );
};

export default Card;
