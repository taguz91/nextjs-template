import { CancelButton } from 'src/components/button';
import urls from 'config/urls.json';
import { useSubmitInternal } from 'src/hooks/useSubmit';
import { useText } from 'src/hooks/useText';
import { useUsuario } from 'src/hooks/useUsuario';
import { CenterContent } from 'src/layouts/CenterContent';

export default function Perfil() {
  const { submit, isSend } = useSubmitInternal({
    service: urls.apiLogout,
    redirect: urls.login,
  });

  const t = useText();
  const user = useUsuario();

  return (
    <CenterContent description={t('perfil.pageDescription')} title={t('perfil.pageTitle')}>
      <div className="w-full mx-10 sm:mx-auto sm:w-[350px]">
        <h1 className="font-bold text-6xl mb-3">{t('perfil.title')}</h1>
        <h2 className="mt-2 mb-4 text-center">{user.profile.user?.username}</h2>

        <CancelButton
          label={t(isSend ? 'perfil.closeLoading' : 'perfil.close')}
          onClick={() => {
            if (!isSend) {
              submit({});
            }
          }}
        />
      </div>
    </CenterContent>
  );
}
