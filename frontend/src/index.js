const BASEURL= "http://localhost:3000";

document.addEventListener("DOMContentLoaded", populateSelectOptions)

let head = () => document.querySelector('select#chimera-head');
let torso = () => document.querySelector('select#chimera-torso');
let legs = () => document.querySelector('select#chimera-legs');
let wings = () => document.querySelector('select#chimera-wings');
let tail = () => document.querySelector('select#chimera-tail');

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