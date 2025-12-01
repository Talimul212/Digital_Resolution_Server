import { UserModel } from '../user/user.model';
import jwt from 'jsonwebtoken';
import { TLoginUser } from './auth.interface';
import config from '../../config';
import { IUser } from '../user/user.interface';

const JWT_SECRET = config.jwt_access_secret || 'your_jwt_secret';

export const AuthService = {
  async createUser(data: IUser) {
    return await UserModel.create(data);
  },
  async login({ email, password }: TLoginUser) {
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error('User not found');

    if (user.password !== password) {
      throw new Error('Invalid credentials');
    }


    const token = jwt.sign(
      { id: user._id, role: user.userType },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    return {
      token,
      user: {
        _id: user._id,
        email: user.email,
        userType: user.userType,
      }
    };
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
