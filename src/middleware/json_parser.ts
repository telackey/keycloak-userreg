import {MiddlewareFunction} from 'http-request-handler';

import {Logger} from '../util/logger.js';

const log = new Logger('cerc:keycloak-userreg:mw:json-parser');

export const JsonParserMW: MiddlewareFunction = (request, response, data, resolve, reject) => {
  if (request.headers['content-type'] !== 'application/json') {
    resolve();
    return;
  }

  try {
    const body = JSON.parse(request.body);
    resolve({
      json: body
    });
  } catch (e) {
    log.error('Error parsing JSON body', e, request.body);
    reject(400);
  }
};
