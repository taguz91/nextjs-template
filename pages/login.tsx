import type { NextPage } from 'next';

import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { SubmitButton } from 'src/components/button';
import { FormContainer, PasswordInput, TextInput } from 'src/components/form';
import { LineSeparator } from 'src/components/ui';
import { useSubmitInternal } from 'src/hooks/useSubmit';
import { withSession } from 'src/helpers/withSession';
import { setAuthState } from 'src/store/authSlice';
import { ProfileStateType } from 'src/interfaces/user.types';
import { useText } from 'src/hooks/useText';
import { loginValidations } from 'src/data/validations/form.validations';
import { CenterContent } from 'src/layouts/CenterContent';
import { PERFIL } from 'src/data/local/user.data';
import urls from 'config/urls.json';

const Login: NextPage = () => {
  const router = useRouter();
  const t = useText();

  const { isSend, submit } = useSubmitInternal<ProfileStateType>({
    service: urls.apiLogin,
    redirect: urls.login,
    returnData: true,
    loading: {
      title: t('login.submit.title'),
      message: t('login.submit.message'),
    },
  });
  const dispatch = useDispatch();

  return (
    <CenterContent description={t('login.pageDescription')} title={t('login.pageTitle')}>
      <div className="w-full sm:mx-auto sm:w-[350px] sm:border-slate-300 sm:border px-9 py-6 rounded-lg">
        <h1 className="text-gray-500 font-bold text-4xl text-left">{t('login.title')}</h1>
        <p className="mt-3 text-gray-600 mb-5">{t('login.sub-title')}</p>

        <FormContainer
          validations={loginValidations}
          onSubmit={async (data) => {
            if (isSend) {
              return;
            }

            const res = await submit({
              ...PERFIL,
              ...{
                user: {
                  email: data.email,
                  username: data.email,
                },
              },
            });

            if (res) {
              dispatch(setAuthState(res));
              router.replace(urls.perfil);
            }
          }}
        >
          <div className="py-1">
            <TextInput
              label={t('login.email.label')}
              name="email"
              placeholder={t('login.email.placeholder')}
            />
          </div>

          <div className="py-1">
            <PasswordInput
              label={t('login.password.label')}
              name="password"
              placeholder={t('login.password.placeholder')}
            />
          </div>

          <div className="py-3">
            <SubmitButton label={t(isSend ? 'login.button.loading' : 'login.button')} />
          </div>
        </FormContainer>

        <LineSeparator label={t('login.forgot-password')} />

        <p className="mt-3 text-center text-gray-600 my-1">{t('login.footer-new-password')}</p>
      </div>
    </CenterContent>
  );
};

export const getServerSideProps = withSession((ctx) => {
  const user = ctx.req.session?.user;

  if (user?.user) {
    return {
      redirect: {
        destination: urls.perfil,
        statusCode: 302,
      },
    };
  }

  return {
    props: {},
  };
});

export default Login;
