// src/authConfig.js
export const msalConfig = {
  auth: {
    clientId: "YOUR_CLIENT_ID",
    authority: "https://YOUR_TENANT_NAME.b2clogin.com/YOUR_TENANT_NAME.onmicrosoft.com/B2C_1_signupsignin",
    knownAuthorities: ["YOUR_TENANT_NAME.b2clogin.com"],
    redirectUri: "/",
  },
};

export const loginRequest = {
  scopes: ["openid", "profile"],
};
