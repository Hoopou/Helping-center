export const environment = { //environemment de DEV
  production: false,
  API_URL: 'https://localhost:44379/api/',
  urlRedirectCookie: "afterLoginRedirectUrl",
  cookies: {
    emailCookie: "email", //besoin pour l'entete
    usernameCookie: "username"
  },
  maxImageSize: 10485760, // 10Mb
  languages: {
    fr: "Français",
    en: "English"
  },
  MicrosoftOAuthSettings: {
    appId: '',
    scopes: [
      "Mail.Read",
      "Mail.Read.Shared",
      "User.Read.All",
      "Files.Read.All"
    ],
    tenantId: '',
    redirectUri: '',
    loginUri: 'https://login.microsoftonline.com/'
  },
 
  firebaseConfig : {
    apiKey: "-7nWjuk",
    authDomain: "pushnoti-.firebaseapp.com",
    databaseURL: "https://pushbaseio.com",
    projectId: "pushnoti8",
    storageBucket: "pushnot.com",
    messagingSenderId: "302563",
    appId: "1:968753c2ac951",
    SendingKey: "AAAARm79BcMaA"

  }
};
