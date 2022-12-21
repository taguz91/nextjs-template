import axios from 'axios';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { Api } from 'src/data/Api';
import { getStorage, setStorage } from 'src/helpers/storage';
import { selectAuthState } from 'src/store/authSlice';

export const useApiGet = <T>() => {
  const authState = useSelector(selectAuthState);

  return useCallback<(path: string, params?: Record<string, any>) => Promise<T | undefined>>(
    async <T>(path: string, params?: Record<string, any>): Promise<T | undefined> => {
      // make someting
      return Api.get(path, authState.profile?.access_token, params);
    },
    [authState.profile?.access_token],
  );
};

export const useApiGetCache = <T>(ttl_ms: number) => {
  const authState = useSelector(selectAuthState);

  return useCallback<(path: string, params?: Record<string, any>) => Promise<T | undefined>>(
    async <T>(path: string, params?: Record<string, any>): Promise<T | undefined> => {
      const queryParams = new URLSearchParams(params || {});
      const finalUrl = path + `?${queryParams.toString()}`;

      const data = getStorage<T>(finalUrl);

      if (data) {
        return Promise.resolve(data);
      }

      const response = await Api.get<T>(path, authState.profile?.access_token, params);

      if (response) {
        setStorage(finalUrl, response, ttl_ms);
      }

      return response;
    },
    [authState.profile?.access_token, ttl_ms],
  );
};

export const useApiPost = <T>() => {
  const authState = useSelector(selectAuthState);

  return useCallback<(path: string, params?: Record<string, any>) => Promise<T | undefined>>(
    (path: string, params?: Record<string, any>) => {
      // make someting
      return Api.post(path, authState.profile?.access_token, params);
    },
    [authState.profile?.access_token],
  );
};

export const useApiPut = <T>() => {
  const authState = useSelector(selectAuthState);

  return useCallback<(path: string, params?: Record<string, any>) => Promise<T | undefined>>(
    (path: string, params?: Record<string, any>) => {
      // make someting
      return Api.put(path, authState.profile?.access_token, params);
    },
    [authState.profile?.access_token],
  );
};

export const useInternalApiPost = <T>(path: string) => {
  return useCallback<(body?: Record<string, any>) => Promise<T | undefined>>(
    async (body?: Record<string, any>) => {
      try {
        const res = await axios<T>({
          method: 'post',
          url: path,
          data: body,
        });

        if (res.status < 400 && res.status >= 200) {
          return res.data;
        }
      } catch (error) {}
    },
    [path],
  );
};

export const useInternalApiGet = <T>(path: string) => {
  return useCallback<(params?: Record<string, any>) => Promise<T | undefined>>(
    async <T>(params?: Record<string, any>): Promise<T | undefined> => {
      try {
        const res = await axios<T>({
          method: 'get',
          url: path,
          params: params,
        });

        if (res.status < 400 && res.status >= 200) {
          return res.data;
        }
      } catch (error) {}
    },
    [path],
  );
};
