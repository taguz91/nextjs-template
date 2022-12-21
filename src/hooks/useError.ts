import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { UnauthorizedError } from 'src/data/errors/common';
import { setAuthState } from 'src/store/authSlice';

const logoutApiUrl = '';

const loginUrl = '';

import { useSubmitInternal } from './useSubmit';

export const useError = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { submit } = useSubmitInternal<Record<string, any>>({
    service: logoutApiUrl,
    redirect: loginUrl,
    returnData: true,
  });

  return useCallback(
    (error: unknown) => {
      // check type of error and make someting
      if (error instanceof UnauthorizedError) {
        submit({}).then(() => {
          dispatch(setAuthState({}));
          router.replace(loginUrl);
        });
      }
    },
    [router, dispatch, submit],
  );
};
