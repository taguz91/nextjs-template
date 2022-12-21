import { useSelector } from 'react-redux';

import { selectAuthState } from 'src/store/authSlice';

export const useUsuario = () => {
  const auth = useSelector(selectAuthState);

  return {
    ...auth,
  };
};
