import * as http from 'http';
import {HttpMethod, HTTPRequestHandler} from 'http-request-handler';

import {Config} from './config.js';
import {JsonParserMW} from './middleware/json_parser.js';
import {RegisterMW} from './middleware/register.js';
import {Logger} from './util/logger.js';

const log = new Logger('cerc:keycloak-userreg');
const handler = new HTTPRequestHandler();

handler.on(HttpMethod.HTTP_POST, '/register', [JsonParserMW, RegisterMW], async (request, response) => {
  // If nothing has answered by now, return an error.
  response.error(500);
});

http.createServer(handler.getListener()).listen(Config.LISTEN_PORT);
