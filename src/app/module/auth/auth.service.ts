import { UserModel } from '../user/user.model';
import jwt from 'jsonwebtoken';
import { TLoginUser } from './auth.interface';
import config from '../../config';

const JWT_SECRET = config.jwt_access_secret || 'your_jwt_secret';

export const AuthService = {
  async login({ email, password }: TLoginUser) {
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error('User not found');

    if (user.password !== password) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { userId: user._id, role: user.userType },
      JWT_SECRET,
      { expiresIn: '1d' },
    );

    return { token, user };
  },

  async validate(token: string) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded;
    } catch {
      throw new Error('Invalid or expired token');
    }
  },
};
