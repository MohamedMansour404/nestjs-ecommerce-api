import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JWTPayloadType } from 'src/utils/types';
import { CURRENT_USER_KEY } from 'src/utils/constants';

export abstract class BaseAuthGuard {
  constructor(
    protected readonly jwtService: JwtService,
    protected readonly configService: ConfigService,
  ) {}

  protected async verifyToken(request: Request): Promise<JWTPayloadType> {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    if (type?.toLowerCase() !== 'bearer' || !token) {
      throw new UnauthorizedException('Access denied: No or invalid token');
    }

    try {
      const payload: JWTPayloadType = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      request[CURRENT_USER_KEY] = payload;
      return payload;
    } catch (error) {
      console.error('JWT verification failed:', error);
      throw new UnauthorizedException(
        'Access denied: Invalid or expired token',
      );
    }
  }
}
