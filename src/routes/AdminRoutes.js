import ReminderPage from "../pages/User/reminder";
import { useAuth } from "../contexts/authContext";
import CaseList from "../pages/User/caseList";
import UploadPage from "../pages/User/UploadPage";

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
    },
    {
      path: 'cases/add',
      element: <UploadPage />
    }
  ];
}


// {path: 'upload', element: "#"} // paths to be updates