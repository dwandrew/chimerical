class Animal{

    static all = []

    constructor(id, name, wings, legs, tail){
        this.id = id;
        this.name = name;
        this.wings = wings;
        this.legs = legs;
        this.tail = tail
    }

    static createAnimals(animalsData){
        animalsData.forEach(animal => Animal.create(animal.id, animal.name, animal.wings, animal.legs, animal.tail))
    }
    
    static create(id, name, wings, legs, tail){
        let animal =  new Animal(id, name, wings, legs, tail)
        Animal.all.push(animal)
        return animal
    }

    static populateAnimals(){
        fetch(BASEURL + '/animals') 
        .then(resp => resp.json())
        .then(animals => {
            Animal.createAnimals(animals)
        })
    }

    static populateSelectOptions(list){
        let animals = Animal.all
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
    }

    


}
