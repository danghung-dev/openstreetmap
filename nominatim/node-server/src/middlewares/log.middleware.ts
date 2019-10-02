import {
  Middleware,
  ExpressErrorMiddlewareInterface,
} from 'routing-controllers';

// TODO: send error to slack channel
process.on('uncaughtException', error => {
  console.log('uncaughtException', error);
});

// TODO: send error to slack channel
process.on('unhandledRejection', (reason, p) => {
  console.log('unhandledRejection', reason, p);
});

@Middleware({ type: 'after' })
export class LogMiddleware implements ExpressErrorMiddlewareInterface {
  error(error: any, request: any, response: any, next: any) {
    console.log(error, 'something...');
    next();
  }
}
