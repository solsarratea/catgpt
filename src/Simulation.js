import vertexShader from './shaders/custom.vert';
import simFragmentShader from './shaders/compute.frag';

import  {Mesh, PlaneGeometry, Scene, ShaderMaterial,Vector2 } from 'three';

function Simulation({webcamTexture, pong}){
    let rule = [0, 0, 1, 1, 0, 0, 0, 0, 0,
                0, 0, 1, 0, 0, 0, 0, 0, 0];

    const scene = new Scene();
    const material = createMaterial();
    const object = createObject();


    function createMaterial(){
        return new ShaderMaterial({
		    uniforms: {
			    uWebcamTexture: { type: "t", value: webcamTexture },
			    uBackbuffer: { type: "t", value: pong },
			    uTime: { type: "f", value: 0 },
                uFrame: { type: "f", value: 0 },
			    uResolution: {
				    type: "v2",
				    value: new Vector2(window.innerWidth, window.innerHeight)
			    },

                uRule: { type: "iv",
                         value: rule },
                uOffset1: {value:0.15},
                uOffset2: {value: 0.05},
                uOffset3: {value: 0},
                uOffset4: {value: 0},


		    },
		    vertexShader: vertexShader,
		    fragmentShader: simFragmentShader
	    });
    }

    function createObject(){
        const geom =  new Mesh(new PlaneGeometry(2, 2), material);
        scene.add(geom);
    }

    this.scene = () => {
        return scene;
    }

    this.material = () => {
        return material;
    }


    this.update = ({pong})=>{
        material.uniforms.uFrame.value +=1;
        material.uniforms.uBackbuffer.value = pong.texture;
    }

    this.resize = ()=>{
        material.uniforms.uResolution.value.x =window.innerWidth;
        material.uniforms.uResolution.value.y =window.innerHeight;

    }


}

export default Simulation;
