import {MiddlewareFunction} from 'http-request-handler';

import {Config} from '../config.js';
import {getKeyCloakClient} from '../util/keycloak.js';
import {Logger} from '../util/logger.js';

const log = new Logger('cerc:keycloak-userreg:mw:register');

export const RegisterMW : MiddlewareFunction = async (request, response, data, resolve, reject) =>{
  if (!data?.json?.email && !data?.json?.username) {
    log.error(data);
    log.error('Invalid request', request.body);
    reject(400);
    return;
  }

  const userRequest = {
    username: data.json.username || data.json.email,
    email: data.json.email,
    enabled: Config.CREATE_ENABLED,
    groups: Config.TARGET_GROUPS,
    realm: Config.TARGET_REALM
  };

  try {
    const client = await getKeyCloakClient();

    log.debug('Creating user:', userRequest);
    const result = await client.users.create(userRequest);
    log.debug('Created user:', result.id);
    const user = await client.users.findOne({ realm: userRequest.realm, id: result.id});
    log.debug(user);
    response.send({
      'username': user?.username,
      'email': user?.email,
      'api-key': (user?.attributes as any)['api-key']
    });
    resolve();
  } catch (e) {
    log.error('Error creating user', userRequest, e);
    reject(500);
  }
};
