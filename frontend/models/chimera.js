

class Chimera{
    static all = []

constructor(name, head, torso, tail, wings, legs, habitat){
    this.name = name;
    this.head = head;
    this.torso = torso;
    this.tail = tail;
    this.wings = wings;
    this.legs = legs;
    this.habitat = habitat;
};

static createChimeras(chimerasData){
    chimerasData.forEach(chimera => Chimera.create(chimera.name, chimera.head, chimera.torso, chimera.tail, chimera.wings, chimera.legs, chimera.habitat))
}

static create(name, head, torso, tail, wings, legs, habitat){
 let chimera =  new Chimera(name, head, torso, tail, wings, legs, habitat)
 Chimera.all.push(chimera)
}

static renderChimera(){
    chimeraDiv().innerHTML=""
    Chimera.all.forEach(chimera => chimera.display())
}

display(){
    let card = this.makeChimeraCard()
    chimeraDiv().appendChild(card)
}

makeChimeraCard(){
    let chimeraCard = document.createElement("div")
    chimeraCard.className = "chimera-card"
    chimeraCard.id = `chimera-${this.id}`
    let name = document.createElement('h2')
    name.className = "name"
    name.innerText = `Name: ${this.name}`
    let head = document.createElement('p')
    head.className = "head"
    head.innerText = `Head: ${this.head}`
    let torso = document.createElement('p')
    torso.className = "torso"
    torso.innerText = `Torso: ${this.torso}`

    let legs = document.createElement('p')
    legs.className = "legs"
    legs.innerText = `Legs: ${this.legs}`
    if (this.wings === ""){this.wings = "none"}
    let wings = document.createElement('p')
    wings.className = "wings"
    wings.innerText = `Wings: ${this.wings}`
    
    let tail = document.createElement('p')
    tail.className = "tail"
    tail.innerText = `Tail: ${this.tail}`

    let habitatDiv = document.createElement('div')
    habitatDiv.className = `chimera-habitat-${this.habitat.name}`
    let hName = document.createElement('p')
    hName.innerText = `Habitat: ${this.habitat.name}`
    let hTemp = document.createElement('p')
    hTemp.innerText = `Possible temperatures: ${this.habitat.temperature}`
    let hTraits = document.createElement('p')
    hTraits.innerText = `Suggested traits: ${this.habitat.traits}`
    habitatDiv.appendChild(hName)
    habitatDiv.appendChild(hTemp)
    habitatDiv.appendChild(hTraits)


    let editButton = document.createElement('button')
    editButton.innerText = "Edit"
    editButton.id = `edit-${this.id}`
    editButton.addEventListener("click", (event) => editEntry(event))

    let deleteButton = document.createElement('button')
    deleteButton.innerText = "Delete"
    deleteButton.id = `delete-${this.id}`
    deleteButton.addEventListener("click", (event) => deleteEntry(event))
   
    chimeraCard.appendChild(name)
    chimeraCard.appendChild(head)
    chimeraCard.appendChild(torso)
    chimeraCard.appendChild(legs)
    chimeraCard.appendChild(wings)
    chimeraCard.appendChild(tail)
    chimeraCard.appendChild(habitatDiv)
    chimeraCard.appendChild(editButton)
    chimeraCard.appendChild(deleteButton)
    return chimeraCard
}

//Needs to get working for class
// postingChimera(){
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
//          
//         let newChimera = Chimera.create(chimera.name, chimera.head, chimera.torso, chimera.tail, chimera.wings, chimera.legs, chimera.habitat)
//         let card = makeChimeraCard(chimera)
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


}
