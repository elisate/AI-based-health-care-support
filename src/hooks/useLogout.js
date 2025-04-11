import { useNavigate } from 'react-router-dom';
import { Notify } from 'notiflix';
const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    const confirmLogOut = window.confirm("Are you sure you want to Logout?");
    if (confirmLogOut) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/welcome');
    }
    else{
      Notify.failure("Can't Logout at the moment!!");
    }

  };

  return logout;
};

export default useLogout;
