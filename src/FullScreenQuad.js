import vertexShader from './shaders/custom.vert';
import renderFragmentShader from './shaders/render.frag';
import  {Mesh, PlaneGeometry, Scene, ShaderMaterial,Vector2,AdditiveBlending } from 'three';

function FullScreenQuad(scene){
    let offsets = [0.15,0.05 ,0. ,0. ,
                   0.  ,0.   ,0. ,0. ,0.  ];

    const material = createMaterial();
    const object = createObject(scene);
    const MAX = 5;
    var showCat = 0;

  function createMaterial(){
        const material = new ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: renderFragmentShader,
            uniforms: {
                uResolution: { value: new Vector2(window.innerWidth, window.innerHeight) },
                uChannel0: { type: "t"},
                uTime: { type:"f", value:0},
                uOffset : { type: "iv", value: offsets },
                uShowcat: {value: false},
                uResolution: {
				    type: "v2",
				    value: new Vector2(window.innerWidth, window.innerHeight)
			    },
            },
            depthTest: false,
            blending: AdditiveBlending
        });
        material.showCat = false;

        return material;
    }

    function createObject(){
        const geom =  new Mesh(new PlaneGeometry(2, 2), material);
        scene.add(geom);
    }

    this.material = () => {
        return material;
    }

    this.update =({ping}) => {
        if (showCat >=MAX){material.showCat = false; showCat = 0;};


        if(!material.showCat && showCat < MAX/2){
            material.uniforms.uChannel0.value = ping.texture;
        }else{
            showCat += 1.;

        }
        material.uniforms.uTime.value +=.5;
    }

    this.resize = ()=>{
        material.uniforms.uResolution.value.x = window.innerWidth;
        material.uniforms.uResolution.value.y = window.innerHeight;
    }


}

export default FullScreenQuad;
