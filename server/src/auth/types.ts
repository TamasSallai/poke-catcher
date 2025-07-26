import { User } from 'generated/prisma';

export type PublicUser = Pick<User, 'id' | 'email' | 'displayName'>;

export type AccessTokenPayload = {
  id: string;
  user: PublicUser;
};

export type RefreshTokenPayload = {
  id: string;
};
