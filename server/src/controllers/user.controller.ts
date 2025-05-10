import { DB_COLLECTIONS } from '../config/MongoDB.config';
import { HttpStatusCode } from '../constants/error.constants';
import UserModel from '../models/User.model';
import appAssert from '../utils/appErrorAssert.utils';
import catchErrors from '../utils/catchErrors.utils';

const SERVICE_NAME = DB_COLLECTIONS.Users;

export const getUser = catchErrors(async (req, res) => {
  const user = await UserModel.findById(req.userId);
  appAssert(user, HttpStatusCode.NotFound, 'User not found', SERVICE_NAME);
  const data = {user: user.omitPassword(), session: req.sessionId};
  
  return res.status(HttpStatusCode.OK).json(data);
});

export default { getUser };
