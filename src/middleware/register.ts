import {MiddlewareFunction} from 'http-request-handler';

import {Config} from '../config.js';
import {getKeyCloakClient} from '../util/keycloak.js';
import {Logger} from '../util/logger.js';

const log = new Logger('cerc:keycloak-userreg:mw:register');

export const RegisterMW : MiddlewareFunction = async (request, response, data, resolve, reject) =>{
  if (!data?.json?.username) {
    log.error(data);
    log.error('Invalid request', request.body);
    reject(400);
    return;
  }

  const client = await getKeyCloakClient();
  const userRequest = {
    username: data.json.username,
    groups: Config.TARGET_GROUPS,
    realm: Config.TARGET_REALM
  };

  log.debug('Creating user:', userRequest);
  try {
    const result = await client.users.create(userRequest);
    log.debug('Created user:', result.id);
    const user = await client.users.findOne({ realm: userRequest.realm, id: result.id});
    log.debug(user);
    response.send({
      'username': user?.username,
      'api-key': (user?.attributes as any)['api-key']
    });
    resolve();
  } catch (e) {
    log.error('Error creating user', userRequest, e);
    reject(500);
  }
};
