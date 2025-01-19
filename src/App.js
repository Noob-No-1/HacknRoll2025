// App.js
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import CaseList from './pages/caseList';  // 引入 CaseList 组件
// import ReminderPage from './pages/reminder';

import './App.css';
import { Root } from '../src/routes/Root';

const App = () => {
  const standardRoutes = Root();

  const router = createBrowserRouter(standardRoutes);

  return (
    <div>
      {/* <ReminderPage />  渲染 CaseList 组件 */}
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
};

export default App;