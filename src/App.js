// App.js
import React from 'react';
import CaseList from './pages/caseList';  // 引入 CaseList 组件
import ReminderPage from './pages/reminder';

const App = () => {
  return (
    <div>
      <ReminderPage />  {/* 渲染 CaseList 组件 */}
    </div>
  );
};

export default App;
