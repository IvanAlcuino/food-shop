// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDuvDMenvp3uYuH_nRazq_o75oyNFbSRv4",
    authDomain: "food-shop-db.firebaseapp.com",
    databaseURL: "https://food-shop-db.firebaseio.com",
    projectId: "food-shop-db",
    storageBucket: "",
    messagingSenderId: "195204200734"

  }
};
