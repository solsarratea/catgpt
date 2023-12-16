import * as THREE from 'three';

import Simulation from './Simulation';
import FullScreenQuad from './FullScreenQuad';
import TextInput from './TextInput';
import CharControls from './CharControls';


function App (renderProps, webcam) {

    const screenDimensions ={
        width: renderProps.canvas.width,
        height: renderProps.canvas.height
    };

    // Initialize webcam
    const webcamTexture = webcam.createTexture();

    // Initialize renderers
    const renderer = buildRender(screenDimensions);
    let  { ping, pong} = buildBufferRenders();

    // Initialize main scene
    const scene = buildScene();
    const camera = buildCamera(screenDimensions);
    const fullScreenQuad =new FullScreenQuad(scene);

    // Initialize buffer scene
    const simulation = new Simulation({ping, pong, webcamTexture});

    const text = new TextInput(
        {
            bufferMaterial: simulation.material(),
            renderMaterial: fullScreenQuad.material()
        });

    const controls = new CharControls({
        textInput: text
    });

    ///--------------------------------------------------------------------

    function buildRender({ width, height }) {
        const renderer = new THREE.WebGLRenderer(renderProps);

        const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);
        renderer.setSize(width, height);
        document.body.appendChild(renderer.domElement);

        return renderer;
    };

    function buildCamera({ width, height }) {
        const camera = new THREE.OrthographicCamera(- 1, 1, 1, - 1, 0, 1);
        return camera;
    };


    function buildBufferRenders() {
	     const renderTargetParams = {
		    minFilter: THREE.NearestFilter,
            magFilter: THREE.NearestFilter,
            format: THREE.RGBAFormat,
            type: THREE.FloatType,
            stencilBuffer: false
	    };

	    let ping = new THREE.WebGLRenderTarget(
		    window.innerWidth,
		    window.innerHeight,
		    renderTargetParams
	    );
	    let pong = new THREE.WebGLRenderTarget(
		    window.innerWidth,
		    window.innerHeight,
		    renderTargetParams
	    );


        return { ping, pong };
    }


    function buildScene() {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#000000");

        return scene;
    };


    this.update = () => {

        if (renderer.info.render.frame % 10 == 0) {
            renderer.setRenderTarget(ping);
            renderer.render(simulation.scene(), camera);

            fullScreenQuad.update({ping});

            const temp = ping
            ping = pong
            pong = temp
            simulation.update({pong});

            renderer.setRenderTarget(null);

        }
        renderer.render(scene, camera);

    };


    this.resize = () => {
        // Update Renderer
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Update Camera
        camera.aspect = window.innerWidth /  window.innerHeight
       // camera.updateProjectionMatrix()

        //Update Objects
        fullScreenQuad.resize();
        simulation.resize();

    }


};

export default App;
