import type { NextApiRequest, NextApiResponse } from 'next';

import { withSessionRoute } from 'src/helpers/withSession';

export default withSessionRoute(userRoute);

async function userRoute(req: NextApiRequest, res: NextApiResponse) {
  req.session.destroy();

  setTimeout(() => {
    res.send({
      message: 'Logout',
    });
  }, 1000);
}
