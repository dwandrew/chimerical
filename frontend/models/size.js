class Size{
    static all = []

    constructor (id, name, temperature, traits){
        this.id = id;
        this.name = name;
        this.traits = traits
    }

    static createSizes(sizeData){
        sizeData.forEach(size => Size.create(size.id, size.name, size.traits))
    }
    
    static create(id, name, traits){
        let size =  new Size(id, name, traits)
        Size.all.push(size)
        return size
    }

    static populateSizes(){
        fetch(BASEURL + '/sizes') 
        .then(resp => resp.json())
        .then(sizes => {
            Size.createSizes(sizes)
            Size.populateSizeOptions()
        })
    }

    static populateSizeOptions(){
        sizeSelect().innerHTML = ""
        Size.all.forEach(size => {
            let option = document.createElement('option')
            option.innerText = size.name
            option.id = `sizeId-${size.id}`
            option.value = size.name
            sizeSelect().appendChild(option)
        })
        }
        
    populateRandomSize(){
        let option = document.createElement('option')
        option.innerText = this.name
        option.id = `sizeId-${this.id}`
        option.value = this.name
        sizeSelect().appendChild(option)
    }
        
}