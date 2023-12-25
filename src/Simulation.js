import vertexShader from './shaders/custom.vert';
import simFragmentShader from './shaders/compute.frag';

import  {Mesh, PlaneGeometry, Scene, ShaderMaterial,Vector2 } from 'three';

function Simulation({webcamTexture, pong}){
    let rule = [0, 0, 1, 1, 0, 0, 0, 0, 0,
                0, 0, 1, 0, 0, 0, 0, 0, 0];

    let offsets = [0.15,0.05 ,0. ,0. ,
                   0.  ,0.   ,0. ,0. ,0.  ];

    const scene = new Scene();
    const material = createMaterial();
    material.updateRule=true;
    const object = createObject();


    function createMaterial(){
        return new ShaderMaterial({
		    uniforms: {
			    uWebcamTexture: { type: "t", value: webcamTexture },
                uCat: { type: "t"},
                uShowcat: {value:false},
			    uBackbuffer: { type: "t", value: pong },
			    uTime: { type: "f", value: 0 },
                uFrame: { type: "f", value: 0 },
			    uResolution: {
				    type: "v2",
				    value: new Vector2(window.innerWidth, window.innerHeight)
			    },
                uRule: { type: "iv",
                         value: rule },
                uOffset : { type: "iv", value: offsets },

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
