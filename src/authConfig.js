export const msalConfig = {
  auth: {
    clientId: "231a6d14-71c8-4764-8840-45fc43ac174f", // Get this from your App Registration
    authority: "https://plivhan321gogmail.b2clogin.com/plivhan321gogmail.onmicrosoft.com/B2C_1_signupsignin",
    knownAuthorities: ["plivhan321gogmail.b2clogin.com"],
    redirectUri: "/",
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};
