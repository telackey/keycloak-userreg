import {MiddlewareFunction} from 'http-request-handler';

import {Logger} from '../util/logger.js';

const log = new Logger('cerc:keycloak-userreg:mw:cors');

export const CorsMW: MiddlewareFunction = (request, response, data, resolve, reject) => {
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Headers', '*')
  resolve()
};
