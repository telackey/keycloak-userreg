import KcAdminClient from '@keycloak/keycloak-admin-client';

import {Config} from '../config.js';

export const getKeyCloakClient = async () => {
  const kcAdminClient = new KcAdminClient(
    {
      baseUrl: Config.API_URL,
      realmName: 'master'
    }
  );

  await kcAdminClient.auth({
    username: Config.REG_USER,
    password: Config.REG_PW,
    grantType: 'password',
    clientId: Config.REG_CLIENT_ID,
  });

  return kcAdminClient;
};
