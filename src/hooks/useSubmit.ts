import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';

import { useApiPost, useApiPut, useInternalApiPost } from './useApi';
import { useError } from './useError';

interface SubmitProps<T> {
  service: string;
  redirect: string | ((response: T | undefined) => string);
  returnData?: boolean;
  errorMessage?: string;
  successMessage?: string;
}

export const useSubmit = <T>({
  service,
  redirect,
  returnData = false,
}: SubmitProps<T>) => {
  const [isSend, setIsSend] = useState(false);

  const router = useRouter();
  const errorHandler = useError();

  const { id = undefined } = router.query;
  const post = useApiPost<T>();
  const put = useApiPut<T>();

  const submit = async (data: Record<string, any>): Promise<T | undefined> => {
    setIsSend(true);
    try {
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
      errorHandler(error);
    } finally {
      setIsSend(false);
    }
  };

  return { isSend, submit };
};

export const useSubmitInternal = <T>({ 
  service, 
  redirect, returnData = false }: SubmitProps<T>) => {
  const [isSend, setIsSend] = useState(false);

  const post = useInternalApiPost<T>(service);
  const router = useRouter();

  const submit = useCallback<(data: Record<string, any>) => Promise<T | undefined>>(
    async (data: Record<string, any>): Promise<T | undefined> => {
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
      } finally {
        if (returnData) {
          setIsSend(false);
        }
      }
    },
    [router, post, redirect, returnData],
  );

  return { isSend, submit };
};
