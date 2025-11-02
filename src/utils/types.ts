import { UserType } from './enums';

export interface JWTPayloadType {
  id: number;
  email: string;
  name: string;
  role: UserType;
  iat?: number;
  exp?: number;
}
