import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
} from "next";

import { sessionOptions } from "src/constants/app";
import { ProfileStateType } from "src/interfaces/user.types";
import { wrapper } from "src/store";
import { setAuthState } from "src/store/authSlice";

declare module "iron-session" {
  interface IronSessionData {
    user?: ProfileStateType;
  }
}
 
type HandlerType<P> = (
  context: GetServerSidePropsContext
) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>;

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

// Theses types are compatible with InferGetStaticPropsType https://nextjs.org/docs/basic-features/data-fetching#typescript-use-getstaticprops
export function withSessionStore<
  P extends { [key: string]: unknown } = { [key: string]: unknown },
>(
  handler: (
    context: GetServerSidePropsContext,
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>,
) {
  return withIronSessionSsr(wrapper.getServerSideProps(
    (store) => async (ctx)=> {
        const user = ctx.req.session?.user;

        if (user && user.access_token) {
          store.dispatch(setAuthState(user));
        }

        return handler(ctx);
    }
  ), sessionOptions);
}

export function withSession<
  P extends { [key: string]: unknown } = { [key: string]: unknown },
>(
  handler: HandlerType<P>,
) {
  return withIronSessionSsr(handler, sessionOptions);
}