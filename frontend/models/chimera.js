
class Chimera{
    static all = []

constructor(id, name, head, torso, tail, wings, legs, habitat){
    this.id = id
    this.name = name;
    this.head = head;
    this.torso = torso;
    this.tail = tail;
    this.wings = wings;
    this.legs = legs;
    this.habitat = habitat;
};

static createChimeras(chimerasData){
    chimerasData.forEach(chimera => Chimera.create(chimera.id, chimera.name, chimera.head, chimera.torso, chimera.tail, chimera.wings, chimera.legs, chimera.habitat))
}

static create(id, name, head, torso, tail, wings, legs, habitat){
 let chimera =  new Chimera(id, name, head, torso, tail, wings, legs, habitat)
 Chimera.all.push(chimera)
 return chimera
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
    editButton.addEventListener("click", (event) => this.editEntry(event))

    let deleteButton = document.createElement('button')
    deleteButton.innerText = "Delete"
    deleteButton.id = `delete-${this.id}`
    deleteButton.addEventListener("click", (event) => this.deleteEntry(event))
   
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

static populateChimeraList(){
    fetch(BASEURL+ '/chimeras')
    .then(resp => resp.json())
    .then(chimerasList => {
        Chimera.createChimeras(chimerasList)
        Chimera.renderChimera()
    })

}

editEntry(event){
    let parent = event.target.parentNode
    let parentId = parent.id.split("-")[1]
    let array =parent.innerText.split("\n").filter(element => element !== "")
    array.pop()
    let form = submitForm()
    let trait

        let nameBox= name()
        nameBox.value = this.name

        let headBox= head()
        trait = addOption(this.head)
        clearAndAdd(headBox, trait)

        let torsoBox= torso()
        trait = addOption(this.torso)
        clearAndAdd(torsoBox, trait)

        let tailBox= tail()
        trait = addOption(this.tail)
        clearAndAdd(tailBox, trait)

        let wingsBox= wings()
        trait = addOption(this.wings)
        clearAndAdd(wingsBox, trait)

        let legsBox= legs()
        trait = addOption(this.legs)
        clearAndAdd(legsBox, trait)

        trait = addOption(this.habitat.name)
        clearAndAdd(habitatSelect(), trait)

    window.location = 'index.html#formJump';
    form.id = parentId
    submit().value = "Edit"
    editing = true
}

updateChimera(chimeraUpdateData){
    this.id = chimeraUpdateData.id
    this.name = chimeraUpdateData.name;
    this.head = chimeraUpdateData.head;
    this.torso = chimeraUpdateData.torso;
    this.tail = chimeraUpdateData.tail;
    this.wings = chimeraUpdateData.wings;
    this.legs = chimeraUpdateData.legs;
    this.habitat = chimeraUpdateData.habitat;
    return this
}

editChimeraCard(card){
    let name =card.querySelector(".name")
    name.innerText= `Name: ${this.name}`
    let head =card.querySelector(".head")
    head.innerText= `Head: ${this.head}`
    let torso =card.querySelector(".torso")
    torso.innerText= `Torso: ${this.torso}`
    let wings =card.querySelector(".wings")
    wings.innerText= `Wings: ${this.wings}`
    let tail =card.querySelector(".tail")
    tail.innerText= `Tail: ${this.tail}`
    let legs =card.querySelector(".legs")
    legs.innerText= `Legs: ${this.legs}`
    return card
    }

static postingChimera(){
    let button =submit()
    button.addEventListener("click", (event) => {
        console.log("clicked")
        
        event.preventDefault();
        const strongParams = {
            chimera: {
              name: name().value,
              head: head().value,
              torso: torso().value,
              wings: wings().value,
              legs: legs().value,
              tail: tail().value,
              habitat: habitatSelect().value
            }
        }
        if (!editing){
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
        let newChimera = Chimera.create(chimera.id, chimera.name, chimera.head, chimera.torso, chimera.tail, chimera.wings, chimera.legs, chimera.habitat)
        console.log(newChimera)
        newChimera.display()
        resetLetterFilters()
        resetAnimalSelect()
        populateHabitatOptions(habitatSelect())
        name().value = ""
            }
        )
        }
        else {
           let chimeraId =  event.target.parentNode.parentElement.id
           fetch(BASEURL + '/chimeras' +`/${chimeraId}`, {
               method: "PATCH",
               headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify(strongParams)
                })
              .then(resp => resp.json())
              .then(chimera => {
                let updatedChimera = Chimera.all.find(c => c.id === chimera.id)
                updatedChimera = updatedChimera.updateChimera(chimera)
                editing = false
                resetLetterFilters()
                resetAnimalSelect()
                name().value = ""
                button.value = "Submit"
                Chimera.renderChimera()
              }
           )
        }
    }
    
    )
          
}

deleteEntry(){
    let chimeraId = event.target.id.split("-")[1]
    fetch(BASEURL+ '/chimeras' + `/${chimeraId}`, {
        method: "DELETE",
    })
        let index
        index =Chimera.all.findIndex(c => c.id === parseInt(chimeraId,10))
        Chimera.all.splice(index, 1)
        let div = event.target.parentNode
        div.parentNode.removeChild(div)
    }

}
