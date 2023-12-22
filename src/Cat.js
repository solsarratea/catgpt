import {Texture, TextureLoader }  from 'three';

class Cat {
    constructor() {
        this.texture = new Texture(); // Initialize with an empty texture
        this.cats = [];
        this.textureLoader = new TextureLoader();
    }


    async loadCats1()  {
        for(let i = 1; i<7; i++){
            const url = `http://localhost:5173/cat/${i}.jpg`;
            const response = await fetch(url);
            const catData = await response;
            this.cats.push(catData);
        }
    }

    async loadCats2() {
        const numberOfCats = 50;
        const catApiUrl = `https://api.thecatapi.com/v1/images/search?limit=${numberOfCats}`;

        try {
            const response = await fetch(catApiUrl);
            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }

            const catData = await response.json();
            this.cats = catData;
        } catch (error) {
            console.error('Error loading cats:', error);
        }
    }


    async loadCats() {
        await this.loadCats1();
        await this.loadCats2();
    }


    textureRand (){
        const index = Math.floor(Math.random() * this.cats.length);
        const imageUrl = this.cats[index].url;

        this.texture = this.textureLoader.load(imageUrl);

        return this.texture;

    }

}

export default Cat;
