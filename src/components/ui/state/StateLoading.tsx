import { FC, useContext, useEffect } from 'react';

import { LoadingContext } from 'src/context/loading/LoadingContext';

import { Loading } from '../Loading';

export const StateLoading: FC = () => {
  const { loading } = useContext(LoadingContext);

  useEffect(() => {
    window.document.body.style.overflow = loading ? 'hidden' : 'visible';
  }, [loading]);

  if (loading) {
    return <Loading />;
  }

  return <></>;
};
