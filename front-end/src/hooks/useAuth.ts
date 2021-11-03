import { useContext } from 'react';
import { AuthContext } from 'stores/auth';

const useAuth = () => {
  const authContext = useContext(AuthContext);
  return authContext;
};

export default useAuth;
