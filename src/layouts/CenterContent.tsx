import Head from 'next/head';
import { FC, ReactNode } from 'react';

import { useText } from 'src/hooks/useText';

interface FloatFormProps {
  children?: ReactNode;
  title: string;
  description: string;
}

export const CenterContent: FC<FloatFormProps> = ({ title, description, children }) => {
  const t = useText();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={description} name="description" />
        <meta
          content="width=device-width, initial-scale=1.0 maximum-scale=1.0 user-scalable=no"
          name="viewport"
        />
      </Head>

      <div className="h-screen flex items-center">{children}</div>

      <footer className="py-4 border-top bg-slate-100">
        <p className="text-center font-bold text-slate-600">{t('footer')}</p>
      </footer>
    </>
  );
};
