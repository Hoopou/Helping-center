export const environment = {
  production: true,
  API_URL: 'https://5424-35239.el-alt.com/api/',
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
  SettingsTables: [
    {name: 'State' , value : 'Etat'},
    {name: 'Buildings' , value : 'Immeubles'},
    {name: 'Formation category' , value : 'CategorieFormation'},
    {name: 'Formation type' , value : 'TypeFormation'},
    {name: 'Formation frequency' , value : 'FrequenceFormation'},
    {name: 'Formation status' , value : 'StatusFormation'},
    {name: 'Employee category' ,  value : 'CategorieEmploye'},
    {name: 'Civility' ,   value : 'Civilite'},
    {name: 'Employee language', value : 'LangueEmploye'}
  ],
  firebaseConfig : {
    apiKey: "AIzaSyDCuk",
    authDomain: "pushnotapp.com",
    databaseURL: "https://purebaseio.com",
    projectId: "pushn",
    storageBucket: "pusht.com",
    messagingSenderId: "306563",
    appId: "1:96875399792653c2ac951",
    SendingKey: "AAAARm79BcM:"

  }

};
