const BASEURL= "http://localhost:3000";
const ALPHABETARRAY = [" ","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]

document.addEventListener("DOMContentLoaded", (event) => {
    populateLetterFilters(letterFilters(), ALPHABETARRAY);
    postingChimera()
    populateChimeraList()
    randomButtoniser()
}
    )
let submit = () =>document.querySelector('#chimera-submit');
let name =() => document.querySelector('input#chimera-name');
let head = () => document.querySelector('select#chimera-head');
let torso = () => document.querySelector('select#chimera-torso');
let legs = () => document.querySelector('select#chimera-legs');
let wings = () => document.querySelector('select#chimera-wings');
let tail = () => document.querySelector('select#chimera-tail');
let letterFilters = () => document.getElementsByClassName("letter-filter")
let chimeraDiv = () => document.getElementById("chimera-list")
let animalSelect = () => document.getElementsByClassName("animal-select")
let randomButton = () => document.getElementsByClassName('randomiser-button')

function populateSelectOptions(list){
 
fetch(BASEURL + '/animals')
.then(resp => resp.json())
.then(animals => {
 
    switch (list.id){
        case "chimera-head":
            return addOptionsTo(list, animals)
        break;
        case "chimera-torso":
        return addOptionsTo(list, animals)
        break;
        case "chimera-wings":
            return addWingOptionsTo(list, animals)
        break;
            
        case "chimera-legs":
            return addLegOptionsTo(list, animals)
        break;
                
        case "chimera-tail":
            return addTailOptionsTo(list, animals)
        break;
    }
})
}


function addOptionsTo(list, listToAdd){
   let filterLetter = list.parentNode.querySelector(".letter-filter").value
listToAdd.forEach(element => {
    if (filterLetter === element.name[0]){
    let option = document.createElement("option")
    option.appendChild( document.createTextNode(element.name))
    option.id= `${list}-${element.id}`
    option.value = element.name;
    option.className = "Add-Animal";
    list.add(option)
    }
})

if (filterLetter === " "){
  addNoneOption(list)
}
}

function addWingOptionsTo(list, listToAdd){
    let filterLetter = list.parentNode.querySelector(".letter-filter").value
listToAdd.forEach(element => {
    if(element.wings=== true){
        if (filterLetter === element.name[0]){
    let option = document.createElement("option")
    option.appendChild( document.createTextNode(element.name))
    option.id= `${list}-${element.id}`
    option.value = element.name;
    option.className = "Add-Animal";
    list.add(option)}}
});
if (filterLetter === " "){
    addNoneOption(list)
  }
}

function addTailOptionsTo(list, listToAdd){
    let filterLetter = list.parentNode.querySelector(".letter-filter").value
    listToAdd.forEach(element => {
        if(element.tail=== true){
            if (filterLetter === element.name[0]){
        let option = document.createElement("option")
        option.appendChild( document.createTextNode(element.name))
        option.id= `${list}-${element.id}`
        option.value = element.name;
        option.className = "Add-Animal";
        list.add(option)}
    }
    });
    if (filterLetter === " "){
        addNoneOption(list)
      }
    }
function addLegOptionsTo(list, listToAdd){

    let filterLetter = list.parentNode.querySelector(".letter-filter").value
    listToAdd.forEach(element => {
        if(element.legs=== true){
            if (filterLetter === element.name[0]){
        let option = document.createElement("option")
        option.appendChild( document.createTextNode(element.name))
        option.id= `${list}-${element.id}`
        option.value = element.name;
        option.className = "Add-Animal";
        list.add(option)}}
    });
    if (filterLetter === " "){
        addNoneOption(list)
      }
    }

function populateLetterFilters(list, letters){
    for (let i=0; i<list.length; i++)
    {
        
        letters.forEach(element =>{
        let option = document.createElement("option")
        option.innerText = element
        option.value = element
        list[i].add(option)
        } )
        list[i].addEventListener('change', (event) =>{ 
            let letter = event.target.value
            let field =  event.target.parentNode.children[3]
            field.innerHTML = ""
            let repopFilter = field.id.split("-")[1]
            if (repopFilter === "head"){
                populateSelectOptions(head())
            }
            else if (repopFilter === "torso"){
                populateSelectOptions(torso())
            }
            else if (repopFilter === "wings"){
                populateSelectOptions(wings())
            }
            else if (repopFilter === "legs"){
                populateSelectOptions(legs())
            }
            else if (repopFilter === "tail"){
                populateSelectOptions(tail())
            }
         }
        )}
        
}

function addNoneOption(list){
    let noneOption = document.createElement("option")
    noneOption.innerText = "None"
    noneOption.value = "none"
    list.add(noneOption)
}

function postingChimera(){
    let button =submit()
    button.addEventListener("click", (event) => {
        event.preventDefault();
        const strongParams = {
            chimera: {
              name: name().value,
              head: head().value,
              torso: torso().value,
              wings: wings().value,
              legs: legs().value,
              tail: tail().value
            }
        }
        
        fetch(BASEURL+ "/chimeras", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify(strongParams)

        })
        .then(resp => resp.json())
        .then(chimera => {
            console.log("response got")
        console.log(chimera)
        let newChimera = setNewChimera(chimera)
        console.log(newChimera)
        let card = makeChimeraCard(newChimera)
        chimeraDiv().appendChild(card)
        resetLetterFilters()
        resetAnimalSelect()
        name().value = ""
      })
    }
    )
}


function resetLetterFilters(){
    let filters = letterFilters()
    for (let i =0; i<filters.length; i++){
        filters[i].value=" "
    }
}

function resetAnimalSelect(){
    let animalSelect= document.getElementsByClassName("animal-select")
    for (let i =0; i<animalSelect.length; i++){
        animalSelect[i].value = ""
    }
}

function populateChimeraList(){
    fetch(BASEURL+ '/chimeras')
    .then(resp => resp.json())
    .then(chimerasList => {
        console.log(chimerasList)
        chimerasList.forEach(chimera => {
           let chimeraCard = makeChimeraCard(chimera)
           chimeraDiv().appendChild(chimeraCard)
        })
    })

}

function makeChimeraCard(chimera){
    let chimeraCard = document.createElement("div")
    chimeraCard.className = "chimera-card"
    chimeraCard.id = `chimera-${chimera.id}`
    let name = document.createElement('h2')
    name.innerText = `Name: ${chimera.name}`
    let head = document.createElement('p')
    head.innerText = `Head: ${chimera.head}`
    let torso = document.createElement('p')
    torso.innerText = `Torso: ${chimera.torso}`

    let legs = document.createElement('p')
    legs.innerText = `Legs: ${chimera.legs}`
    
    
    let wings = document.createElement('p')
    wings.innerText = `Wings: ${chimera.wings}`
    
    let tail = document.createElement('p')
    tail.innerText = `Tail: ${chimera.tail}`

    let editButton = document.createElement('button')
    editButton.innerText = "Edit"
    editButton.id = `edit-${chimera.id}`
    editButton.addEventListener("click", editEntry())

    let deleteButton = document.createElement('button')
    deleteButton.innerText = "Delete"
    deleteButton.id = `delete-${chimera.id}`
    deleteButton.addEventListener("click", (event) => deleteEntry(event))
   
    chimeraCard.appendChild(name)
    chimeraCard.appendChild(head)
    chimeraCard.appendChild(torso)
    chimeraCard.appendChild(legs)
    chimeraCard.appendChild(wings)
    chimeraCard.appendChild(tail)
    chimeraCard.appendChild(editButton)
    chimeraCard.appendChild(deleteButton)
    return chimeraCard
}

function deleteEntry(){
let postId = event.target.id
let chimeraId = event.target.id.split("-")[1]
fetch(BASEURL+ '/chimeras' + `/${chimeraId}`, {
    method: "DELETE",
})
    let div = event.target.parentNode
    div.parentNode.removeChild(div)
}

function editEntry(){

}

function randomButtoniser(){
    let buttons = randomButton()
    for (i=0; i<buttons.length; i++){
        buttons[i].addEventListener("click", (event)=> {
            event.preventDefault();
            let letters = event.target.parentNode.getElementsByClassName("letter-filter")
            let alphabet = ALPHABETARRAY.slice(1)
            let num = randomNumFromArray(alphabet)
            let animalLetter = letters[0].value = alphabet[num]
            let animalSelector = event.target.parentNode.querySelector(".animal-select")
            let bodyPart = animalSelector.id.split("-")[1]
            let animal = getAnimal(bodyPart, animalLetter, animalSelector)
            animalSelector.value = animal

        })
    }
}

function randomNumFromArray(array){
    return Math.floor(Math.random() *array.length)
}

function getAnimal(bodyPart, animalLetter, animalSelector){
fetch(BASEURL + "/animals")
.then(resp => resp.json())
.then(animals => {
        let animal = ''
        if (bodyPart === 'head'){
        let list = animals.filter(animal => animal.name[0]=== animalLetter)
        randomOptions(list, animalSelector)
        }
        else if (bodyPart === 'torso'){
            let list = animals.filter(animal => animal.name[0]=== animalLetter)
            randomOptions(list, animalSelector)
        }
        else if (bodyPart === 'legs'){
            let list = animals.filter(animal => animal.name[0]=== animalLetter)
            list = list.filter(animal => animal.legs === true)
            randomOptions(list, animalSelector)
        }
        else if (bodyPart === 'wings'){
            let list = animals.filter(animal => animal.name[0]=== animalLetter)
            list = list.filter(animal => animal.wings === true)
            randomOptions(list, animalSelector)
        }
        else if (bodyPart === 'tail'){
            let list = animals.filter(animal => animal.name[0]=== animalLetter)
            list = list.filter(animal => animal.tail === true)
            randomOptions(list, animalSelector)
        }

})
}

function randomOptions(list, animalSelector){
let num = randomNumFromArray(list)
let animal = list[num]
let option = document.createElement("option")
option.innerText = animal.name
option.id= `${list}-${animal.id}`
option.value = animal.name;
option.className = "Add-Animal";
while (animalSelector.firstChild) {
    animalSelector.removeChild(animalSelector.firstChild);
}
return animalSelector.appendChild(option)
}
// ------------------------------------
// Class definitions

function setNewChimera(chimera){
    let newChimera = new Chimera(chimera.name, chimera.head, chimera.torso, chimera.tail, chimera.wings, chimera.legs);
    return newChimera
}

class Chimera{
constructor(name, head, torso, tail, wings, legs){
    this.name = name;
    this.head = head;
    this.torso = torso;
    this.tail = tail;
    this.wings = wings;
    this.legs = legs;
}

}