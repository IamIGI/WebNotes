import { Request, RequestHandler } from 'express';
import appAssert from '../utils/appErrorAssert.utils';
import { AppErrorCode, HttpStatusCode } from '../constants/error.constants';
import jwtUtils from '../utils/jwt.utils';
import mongoose from 'mongoose';
import SessionModel from '../models/Session.model';
import catchErrors from '../utils/catchErrors.utils';

const MIDDLEWARE_NAME = 'Authentication';

const authenticate: RequestHandler =  catchErrors(async (req, res, next) => {
  const accessToken = req.cookies.accessToken as string | undefined;

  appAssert(
    accessToken,
    HttpStatusCode.Unauthorized,
    'Not authorized',
    MIDDLEWARE_NAME,
    AppErrorCode.InvalidAccessToken
  );

  const { error, payload } = jwtUtils.verifyToken(accessToken);
  appAssert(
    payload,
    HttpStatusCode.Unauthorized,
    error === 'jtw expired' ? 'Token expired' : 'Token invalid',
    MIDDLEWARE_NAME,
    AppErrorCode.InvalidAccessToken
  );

  const userSession = await SessionModel.findById(payload.sessionId);
  appAssert(
    userSession,
    HttpStatusCode.Unauthorized,
    'Not authorized',
    MIDDLEWARE_NAME,
    AppErrorCode.InvalidAccessToken
  );

  req.userId = payload.userId as mongoose.Types.ObjectId;
  req.sessionId = payload.sessionId as mongoose.Types.ObjectId;
  next();
});

export default authenticate;
