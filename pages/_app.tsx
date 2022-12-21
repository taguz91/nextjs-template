import '../styles/globals.scss';
import type { AppProps } from 'next/app';

import { Provider, useDispatch, useSelector } from 'react-redux';
import { FC, ReactNode, useEffect } from 'react';

import { wrapper } from 'src/store';
import { selectAuthState, setAuthState } from 'src/store/authSlice';
import { useInternalApiGet } from 'src/hooks/useApi';
import { ProfileStateType } from 'src/interfaces/user.types';
import urls from 'config/urls.json';

function AppWrapper({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  return (
    <Provider store={store}>
      <AppStart>
        <Component {...pageProps} />
      </AppStart>
    </Provider>
  );
}

interface AppStartProps {
  children?: ReactNode;
}

const AppStart: FC<AppStartProps> = ({ children }) => {
  const authState = useSelector(selectAuthState);
  const dispath = useDispatch();
  const get = useInternalApiGet<ProfileStateType>(urls.apiUser);

  useEffect(() => {
    if (authState.state) {
      return;
    }

    get().then((user) => {
      if (user) {
        dispath(setAuthState(user));
      }
    });
  }, [authState, get, dispath]);

  return <>{children}</>;
};

export default AppWrapper;
