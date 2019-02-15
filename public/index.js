const dogContainer = document.getElementById('dog-container');

function makeElement(htmlTag, tagContent){
  const element = document.createElement(htmlTag);
  element.textContent = tagContent;
  return element;
}
function deleteDogs(dogId){
  fetch('/dogs/'+ dogId, {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
  })
  .then(response => response.json())
  .then( (myJson) => {
    console.log(myJson);
    fetchDogs();
  }); // parses response to JSON
};

function updateDogs(dogId, newName, newAge){
  const customPath = '/dogs/' + dogId + '?name=' + newName + '&age=' + newAge;
  // /dog/dog_id?name=NEWDOGNAME&age=NEWDOGAGE
  fetch(customPath, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
  })
  .then(response => response.json())
  .then( (myJson) => {
    console.log(myJson);
    fetchDogs();
  }); // parses response to JSON
};

function makeDog(newName, newAge){
  const customPath = '/dogs?name='+ newName + '&age=' + newAge;
  // /dog?name=NEWDOGNAME&age=NEWDOGAGE
  fetch(customPath, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
  })
  .then(response => response.json())
  .then( (myJson) => {
    console.log(myJson);
    fetchDogs();
  }); // parses response to JSON
};

function fetchDogs(){
  fetch('/dogs')
  .then(response => response.json())
  .then( (myJson) => {
    const returnedDogs = JSON.stringify(myJson);
    for (let i = 0; i < myJson.length; i++) {
      const nameElement = makeElement('li', myJson[i].name);
      const ageElement = makeElement('li', myJson[i].age);
      const lineBreak = makeElement('br');
      dogContainer.append(nameElement);
      dogContainer.append(ageElement);
      dogContainer.append(lineBreak);
    }
  })
}


//fetchDogs();
//deleteDogs('5c632b6a53013e50a43cbe36');
//updateDogs('5c632f3d4e185a50d92e4922', 'TheeMonitor', '99');
makeDog('PoochieFace', '7');
