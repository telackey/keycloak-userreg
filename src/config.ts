export const Config = {
  LISTEN_PORT: process.env.CERC_KCUSERREG_LISTEN_PORT || 9292,
  API_URL: process.env.CERC_KCUSERREG_API_URL || 'http://localhost:57198/auth',
  REG_USER: process.env.CERC_KCUSERREG_REG_USER || 'admin',
  REG_PW: process.env.CERC_KCUSERREG_REG_PW || 'admin',
  REG_CLIENT_ID: process.env.CERC_KCUSERREG_REG_CLIENT_ID || 'admin-cli',
  TARGET_REALM: process.env.CERC_KCUSERREG_TARGET_REALM || 'cerc',
  TARGET_GROUPS: process.env.CERC_KCUSERREG_TARGET_GROUPS?.split(',') || ['eth'],
};
