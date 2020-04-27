// /* eslint-disable */
function recievedData(data) {
  // need to retrieve firebase data with val() method
  // this returns an object of all data
  fbData = data.val();

  // fbData
  //   ? (fbDataArray =
  //       Object.values(fbData) && console.log('received data:', fbData))
  //   : console.log('nothing in this folder yet');
  if (fbData) {
    // check to see if there is something in your database to start
    // console.log('received data:', fbData);

    // create an array of the post values (if you need to loop through it retaining order of entries)
    fbDataArray = Object.values(fbData);
  } else {
    console.log('nothing in this folder yet');
  }
}

console.log(fbDataArray);
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

const form = document.querySelector('form.send');
const receiveButton = document.querySelector('button.receive');

function sendMessage(e) {
  // e.preventDefault();
  const messageInput = form.querySelector('textarea[name="message"]');
  const timeStamp = Date.now();
  console.dir(timeStamp);

  const validChars = char => char.match(/[a-z1-9 .\n]/i);

  const results = [...messageInput.value].filter(validChars).join('');

  console.log(results);

  nodeData = { message: messageInput.value, timeStamp };

  createNode(folderName, timeStamp, nodeData);

  alert('Message Sent');
}

function receiveMessage(e) {
  e.preventDefault();
  const randomNumber = Math.floor(Math.random() * fbDataArray.length);
  const pTag = document.querySelector('.receivedData');
  console.log(randomNumber);

  pTag.textContent = fbDataArray[randomNumber].message;
}

form.addEventListener('submit', sendMessage);
receiveButton.addEventListener('click', receiveMessage);

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
