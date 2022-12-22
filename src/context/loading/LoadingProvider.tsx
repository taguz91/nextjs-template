import { useCallback, useMemo, useState } from 'react';

import { LoadingText } from 'src/interfaces/ui.types';

import { LoadingContext } from './LoadingContext';

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const LoadingProvider = ({ children }: Props) => {
  const [loading, setLoading] = useState(false);
  const [texts, setTexts] = useState<LoadingText>({
    title: '',
    message: '',
  });

  const show = (texts: LoadingText) => {
    setTexts(texts);
    setLoading(true);
  };

  const hide = useCallback(() => {
    setLoading(false);
  }, []);

  const props = useMemo(
    () => ({
      loading,
      texts,
      show,
      hide,
    }),
    [hide, loading, texts],
  );

  return <LoadingContext.Provider value={props}>{children}</LoadingContext.Provider>;
};
