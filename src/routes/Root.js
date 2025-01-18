// import RootLayout from '../commons/layouts/RootLayout';
// import ProtectedRoute from './ProtectedRoutes';
// import { StudentRoutes } from './StudentRoutes';
// import { BaseRoutes } from './BaseRoutes';
// import { EducatorRoutes } from './EducatorRoutes';

import Login from '../pages/Authentication/Login';

export const Root = () => {
  return [
    {
      path: '*',
      element: <Login />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    // {
    //   path: '/root',
    //   element: <ProtectedRoute element={<RootLayout />} />,
    //   children: [],
    // },
  ];
};

export default Root;