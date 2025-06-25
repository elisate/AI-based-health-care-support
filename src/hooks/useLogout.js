import { useNavigate } from 'react-router-dom';
import Notify from '../utils/notifyConfig';
import  Confirm from '../utils/confirmCofig';
const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    Confirm.show(
      'Logout Confirmation',
      'Are you sure you want to Logout?',
      'Yes',  // OK Button
      'Cancel', // Cancel Button
      () => {
        // Confirmed
        localStorage.removeItem('userToken');
        // localStorage.removeItem('user');
        navigate('/welcome');
        Notify.success('Logged out successfully');
      },
      () => {
        // Cancelled
        Notify.failure("Logout cancelled");
      }
    );
  };

  return logout;
};

export default useLogout;
