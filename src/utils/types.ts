import { UserType } from './enums';

export interface JWTPayloadType {
  sub: string;
  email: string;
  name: string;
  role: UserType;
  iat?: number;
  exp?: number;
}
