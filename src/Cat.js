import {Texture, TextureLoader }  from 'three';

class Cat {
    constructor() {
        this.texture = new Texture(); // Initialize with an empty texture
        this.cats = [];
        this.textureLoader = new TextureLoader();
        this.textureLoader.crossOrigin = 'anonymous';
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

        const headers = new Headers({
            "Content-Type": "application/json",
            "x-api-key":'live_60gLecnRnRq1Z507j055wIup8lKcj1gTrixg8tCbS1JoqnXmo315o4sPeJNn3Kkw'
        });

        var requestOptions = {
            method: 'GET',
            headers: headers,
        };

        const headers2 = new Headers({
            "x-api-key":'live_60gLecnRnRq1Z507j055wIup8lKcj1gTrixg8tCbS1JoqnXmo315o4sPeJNn3Kkw'
        });

       fetch("https://api.thecatapi.com/v1/images/search?mime_types=jpg&limit=20", requestOptions)
      //  fetch("/.netlify/functions/proxy-image?url=" + encodeURIComponent("https://api.thecatapi.com/v1/images/search?mime_types=jpg&limit=20"), requestOptions)

            .then(response => response.json())
            .then(async result => {
                // Define a function to fetch and process each image
                const fetchAndProcessImage = async (cat, index) => {
                    
                     const imageUrl = `.netlify/functions/image-proxy?url=${encodeURIComponent(cat.url)}`;
                    const imageResponse = await fetch(imageUrl, { headers: headers2 });

                    if (!imageResponse.ok) {
                        console.error(`Error fetching image at index ${index}`);
                        return;
                    }

                    console.log("response:",imageResponse)
                    const imageBlob = await imageResponse.blob();


                    const reader = new FileReader();
                    reader.onloadend = () => {
                        cat.base64 = reader.result; // Save base64 data in the result array
                        if (index === result.length - 1) {
                            // All images fetched and saved, you can proceed with your logic here
                            this.cats = result;
                            console.log("this cats:", this.cats);
                        }
                    };
                    reader.readAsDataURL(new Blob([imageBlob], { type: 'image/jpeg' }));
                }

                // Use Promise.all to parallelize fetching and processing of images
                await Promise.all(result.map((cat, index) => fetchAndProcessImage(cat, index)));
            })
            .catch(error => console.log('error', error));
        }

    async loadCats() {
        await this.loadCats1();
        await this.loadCats2();
    }


    textureRand() {
        const index = Math.floor(Math.random() * this.cats.length);
        const base64Data = this.cats[index].base64;

        console.log(base64Data);
        this.texture = this.textureLoader.load(base64Data);

        return this.texture;
    }

}

export default Cat;
