class Habitat{
    static all = []

    constructor (id, name, temperature, traits){
        this.id = id;
        this.name = name;
        this.temperature = temperature;
        this.traits = traits
    }

    static createHabitats(habitatsData){
        habitatsData.forEach(habitat => Habitat.create(habitat.id, habitat.name, habitat.temperature, habitat.traits))
    }
    
    static create(id, name, temperature, traits){
        let habitat =  new Habitat(id, name, temperature, traits)
        Habitat.all.push(habitat)
        return habitat
    }

    static populateHabitats(){
        fetch(BASEURL + '/habitats') 
        .then(resp => resp.json())
        .then(habitats => {
            Habitat.createHabitats(habitats)
            Habitat.populateHabitatOptions()
            Habitat.populateButtonOptions()
            Habitat.allChimeraButton()
        })
    }

    static populateHabitatOptions(){
        habitatSelect().innerHTML = ""
        Habitat.all.forEach(habitat => {
            let option = document.createElement('option')
            option.innerText = habitat.name
            option.id = `habitatId-${habitat.id}`
            option.value = habitat.name
            habitatSelect().appendChild(option)
        })
        }
        
    populateRandomHabitat(){
        let option = document.createElement('option')
        option.innerText = this.name
        option.id = `habitatId-${this.id}`
        option.value = this.name
        habitatSelect().appendChild(option)
    }

    static populateButtonOptions(){
        Habitat.all.forEach(habitat => {
            let button = document.createElement('button')
            button.innerText = habitat.name
            button.id = `habitatId-${habitat.id}`
            button.value = habitat.name
            button.addEventListener('click', (event) => {
                let chimeraHabitatList = Chimera.all.filter(chimera => chimera.habitat.id === parseInt(event.target.id.split("-")[1]))
                Chimera.renderChimera(chimeraHabitatList)
                window.location = `index.html#chimera-list`;
            })
            document.getElementsByClassName("habitat-button-list")[0].appendChild(button)
        })
    }

    static allChimeraButton(){
        let button = document.getElementById("all-chimera")
        button.addEventListener('click', (event) => {
            let chimeraHabitatList = Chimera.all
            Chimera.renderChimera(chimeraHabitatList)
            window.location = `index.html#chimera-list`;
        })
    }
        
}