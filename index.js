'use strict';

const CONFIG = {
  API_KEY: '29874897-d929-49e8-8b94-30c96a448686',
  MAX_PICS_PER_QUERY: 10,
  MAX_URLS_TO_PRELOAD: 100,
  LOADED_IMAGES: 0
}


/**
 * Created using this reference: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 * @returns an array of of urls of length "CONFIG.MAX_PICS_PER_QUERY"
 */
async function getCatUrlsFromAPI() {
  console.log('Started API call...');

  const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=${CONFIG.MAX_PICS_PER_QUERY}`
  // , {
    // method: 'GET', // *GET, POST, PUT, DELETE, etc.
    // mode: 'cors', // no-cors, *cors, same-origin
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'include', // include, *same-origin, omit
    // headers: {
    //   'Content-Type': 'application/json',
    //   'x-api-key': CONFIG.API_KEY
    // },
    // redirect: 'follow', // manual, *follow, error
    // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    // body: JSON.stringify(data) // body data type must match "Content-Type" header
  // }
  )

  // response.json() is going to be an array
  let urlList = await response.json()//.map(obj => obj.url);
  // console.log(urlList);
  urlList = urlList.map(obj => obj.url);
  console.log('urlList retrieved: ', urlList);
  return urlList;
}


/**
 * Throws if input is not a number.
 * @param {integer} listLength - the length of the list
 * @returns a random index from 0 to (listLength - 1)
 */
function getRandomIndex(listLength) {
  if(typeof listLength != 'number') {
    throw Error(`${listLength} is not a valid number`);
  }
  listLength = Math.floor(listLength);
  const index = Math.floor(Math.random() * listLength);
  return index;
}




/**
 * 
 * @returns A string with the URL of a random picture
 */
async function getRandomCatPic() {
  const urls = await getCatUrlsFromAPI();
  const pic = urls[getRandomIndex(urls.length)];
  return pic;
}

/**
 * Appends an <img> tag to the predefined #cat-image div
 */
 function loadCatImage() {
  getRandomCatPic().then(url => {
    const img = document.querySelector('#cat-image');
    img.src = url;
    CONFIG.LOADED_IMAGES++;
    console.log('image loaded', CONFIG.LOADED_IMAGES);
    // TODO make alt attribute dynamic according to what comes from the API call
  });
}

/**
 * Changes the background of an element with a random cat image
 * @param {string} id - the id of the element, prefixed with '#'
 */
 function loadCatImageAsBackground(id) {
  getRandomCatPic().then(url => {
    document.querySelector(id).style.backgroundImage = url;
  });
}



loadCatImage();