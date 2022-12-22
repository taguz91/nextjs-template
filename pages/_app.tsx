import '../styles/globals.scss';
import type { AppProps } from 'next/app';

import { Provider, useDispatch, useSelector } from 'react-redux';
import { FC, ReactNode, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import { wrapper } from 'src/store';
import { selectAuthState, setAuthState } from 'src/store/authSlice';
import { useInternalApiGet } from 'src/hooks/useApi';
import { ProfileStateType } from 'src/interfaces/user.types';
import { LoadingProvider } from 'src/context/loading/LoadingProvider';
import { StateLoading } from 'src/components/ui';
import urls from 'config/urls.json';
import { LoadingContext } from 'src/context/loading/LoadingContext';

function AppWrapper({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  return (
    <Provider store={store}>
      <LoadingProvider>
        <AppStart>
          <StateLoading />
          <Component {...pageProps} />
        </AppStart>
      </LoadingProvider>
    </Provider>
  );
}

interface AppStartProps {
  children?: ReactNode;
}

const AppStart: FC<AppStartProps> = ({ children }) => {
  const router = useRouter();
  const authState = useSelector(selectAuthState);
  const dispath = useDispatch();
  const get = useInternalApiGet<ProfileStateType>(urls.apiUser);
  const { hide, loading } = useContext(LoadingContext);

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

  useEffect(() => {
    const handleRouteChange = () => {
      if (loading) {
        hide();
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, hide, loading]);

  return <>{children}</>;
};

export default AppWrapper;
