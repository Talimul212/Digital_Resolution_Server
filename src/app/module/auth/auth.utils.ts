import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { userId: string; role: string },
  secret: Secret,
  expiresIn: SignOptions['expiresIn'],
): string => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  }) as string;
};

export const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};
