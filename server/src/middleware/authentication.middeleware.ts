import {  RequestHandler } from 'express';
import appAssert from '../utils/appErrorAssert.utils';
import { AppErrorCode, HttpStatusCode } from '../constants/error.constants';
import jwtUtils from '../utils/jwt.utils';
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

  req.userId = payload.userId as string;
  req.sessionId = payload.sessionId;
  next();
});

export default authenticate;
