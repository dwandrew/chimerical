const BASEURL= "http://localhost:3000";
const ALPHABETARRAY = [" ","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]

document.addEventListener("DOMContentLoaded", (event) => {
    populateLetterFilters(letterFilters(), ALPHABETARRAY);
    Animal.populateAnimals()
    Habitat.populateHabitats()
    Size.populateSizes()
    Chimera.postingChimera()
    Chimera.populateChimeraList()
    randomButtoniser()
    randomHabitat()
    randomSize()
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
let sizeSelect = () => document.getElementById("chimera-size")
let submitForm = () => document.getElementsByClassName("create-chimera")[0]


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
                list.add(option)
                }
            }
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
                list.add(option)
                }
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
                list.add(option)
            }
        }
    });
    if (filterLetter === " "){
        addNoneOption(list)
      }
    }

function populateLetterFilters(list, letters){
    for (let i=0; i<list.length; i++){  
        letters.forEach(element =>{
        let option = document.createElement("option")
        option.innerText = element
        option.value = element
        list[i].add(option)
        })
        list[i].addEventListener('change', (event) =>{ 
            let letter = event.target.value
            let field =  event.target.parentNode.children[3]
            field.innerHTML = ""
            let repopFilter = field.id.split("-")[1]
            if (repopFilter === "head"){
                Animal.populateSelectOptions(head())
            }
            else if (repopFilter === "torso"){
                Animal.populateSelectOptions(torso())
            }
            else if (repopFilter === "wings"){
                Animal.populateSelectOptions(wings())
            }
            else if (repopFilter === "legs"){
                Animal.populateSelectOptions(legs())
            }
            else if (repopFilter === "tail"){
                Animal.populateSelectOptions(tail())
            }
         }
        )
    }
        
}

function addNoneOption(list){
    let noneOption = document.createElement("option")
    noneOption.innerText = "None"
    noneOption.value = "none"
    list.add(noneOption)
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
        while (animalSelect[i].firstChild) {
            animalSelect[i].removeChild(animalSelect[i].firstChild);
        }
        addNoneOption(animalSelect[i])
    }
}

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
        let num = randomNumFromArray(Habitat.all)
        let randomHabitat = Habitat.all[num]
        habitatSelect().innerHTML = ""
        randomHabitat.populateRandomHabitat()
    })
}

function randomSize(){
    let randomButton = document.getElementById("random-size")
    randomButton.addEventListener("click", (event) => {
        event.preventDefault()
        let num = randomNumFromArray(Size.all)
        let randomSize = Size.all[num]
        sizeSelect().innerHTML = ""
        randomSize.populateRandomSize()
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