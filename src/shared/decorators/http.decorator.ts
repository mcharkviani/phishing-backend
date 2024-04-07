import { applyDecorators, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { LoggedInUserInterceptor } from '../interceptors/logged-in-user';
import { ErrorMessage } from '../constant/error-message.constant';
import { AuthGuard } from '../guards/auth.guard';

export function Auth(): <TFunction, Y>(
  target: object | TFunction,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<Y>,
) => void {
  return applyDecorators(
    UseGuards(AuthGuard),
    ApiBearerAuth(),
    UseInterceptors(LoggedInUserInterceptor),
    ApiUnauthorizedResponse({ description: ErrorMessage.UNAUTHORIZED }),
  );
}
