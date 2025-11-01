import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { BaseAuthGuard } from './base-auth.guard';
import { ROLES_KEY } from '../decorators/user-role.decorator';
import { UserType } from 'src/utils/enums';

@Injectable()
export class AuthRolesGuard extends BaseAuthGuard implements CanActivate {
  constructor(
    jwtService: JwtService,
    configService: ConfigService,
    private readonly reflector: Reflector,
  ) {
    super(jwtService, configService);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndOverride<UserType[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles || roles.length === 0) return true;

    const request: Request = context.switchToHttp().getRequest();

    const payload = await this.verifyToken(request);

    if (!roles.includes(payload.role)) {
      throw new ForbiddenException('Access denied: insufficient permissions');
    }

    return true;
  }
}
