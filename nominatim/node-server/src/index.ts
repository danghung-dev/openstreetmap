import 'reflect-metadata'; // this shim is required
import {
  createExpressServer,
  Action,
  getMetadataArgsStorage,
} from 'routing-controllers';
import { AuthenMiddleware } from './middlewares/auth.middleware';
import { LogMiddleware } from './middlewares/log.middleware';
import { Express } from 'express';
import { getFromContainer, MetadataStorage } from 'class-validator'; // tslint:disable-line
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import * as swaggerUi from 'swagger-ui-express';
import * as fs from 'fs';
import { ConfigSerivce } from './config/config.service';
import { logger } from './common/log.service';
import { expressListController } from './common';

const routingControllersOptions = {
  authorizationChecker: async (action: Action, roles: string[]) => {
    const user = action.request.user;
    if (user && !roles.length) {
      return true;
    }
    if (user && roles.find(role => user.roles.indexOf(role) !== -1)) {
      return true;
    }
    return false;
  },
  currentUserChecker: (action: Action) => {
    return action.request.user;
  },
  controllers: expressListController, // we specify controllers we want to use
  middlewares: [AuthenMiddleware, LogMiddleware],
  routePrefix: '/v1'
};

// creates express app, registers all controller routes and returns you express app instance
const app: Express = createExpressServer(routingControllersOptions);

// Parse class-validator classes into JSON Schema:
const metadatas = (getFromContainer(MetadataStorage) as any)
  .validationMetadatas;
const schemas = validationMetadatasToSchemas(metadatas, {
  refPointerPrefix: '#/components/schemas/',
});
const storage = getMetadataArgsStorage();
const spec = routingControllersToSpec(storage, routingControllersOptions, {
  components: {
    schemas,
    securitySchemes: {
      JWT: {
        description: '',
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
  },
  info: {
    description: 'Smartlog STX API',
    title: 'Smartlog STX API',
    version: '1.0.0',
  },
});

const swaggerDocument2 = JSON.stringify(spec);
fs.writeFileSync('./swagger.json', swaggerDocument2);
const swaggerDocument = require('../swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// // Render spec on root:
// app.get('/', (_req, res) => {
//   res.json(spec);
// });

// Reponse load balancer health check
app.get('/', (_req, res) => {
  res.send('ok');
});
// run express application on port 3000
app.listen(ConfigSerivce.env.PORT, err => {
  if (err) {
    logger.error('server.cannot.start');
  }
  // TODO: send log to slack with timezone +7
  logger.info('server.started', { time: new Date() });
});

