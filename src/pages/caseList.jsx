import React, { useState, useEffect } from "react";
import { db } from "../firebase-config"; // 导入firebase配置
import { collection, getDocs } from "firebase/firestore"; // 导入获取数据的功能
import { Tag, Card as AntCard } from "antd"; // 导入 Ant Design 的 Tag 组件
import { FaSearch, FaFilter, FaSort } from "react-icons/fa";
import "./caseList.css";

// CaseList 组件
const CaseList = () => {
  const [cases, setCases] = useState([]); // 用于存储从 Firebase 获取的数据
  const [loading, setLoading] = useState(true); // 加载状态
  const [currentPage, setCurrentPage] = useState(1); // 当前页
  const casesPerPage = 6; // 每页显示的案例数

  // 获取 Firebase 数据
  useEffect(() => {
    const fetchCases = async () => {
      const casesCollection = collection(db, "cases"); // "cases" 是你的 Firestore 集合名
      const caseSnapshot = await getDocs(casesCollection);
      const caseList = caseSnapshot.docs.map(doc => {
        const data = doc.data();
        // 将 Firebase 时间戳转换为 Date 对象
        const createdAt = data.createdAt?.toDate ? data.createdAt.toDate() : new Date();
        return {
          id: doc.id,
          title: data.title,
          category: data.category,
          description: data.description,
          createdAt: createdAt.toLocaleDateString(), // 格式化日期为可读字符串
          status: data.status,
        };
      });
      setCases(caseList);
      setLoading(false);
    };

    fetchCases();
  }, []);

  // 获取当前页显示的案例
  const indexOfLastCase = currentPage * casesPerPage;
  const indexOfFirstCase = indexOfLastCase - casesPerPage;
  const currentCases = cases.slice(indexOfFirstCase, indexOfLastCase);

  // 翻页功能
  const nextPage = () => {
    if (currentPage * casesPerPage < cases.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
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
          {loading ? (
            <p>Loading...</p>
          ) : (
            currentCases.map((caseItem) => (
              <AntCard
                key={caseItem.id}
                title={caseItem.title}
                extra={<Tag color="blue">{caseItem.category}</Tag>} // 显示类别为Tag
              >
                <p>{caseItem.description}</p>
                <p><strong>Status:</strong> {caseItem.status}</p>
                <p><strong>Created At:</strong> {caseItem.createdAt}</p>
              </AntCard>
            ))
          )}
        </div>

        {/* Pagination Buttons */}
        <div className="pagination-button-container">
          <button className="pagination-button" onClick={prevPage}>Previous</button>
          <button className="pagination-button" onClick={nextPage}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default CaseList;
