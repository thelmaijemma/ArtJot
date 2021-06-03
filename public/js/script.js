'use strict';
function getArt(search){
const url = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${search}&hasImages=true`;
console.log(url)
      fetch(url)
  .then(response => response.json())
  .then(responseJson => {
    displayResults(responseJson)
  }
    );
  
}

function displayResults(responseJson) {
  console.log(responseJson);
  randomArt(responseJson);

}

function randomArt(res){
  let random = res.objectIDs[Math.floor(Math.random()*res.objectIDs.length)];
    console.log(random)
    getArtPic(random)
  
}

function getArtPic(id){
  const picurl = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
     fetch(picurl)
  .then(response => response.json())
  .then(responseJson => {
    console.log(responseJson)
    $('#two')
    .html(`<img src="${responseJson.primaryImage}" class="frame" width="290" id="framed"></img>
    <input type="hidden" id="primaryImage" name="primaryImage" value="${responseJson.primaryImage}">
    <input type="submit" value="Save" class="btn pink">
    <a href="/dashboard" class="btn yellow">Cancel</a>`);
    $('#one')
    .append(`<p>Art Loaded, You Can Search Again Before Saving</p>`)
  }
    );
}


function watchForm() {
$('#search').click(event => {
event.preventDefault();
   const search = $('#body').val();
getWord(search)
})}

$(watchForm);


function getWord(search){
  const array = search.split(/[" ",?,.,!]/)
  console.log(array)
  pickSearch(array)
}

function pickSearch(array){
   let random = array[Math.floor(Math.random()*array.length)];
   console.log(random)
   if (random.length >= 5){
     getArt(random)
   } else if(random.length < 3){
     let random2 = array[Math.floor(Math.random()*array.length)];
     getArt(random2)
    } else {
     let body = "body" 
     console.log(body)
   getArt(body)
   console.log("nope")}
}

