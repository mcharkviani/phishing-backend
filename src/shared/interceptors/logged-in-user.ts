import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class LoggedInUserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: any = context.switchToHttp().getRequest();
    const user = request.user;
    request['user'] = user;
    // ContextService.set('user', user);

    return next.handle();
  }
}
