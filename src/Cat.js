import {Texture, TextureLoader }  from 'three';

class Cat {
    constructor() {
        this.texture = new Texture(); // Initialize with an empty texture
        this.cats = [];
        this.textureLoader = new TextureLoader();
    }


    async loadCatsLocal()  {
        for(let i = 1; i<30; i++){
            const url = `/cat/${i}.jpg`;
            this.cats.push({url});
        }
    }


    async loadCats() {
        await this.loadCatsLocal();
    }


    textureRand (){
        const index = Math.floor(Math.random() * this.cats.length);
        const imageUrl = this.cats[index].url;
        this.texture = this.textureLoader.load(imageUrl);

        return this.texture;

    }

}

export default Cat;
