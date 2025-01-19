import ReminderPage from "../pages/User/reminder";
import { useAuth } from "../contexts/authContext";
import CaseList from "../pages/User/caseList";

export const AdminRoutes = () => {
  const authContext = useAuth();

  if (!authContext) {
    throw new Error;
  }

  return [
    {
      path: '/root',
      element: <ReminderPage />,
      
    },
    {
      path: 'cases',
      element: <CaseList />
    }
  ];
}


// {path: 'upload', element: "#"} // paths to be updates