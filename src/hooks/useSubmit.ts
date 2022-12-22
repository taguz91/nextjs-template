import { useState, useCallback, useContext } from 'react';
import { useRouter } from 'next/router';

import { LoadingText } from 'src/interfaces/ui.types';
import { LoadingContext } from 'src/context/loading/LoadingContext';

import { useApiPost, useApiPut, useInternalApiPost } from './useApi';
import { useError } from './useError';

interface SubmitProps<T> {
  service: string;
  redirect: string | ((response: T | undefined) => string);
  returnData?: boolean;
  loading?: LoadingText;
  errorMessage?: string;
  successMessage?: string;
}

export const useSubmit = <T>({
  service,
  redirect,
  returnData = false,
  loading,
}: SubmitProps<T>) => {
  const [isSend, setIsSend] = useState(false);
  const { show, hide } = useContext(LoadingContext);

  const router = useRouter();
  const errorHandler = useError();
  const post = useApiPost<T>();
  const put = useApiPut<T>();

  const submit = useCallback<(data: Record<string, any>) => Promise<T | undefined>>(
    async (data: Record<string, any>): Promise<T | undefined> => {
      if (loading) {
        show(loading);
      }
      setIsSend(true);
      try {
        const { id = undefined } = router.query;
        let response = undefined;

        if (id) {
          response = await put(service.replace('{id}', id.toString()), data);
        } else {
          response = await post(service, data);
        }

        if (returnData) {
          return response;
        }

        if (typeof redirect == 'string') {
          router.push(redirect);
        } else {
          router.push(redirect(response));
        }
      } catch (error) {
        hide();
        errorHandler(error);
      } finally {
        if (returnData) {
          setIsSend(false);
        }
      }
    },
    [post, errorHandler, put, redirect, returnData, router, service, loading, show, hide],
  );

  return { isSend, submit };
};

export const useSubmitInternal = <T>({
  service,
  redirect,
  returnData = false,
  loading,
}: SubmitProps<T>) => {
  const [isSend, setIsSend] = useState(false);
  const { show, hide } = useContext(LoadingContext);

  const post = useInternalApiPost<T>(service);
  const router = useRouter();

  const submit = useCallback<(data: Record<string, any>) => Promise<T | undefined>>(
    async (data: Record<string, any>): Promise<T | undefined> => {
      if (loading) {
        show(loading);
      }

      setIsSend(true);
      try {
        const response = await post(data);

        if (returnData) {
          return response;
        }

        if (typeof redirect == 'string') {
          router.push(redirect);
        } else {
          router.push(redirect(response));
        }
      } catch (error) {
        hide();
      } finally {
        if (returnData) {
          setIsSend(false);
        }
      }
    },
    [router, post, redirect, returnData, show, hide, loading],
  );

  return { isSend, submit };
};
