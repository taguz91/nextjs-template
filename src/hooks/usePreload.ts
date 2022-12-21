import { useState, useCallback } from 'react';
import { UseFormReturn, FieldValues } from 'react-hook-form';

import { objectFromMap } from 'src/helpers/data';
import { MapValue } from 'src/interfaces/data.type';

import { useApiGet } from './useApi';
import { useError } from './useError';
import { useUsuario } from './useUsuario';

export interface PreloadService {
  service: string;
  map?: MapValue[];
}

export const usePreload = <T>({ service, map = undefined }: PreloadService) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const errorHandler = useError();
  const user = useUsuario();

  const get = useApiGet<Array<T>>();

  const load = useCallback(
    (methods: UseFormReturn<FieldValues, any>) => {
      const callService = async () => {
        try {
          const response = await get(service);

          if (response) {
            methods.reset(map ? objectFromMap(map, response) : response);
          }
        } catch (error) {
          errorHandler(error);
        } finally {
          setIsCompleted(true);
        }
      };

      if (!isCompleted && user.state && service !== '') {
        callService();
      }
    },
    [get, service, errorHandler, isCompleted, map, user.state],
  );

  return { isCompleted, load };
};
