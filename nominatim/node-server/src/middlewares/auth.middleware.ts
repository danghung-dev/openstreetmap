import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';

@Middleware({ type: 'before' })
export class AuthenMiddleware implements ExpressMiddlewareInterface {
  async use(request: any, response: any, next: any): Promise<any> {
    request.user = null;
    next();
  }
}
