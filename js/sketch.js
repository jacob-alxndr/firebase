let nodeData; // obeject we will push to firebase
let fbData; // data we pull from firebase
let fbDataArray; // firebase data values converted to an Array
let database; // reference to our firebase database
const folderName = 'messages'; // name of folder you create in db

function setup() {
  noCanvas();

  // Initialize firebase
  // support for Firebase Realtime Database 4 web here: https://firebase.google.com/docs/database/web/start
  // Copy and paste your config here (replace object commented out)
  // ---> directions on finding config below

  // paste your config file here
  const config = {
    apiKey: 'AIzaSyDCgdmBxjoYzsqKOj6F8p9Lxry3Iu20oKk',
    authDomain: 'messageinabottle-4ee9f.firebaseapp.com',
    databaseURL: 'https://messageinabottle-4ee9f.firebaseio.com',
    projectId: 'messageinabottle-4ee9f',
    storageBucket: 'messageinabottle-4ee9f.appspot.com',
    messagingSenderId: '1029081416271',
    appId: '1:1029081416271:web:7c4f60842968a01527e03a',
  };

  // initialize cofig
  firebase.initializeApp(config);
  // store database
  database = firebase.database();

  // this references the folder you want your data to appear in
  const ref = database.ref(folderName);
  // **** folderName must be consistant across all calls to this folder

  ref.on('value', recievedData, errData);

  // ---> To find your config object:
  // They will provide it during Firebase setup
  // or (if your project already created)
  // 1. Go to main console page
  // 2. Click on project
  // 3. On project home page click on name of app under project name (in large font)
  // 4. Click the gear icon --> it's in there!

  // database page
  // https://console.firebase.google.com/u/1/project/messageinabottle-4ee9f/database/messageinabottle-4ee9f/data
  // Your web app's Firebase configuration
}

function draw() {}
