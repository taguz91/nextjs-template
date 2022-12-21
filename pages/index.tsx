import Link from 'next/link';

import { useText } from 'src/hooks/useText';
import { CenterContent } from 'src/layouts/CenterContent';
import urls from 'config/urls.json';

export default function Home() {
  const t = useText();

  return (
    <CenterContent description={t('home.pageDescription')} title={t('home.pageTitle')}>
      <div className="w-full mx-10 sm:mx-auto sm:w-[350px]">
        <h1 className="font-bold text-6xl mb-5">{t('home.title')}</h1>

        <Link
          className="text-3xl mx-auto mt-3 text-blue-600 hover:text-blue-700 visited:text-primary-600"
          href={urls.perfil}
        >
          Perfil
        </Link>
      </div>
    </CenterContent>
  );
}
