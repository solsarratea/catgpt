import * as THREE from 'three';
import vertexShader from './shaders/custom.vert';
import fragmentShader from './shaders/render.frag';

function App (renderProps) {

    const screenDimensions ={
        width: renderProps.canvas.width,
        height: renderProps.canvas.height
    };

    const scene = buildScene();
    const renderer = buildRender(screenDimensions);
    const camera = buildCamera(screenDimensions);
    const sceneObjects = createObjects(scene);
    const state = {
    };

    function buildScene() {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#000000");

        return scene;
    };


    function buildRender({ width, height }) {
        const renderer = new THREE.WebGLRenderer(renderProps);

        const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);
        renderer.setSize(width, height);
        document.body.appendChild(renderer.domElement);

        return renderer;
    };

    function buildCamera({ width, height }) {
      const camera = new THREE.Camera();
      return camera;
    };

    function createObjects(scene) {
        var sceneObjects = [];

        // Create a full-width rectangle with a custom shader
        const geometry = new THREE.PlaneGeometry(2, 2);
        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
        });

        const rectangle = new THREE.Mesh(geometry, material);
        scene.add(rectangle);


        return sceneObjects;
    };

    // Function to update the scene
    this.update = () => {
        // Add your update logic here, if needed
        for (let i = 0; i < sceneObjects.length; i++) {
            // You can perform updates on each scene object if necessary
            // sceneObjects[i].update(state);
        }

        renderer.render(scene, camera);
    };

    this.resize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);

    }


};

export default App;
