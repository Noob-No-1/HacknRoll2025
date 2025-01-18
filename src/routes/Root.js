import RootLayout from '../commons/layouts/RootLayout';
import Login from '../pages/Authentication/Login';
import CaseList from '../pages/User/caseList';  // 引入 CaseList 组件
import ReminderPage from '../pages/User/reminder';
import { AdminRoutes } from './AdminRoutes';
import ProtectedRoutes from './ProtectedRoutes';

export const Root = () => {
  return [
    // {
    //   path: '*',
    //   element: <Login />,
    // },
    {
      path: '/login',
      element: <Login />,
    },
    // {
    //   path: '/reminder-page',
    //   element: <ReminderPage />
    // },
    {
      path: '/root',
      element: <ProtectedRoutes element={<RootLayout />} />,
      children: [...AdminRoutes()],
    },
  ];
};

// export default Root;