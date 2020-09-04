const BASEURL= "http://localhost:3000";
const ALPHABETARRAY = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]

document.addEventListener("DOMContentLoaded", (event) => {
    populateLetterFilters(letterFilters(), ALPHABETARRAY);
}
    )

let head = () => document.querySelector('select#chimera-head');
let torso = () => document.querySelector('select#chimera-torso');
let legs = () => document.querySelector('select#chimera-legs');
let wings = () => document.querySelector('select#chimera-wings');
let tail = () => document.querySelector('select#chimera-tail');
let letterFilters = () => document.getElementsByClassName("letter-filter")

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
});
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
        list.add(option)}}
    });
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

