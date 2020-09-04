const BASEURL= "http://localhost:3000";
const ALPHABETARRAY = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]

document.addEventListener("DOMContentLoaded", populateSelectOptions)

let head = () => document.querySelector('select#chimera-head');
let torso = () => document.querySelector('select#chimera-torso');
let legs = () => document.querySelector('select#chimera-legs');
let wings = () => document.querySelector('select#chimera-wings');
let tail = () => document.querySelector('select#chimera-tail');
let letterFilters = () => document.getElementsByClassName("letter-filter")

function populateSelectOptions(){
fetch(BASEURL + '/animals')
.then(resp => resp.json())
.then(animals => {

addOptionsTo(head(), animals)
addOptionsTo(torso(), animals)
addWingOptionsTo(wings(), animals)
addLegOptionsTo(legs(), animals)
addTailOptionsTo(tail(), animals)
})
}
function addOptionsTo(list, listToAdd){
listToAdd.forEach(element => {
    let option = document.createElement("option")
    option.appendChild( document.createTextNode(element.name))
    option.id= `${list}-${element.id}`
    option.value = element.name;
    option.className = "Add-Animal";
    list.add(option)
});
}

function addWingOptionsTo(list, listToAdd){
listToAdd.forEach(element => {
    if(element.wings=== true){
    let option = document.createElement("option")
    option.appendChild( document.createTextNode(element.name))
    option.id= `${list}-${element.id}`
    option.value = element.name;
    option.className = "Add-Animal";
    list.add(option)}
});
}

function addTailOptionsTo(list, listToAdd){
    listToAdd.forEach(element => {
        if(element.tail=== true){
        let option = document.createElement("option")
        option.appendChild( document.createTextNode(element.name))
        option.id= `${list}-${element.id}`
        option.value = element.name;
        option.className = "Add-Animal";
        list.add(option)}
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
        list.add(option)}
    });
    }

function populateLetterFilters(list, letters){
    for (let i=0; i<list.length; i++)
    {letters.forEach(element =>{
        let option = document.createElement("option")
        option.innerText = element
        option.value = element
        list[i].add(option)
         }
        )}
        
}