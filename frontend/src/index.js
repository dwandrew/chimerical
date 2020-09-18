const BASEURL= "http://localhost:3000";

document.addEventListener("DOMContentLoaded", (event) => {
    Animal.populateAnimals()
    Habitat.populateHabitats()
    Size.populateSizes()
    Chimera.postingChimera()
    Chimera.populateChimeraList()
    randomButtoniser()
    randomHabitat()
    randomSize()
    resetAnimalSelect()

    }
)

let editing = false;
let editedChimeraId = null;
let submit = () =>document.querySelector('#chimera-submit')
let name =() => document.querySelector('input#chimera-name')
let head = () => document.querySelector('#chimera-head')
let headList = () => document.querySelector('#chimera-heads')
let torso = () => document.querySelector('#chimera-torso')
let torsoList = () => document.querySelector('#chimera-torsos')
let legs = () => document.querySelector('#chimera-leg')
let legsList = () => document.querySelector('#chimera-legs')
let wings = () => document.querySelector('#chimera-wing')
let wingsList = () => document.querySelector('#chimera-wings')
let tail = () => document.querySelector('#chimera-tail')
let tailList = () => document.querySelector('#chimera-tails')
let letterFilters = () => document.getElementsByClassName("letter-filter")
let chimeraDiv = () => document.getElementById("chimera-list")
let animalSelect = () => document.getElementsByClassName("animal-select")
let randomButton = () => document.getElementsByClassName('randomiser-button')
let habitatSelect = () => document.getElementById("chimera-habitat")
let sizeSelect = () => document.getElementById("chimera-size")
let submitForm = () => document.getElementsByClassName("create-chimera")[0]
let allLists = [headList(), torsoList(), wingsList(), tailList(), legsList()]

function addOptionsTo(list, listToAdd){
    listToAdd.forEach(element => {
            let option = document.createElement("option")
            option.appendChild( document.createTextNode(element.name))
            option.id= `${list}-${element.id}`
            option.value = element.name
            option.className = "Add-Animal"
            list.appendChild(option)
        }
        )

}

function addWingOptionsTo(list, listToAdd){
    listToAdd.forEach(element => {
        if(element.wings=== true){
                let option = document.createElement("option")
                option.appendChild( document.createTextNode(element.name))
                option.id= `${list}-${element.id}`
                option.value = element.name
                option.className = "Add-Animal"
                list.appendChild(option)
                }
            }
    );
}

function addTailOptionsTo(list, listToAdd){
   
    listToAdd.forEach(element => {
        if(element.tail=== true){
                let option = document.createElement("option")
                option.appendChild( document.createTextNode(element.name))
                option.id= `${list}-${element.id}`
                option.value = element.name;
                option.className = "Add-Animal";
                list.appendChild(option) 
            }
        });
    }

function addLegOptionsTo(list, listToAdd){
   
    listToAdd.forEach(element => {
        if(element.legs=== true){
                let option = document.createElement("option")
                option.appendChild( document.createTextNode(element.name))
                option.id= `${list}-${element.id}`
                option.value = element.name;
                option.className = "Add-Animal";
                list.appendChild(option)
        }
    });
    }

function resetAnimalSelect(){
    let animalSelect= document.getElementsByClassName("animal-select")
    for (let i =0; i<animalSelect.length; i++){
        animalSelect[i].value = "None"
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
            let animalSelector = event.target.parentNode.querySelector(".animal-select")
            let bodyPart = animalSelector.id.split("-")[1]
           
            getAnimal(bodyPart, animalSelector)
        })
    }
}

function randomNumFromArray(array){
    return Math.floor(Math.random() *array.length)
}

function getAnimal(bodyPart, animalSelector){
    let animals = Animal.all
        if (bodyPart === 'head'){
            randomOptions(animals, animalSelector)
        }
        else if (bodyPart === 'torso'){
            randomOptions(animals, animalSelector)
        }
        else if (bodyPart === 'leg'){
            animals = animals.filter(animal => animal.legs === true)
            randomOptions(animals, animalSelector)
        }
        else if (bodyPart === 'wing'){
            animals = animals.filter(animal => animal.wings === true)
            randomOptions(animals, animalSelector)
        }
        else if (bodyPart === 'tail'){
            animals = animals.filter(animal => animal.tail === true)
            randomOptions(animals, animalSelector)
        }
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
    let fullListButton = document.getElementById("full-habitat-list")
    fullListButton.addEventListener("click", (event) => {
        event.preventDefault()
        Habitat.populateHabitatOptions()
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
    let fullSizeButton = document.getElementById("full-size-list")
    fullSizeButton.addEventListener("click", (event) => {
        event.preventDefault()
        Size.populateSizeOptions()
    })
}

function randomOptions(list, animalSelector){
    let num = randomNumFromArray(list)
    let animal = list[num]
    animalSelector.value = animal.name
    return animal
}
