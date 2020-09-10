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
        })
    }

    static populateHabitatOptions(){
        habitatSelect.innerHTML = ""
        Habitat.all.forEach(habitat => {
        let option = document.createElement('option')
        option.innerText = habitat.name
        option.id = `habitatId-${habitat.id}`
        option.value = habitat.name
        habitatSelect().appendChild(option)
        })
        }
        
}