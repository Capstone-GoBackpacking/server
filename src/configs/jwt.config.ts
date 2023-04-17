import * as dotenv from 'dotenv';
dotenv.config();

export const jwtConfigs = {
  secret: process.env.JWT_SECRET_KEY,
  expireTime: '1h',
};
