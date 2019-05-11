export const environment = {
  production: true,
  apiUrl: 'https://vanellimoney-api.herokuapp.com',

  tokenWhitelistedDomains: [ new RegExp('vanellimoney-api.herokuapp.com') ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]
};
