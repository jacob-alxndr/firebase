const apiURL = 'https://ign-apis.herokuapp.com/';

// 'https://api.wheretheiss.at/v1/satellites/25544';
// https://ign-apis.herokuapp.com/

async function getIGN() {
  const response = await fetch(apiURL);
  const data = await response.json();
  console.log(data);
}

getIGN();
