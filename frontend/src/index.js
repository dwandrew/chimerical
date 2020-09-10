const BASEURL= "http://localhost:3000";
const ALPHABETARRAY = [" ","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]

document.addEventListener("DOMContentLoaded", (event) => {
    populateLetterFilters(letterFilters(), ALPHABETARRAY);
    populateHabitatOptions(habitatSelect())
    Chimera.postingChimera()
    Chimera.populateChimeraList()
    randomButtoniser()
    randomHabitat()
}
    )

let editing = false;
let editedChimeraId = null;
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
let habitatSelect = () => document.getElementById("chimera-habitat")
let submitForm = () => document.getElementsByClassName("create-chimera")[0]

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

function populateHabitatOptions(select){

fetch(BASEURL + '/habitats')
.then(resp => resp.json())
.then(habitats => {
habitats.forEach(habitat => {
let option = document.createElement('option')
option.innerText = habitat.name
option.id = `habitatId-${habitat.id}`
option.value = habitat.name
select.appendChild(option)
})
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

// function postingChimera(){
//     let button =submit()
//     button.addEventListener("click", (event) => {
//         event.preventDefault();
//         const strongParams = {
//             chimera: {
//               name: name().value,
//               head: head().value,
//               torso: torso().value,
//               wings: wings().value,
//               legs: legs().value,
//               tail: tail().value,
//               habitat: habitatSelect().value
//             }
//         }
//         if (!editing){
//         fetch(BASEURL+ "/chimeras", {
//             method: "POST",
//             headers: {
//                 "Accept": "application/json",
//                 "Content-Type": "application/json"
//               },
//               body: JSON.stringify(strongParams)

//         })
//         .then(resp => resp.json())
//         .then(chimera => {
//             console.log("response got")
//         let newChimera = setNewChimera(chimera)
//         let card = makeChimeraCard(chimera)
//         console.log(card)
//         chimeraDiv().appendChild(card)
//         resetLetterFilters()
//         resetAnimalSelect()
//         populateHabitatOptions(habitatSelect())
//         name().value = ""
//             }
//         )
//         }
//         else {
//            let chimeraId =  event.target.parentNode.parentElement.id
//            fetch(BASEURL + '/chimeras' +`/${chimeraId}`, {
//                method: "PATCH",
//                headers: {
//                 "Accept": "application/json",
//                 "Content-Type": "application/json"
//               },
//               body: JSON.stringify(strongParams)
//                 })
//               .then(resp => resp.json())
//               .then(chimera => {
//                 let newChimera = setNewChimera(chimera)
//                 let div = document.getElementById(`chimera-${chimera.id}`)
//                 editChimeraCard(chimera, div)
//                 editing = false
//                 resetLetterFilters()
//                 resetAnimalSelect()
//                 name().value = ""
//                 button.value = "Submit"
//               }
//            )
//         }
//     }
    
//     )
    


  
        

        
// }


function resetLetterFilters(){
    let filters = letterFilters()
    for (let i =0; i<filters.length; i++){
        filters[i].value=" "
    }
}

function resetAnimalSelect(){
    let animalSelect= document.getElementsByClassName("animal-select")
    for (let i =0; i<animalSelect.length; i++){
        while (animalSelect[i].firstChild) {
            animalSelect[i].removeChild(animalSelect[i].firstChild);
        }
        addNoneOption(animalSelect[i])
    }
}


// function populateChimeraList(){
//     fetch(BASEURL+ '/chimeras')
//     .then(resp => resp.json())
//     .then(chimerasList => {
//         Chimera.createChimeras(chimerasList)
//         Chimera.renderChimera()
//     })

// }

// function makeChimeraCard(chimera){
//     let chimeraCard = document.createElement("div")
//     chimeraCard.className = "chimera-card"
//     chimeraCard.id = `chimera-${chimera.id}`
//     let name = document.createElement('h2')
//     name.className = "name"
//     name.innerText = `Name: ${chimera.name}`
//     let head = document.createElement('p')
//     head.className = "head"
//     head.innerText = `Head: ${chimera.head}`
//     let torso = document.createElement('p')
//     torso.className = "torso"
//     torso.innerText = `Torso: ${chimera.torso}`

//     let legs = document.createElement('p')
//     legs.className = "legs"
//     legs.innerText = `Legs: ${chimera.legs}`
//     if (chimera.wings === ""){chimera.wings = "none"}
//     let wings = document.createElement('p')
//     wings.className = "wings"
//     wings.innerText = `Wings: ${chimera.wings}`
    
//     let tail = document.createElement('p')
//     tail.className = "tail"
//     tail.innerText = `Tail: ${chimera.tail}`

//     let habitatDiv = document.createElement('div')
//     habitatDiv.className = `chimera-habitat-${chimera.habitat.name}`
//     let hName = document.createElement('p')
//     hName.innerText = `Habitat: ${chimera.habitat.name}`
//     let hTemp = document.createElement('p')
//     hTemp.innerText = `Possible temperatures: ${chimera.habitat.temperature}`
//     let hTraits = document.createElement('p')
//     hTraits.innerText = `Suggested traits: ${chimera.habitat.traits}`
//     habitatDiv.appendChild(hName)
//     habitatDiv.appendChild(hTemp)
//     habitatDiv.appendChild(hTraits)


//     let editButton = document.createElement('button')
//     editButton.innerText = "Edit"
//     editButton.id = `edit-${chimera.id}`
//     editButton.addEventListener("click", (event) => editEntry(event))

//     let deleteButton = document.createElement('button')
//     deleteButton.innerText = "Delete"
//     deleteButton.id = `delete-${chimera.id}`
//     deleteButton.addEventListener("click", (event) => deleteEntry(event))
   
//     chimeraCard.appendChild(name)
//     chimeraCard.appendChild(head)
//     chimeraCard.appendChild(torso)
//     chimeraCard.appendChild(legs)
//     chimeraCard.appendChild(wings)
//     chimeraCard.appendChild(tail)
//     chimeraCard.appendChild(habitatDiv)
//     chimeraCard.appendChild(editButton)
//     chimeraCard.appendChild(deleteButton)
//     return chimeraCard
// }

function deleteEntry(){
let postId = event.target.id
let chimeraId = event.target.id.split("-")[1]
fetch(BASEURL+ '/chimeras' + `/${chimeraId}`, {
    method: "DELETE",
})
    let div = event.target.parentNode
    div.parentNode.removeChild(div)
}

// function editEntry(event){
//     let parent = event.target.parentNode
//     let parentId = parent.id.split("-")[1]
//     let array =parent.innerText.split("\n").filter(element => element !== "")
//     array.pop()
//     let secondArray = array.map(element => element.split(": "))
//     let keys = secondArray.map(element => element[0])
//     let values = secondArray.map(element => element[1])
    
//     let chimera= new Chimera(values[0], values[1], values[2], values[5], values[4], values [3])
//     let postId = event.target.id
//     let id = postId.split("-")
//     let form = submitForm()
//     let trait
//         let nameBox= form.querySelector("#chimera-name")
//         nameBox.value = chimera.name
//         let headBox= form.querySelector("#chimera-head.animal-select")
//         trait = addOption(chimera.head)
//         clearAndAdd(headBox, trait)
//         let torsoBox= form.querySelector("#chimera-torso.animal-select")
//         trait = addOption(chimera.torso)
//         clearAndAdd(torsoBox, trait)
//         let tailBox= form.querySelector("#chimera-tail.animal-select")
//         trait = addOption(chimera.tail)
//         clearAndAdd(tailBox, trait)
//         let wingsBox= form.querySelector("#chimera-wings.animal-select")
//         trait = addOption(chimera.wings)
//         clearAndAdd(wingsBox, trait)
//         let legsBox= form.querySelector("#chimera-legs.animal-select")
//         trait = addOption(chimera.legs)
//         clearAndAdd(legsBox, trait)
//     window.location = 'index.html#formJump';
//     form.id = parentId
//     submit().value = "Edit"
//     editing = true
// }

// function editChimeraCard(chimera, card){
// let name =card.querySelector(".name")
// name.innerText= `Name: ${chimera.name}`
// let head =card.querySelector(".head")
// head.innerText= `Head: ${chimera.head}`
// let torso =card.querySelector(".torso")
// torso.innerText= `Torso: ${chimera.torso}`
// let wings =card.querySelector(".wings")
// wings.innerText= `Wings: ${chimera.wings}`
// let tail =card.querySelector(".tail")
// tail.innerText= `Tail: ${chimera.tail}`
// let legs =card.querySelector(".legs")
// legs.innerText= `Legs: ${chimera.legs}`
// return card
// }

function addOption(trait){
 let option = document.createElement('option')
 option.innerText = trait
 option.value = trait
 return option
}

function clearAndAdd(box, trait){
    while (box.firstChild) {
        box.removeChild(box.firstChild)
    }

    return box.appendChild(trait)
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

function randomHabitat(){
    let randomButton = document.getElementById("random-habitat")
    randomButton.addEventListener("click", (event) => {
        event.preventDefault()
        console.log(event.target.parentNode)
        let habitatList = document.getElementById("chimera-habitat")
        let list = habitatList.children 
        // Not complete, am moving to classes so will work in there.
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

// function setNewChimera(chimera){
//     let newChimera = new Chimera(chimera.name, chimera.head, chimera.torso, chimera.tail, chimera.wings, chimera.legs);
//     return newChimera
// }

// class Chimera{
// constructor(name, head, torso, tail, wings, legs){
//     this.name = name;
//     this.head = head;
//     this.torso = torso;
//     this.tail = tail;
//     this.wings = wings;
//     this.legs = legs;
// }

// }