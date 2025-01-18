import React from 'react';
import './caseList.css'; 
import Card from '../components/card/card'; 
import { FaSearch, FaFilter, FaSort } from 'react-icons/fa'; 

const cases = [
    { id: 1, name: "Case 1", category: "Category 1", description: "This is the description for case 1", date: "2022-01-01", urgentLevel: "high" },
    { id: 2, name: "Case 2", category: "Category 2", description: "This is the description for case 2", date: "2022-02-01", urgentLevel: "medium" },
    { id: 3, name: "Case 3", category: "Category 3", description: "This is the description for case 3", date: "2022-03-01", urgentLevel: "low" },
    { id: 4, name: "Case 4", category: "Category 4", description: "This is the description for case 4", date: "2022-04-01", urgentLevel: "high" },
    { id: 5, name: "Case 5", category: "Category 5", description: "This is the description for case 5", date: "2022-05-01", urgentLevel: "medium" },
    { id: 6, name: "Case 6", category: "Category 6", description: "This is the description for case 6", date: "2022-06-01", urgentLevel: "low" },
    { id: 7, name: "Case 7", category: "Category 7", description: "This is the description for case 7", date: "2022-07-01", urgentLevel: "high" },
    { id: 8, name: "Case 8", category: "Category 8", description: "This is the description for case 8", date: "2022-08-01", urgentLevel: "medium" },
  ];
  

const CaseList = () => {
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

        {/* Main Content */}
        <div className="main-content">
        <h1>Cases</h1>
        <div className="search-container">
    
            <div className="search-box">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search by case name" />
            </div>

            <div className="search-box">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search by client name" />
            </div>

            <div className="search-box">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search by due date" />
            </div>

            {/* Search Icons */}
            <div className="search-icons">
            <FaFilter className="filter-icon" />
            <FaSort className="sort-icon" />
            </div>
        </div>
        
        {/* Display Case Cards */}
        <div className="card-container">
            {cases.map((caseItem) => (
            <Card
                key={caseItem.id}
                name={caseItem.name}
                category={caseItem.category}
                description={caseItem.description}
                date={caseItem.date}
                urgentLevel={caseItem.urgentLevel}
            />
            ))}
        </div>

        {/* Pagination Buttons */}
        <div className="pagination-button-container">
            <button className="pagination-button">Previous</button>
            <button className="pagination-button">Next</button>
        </div>
        </div>
    </div>
    );
};


export default CaseList;
