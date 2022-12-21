import type { NextApiRequest, NextApiResponse } from 'next';

import { withSessionRoute } from 'src/helpers/withSession';

export default withSessionRoute(userRoute);

async function userRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.session.user) {
    res.send(req.session.user);
  }
  res.status(404);
  res.json({
    message: 'User not loged',
  });
}
