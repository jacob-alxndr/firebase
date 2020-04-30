// DOCS: https://github.com/larkbuck/xsocial/blob/master/README.md

let nodeData; // obeject we will push to firebase
let fbData; // data we pull from firebase
let fbDataArray; // firebase data values converted to an Array
let database; // reference to our firebase database
const folderName = 'messages'; // name of folder you create in db
const form = document.querySelector('form.send');
const receiveButton = document.querySelector('button.receive');
function start() {
  // Initialize firebase
  // support for Firebase Realtime Database 4 web here: https://firebase.google.com/docs/database/web/start

  // paste your config file here
  const configureKey = {
    apiKey: 'AIzaSyDCgdmBxjoYzsqKOj6F8p9Lxry3Iu20oKk',
    authDomain: 'messageinabottle-4ee9f.firebaseapp.com',
    databaseURL: 'https://messageinabottle-4ee9f.firebaseio.com',
    projectId: 'messageinabottle-4ee9f',
    storageBucket: 'messageinabottle-4ee9f.appspot.com',
    messagingSenderId: '1029081416271',
    appId: '1:1029081416271:web:7c4f60842968a01527e03a',
  };

  // initialize cofig
  firebase.initializeApp(configureKey);
  // store database
  database = firebase.database();

  // this references the folder you want your data to appear in
  const ref = database.ref(folderName);
  // **** folderName must be consistent across all calls to this folder
  // console.log(ref);
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
start();

function recievedData(data) {
  // need to retrieve firebase data with val() method
  // this returns an object of all data
  fbData = data.val();

  fbData
    ? (fbDataArray = Object.values(fbData))
    : console.log('nothing in this folder yet');
  // if (fbData) {
  //   // check to see if there is something in your database to start
  //   // console.log('received data:', fbData);

  //   // create an array of the post values (if you need to loop through it retaining order of entries)
  //   fbDataArray = Object.values(fbData);
  // } else {
  //   console.log('nothing in this folder yet');
  // }
}

function errData(err) {
  console.log('error! did not receive data');
  console.log(err);
}

// create a new node
// the node folder name, id, and object are all passed in as parameters
function createNode(_nodeFolder, _nodeId, _nodeObject) {
  firebase
    .database()
    .ref(`${_nodeFolder}/${_nodeId}`)
    .set(_nodeObject);
}

// call this function in the web console to create and seed the folder!
// createNode(folderName, "seed", {text: "this is to seed folder"});
// (to test you can just paste it into the web console)

// createNode(folderName, 'test', { text: 'hello' });

// the update method will update an existing node
function updateNode(_nodeFolder, _nodeID, _updateObject) {
  firebase
    .database()
    .ref(`${_nodeFolder}/${_nodeId}`)
    .update(_updateObject);
  // this will update existing key:value pair(s) OR add new ones to your object
  // so your object might look like:
  // { existingKey: updatedKeyValue,
  //   newKey: newValue }
  // Where the existing key is updated and newKey is added
}

// And this removes an entire node from your folder
function deleteNode(_nodeFolder, _nodeID) {
  firebase
    .database()
    .ref(`${_nodeFolder}/${_nodeID}`)
    .remove();
}

function sendMessage(e) {
  const messageInput = form.querySelector('textarea[name="message"]');
  const timeStamp = Date.now();
  // const validChars = char => char.match(/[a-z1-9 .\n]/i);
  // const results = [...messageInput.value].filter(validChars).join('');

  nodeData = { message: messageInput.value, timeStamp };

  createNode(folderName, timeStamp, nodeData);

  alert(
    'Thank you! Your message was received. Take care of yourself the best way you can :)'
  );
}

function receiveMessage(e) {
  e.preventDefault();
  const randomNumber = Math.floor(Math.random() * fbDataArray.length);
  const pTag = document.querySelector('.receivedData');
  pTag.textContent = fbDataArray[randomNumber].message;
}

form.addEventListener('submit', sendMessage);
receiveButton.addEventListener('click', receiveMessage);
