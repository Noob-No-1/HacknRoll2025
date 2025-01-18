import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './App.css';
import { Root } from './routes/Root';

const App = () => {
  const standardRoutes = Root();

  const router = createBrowserRouter(standardRoutes);

  return <RouterProvider router={router}></RouterProvider>;
};

export default App;