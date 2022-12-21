import type { NextApiRequest, NextApiResponse } from 'next';

import { withSessionRoute } from 'src/helpers/withSession';

export default withSessionRoute(loginRoute);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  let loged = false;

  if (req.body?.access_token) {
    req.session.user = req.body;
    await req.session.save();
    loged = true;
  }

  setTimeout(() => {
    res.send({
      message: 'Logged in',
      isLoged: loged,
    });
  }, 1000);
}
