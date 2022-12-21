import { useCallback, useMemo } from 'react';

import texts from 'config/texts.json';
import { flatObject } from 'src/helpers/data';

export const useText = () => {
  const flatTexts = useMemo(() => {
    return flatObject(texts);
  }, []);

  return useCallback(
    (text: string, params: Record<string, any> = {}): string => {
      if (text.trim().length === 0) {
        return '';
      }

      const value = flatTexts[text] ?? text;
      const entries = Object.entries(params);

      return entries.reduce((prev: string, act) => {
        return prev.replace(`{${act[0]}}`, act[1]);
      }, value);
    },
    [flatTexts],
  );
};
