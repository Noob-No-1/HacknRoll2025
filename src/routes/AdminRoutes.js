import ReminderPage from "../pages/User/reminder";
import { useAuth } from "../contexts/authContext";

export const AdminRoutes = () => {
  const authContext = useAuth();

  if (!authContext) {
    throw new Error;
  }

  return [
    {
      path: '/root',
      element: <ReminderPage />
    }
  ];
}