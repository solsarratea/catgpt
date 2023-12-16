import vertexShader from './shaders/custom.vert';
import renderFragmentShader from './shaders/render.frag';
import  {Mesh, PlaneGeometry, Scene, ShaderMaterial,Vector2,AdditiveBlending } from 'three';

function FullScreenQuad(scene){
    const material = createMaterial();
    const object = createObject(scene);

    function createMaterial(){
        const material = new ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: renderFragmentShader,
            uniforms: {
                uResolution: { value: new Vector2(window.innerWidth, window.innerHeight) },
                uChannel0: { type: "t"},
                uTime: { type:"f", value:0},
                uOffset4: {type: "f", value:0}
            },
            depthTest: false,
            blending: AdditiveBlending
        });

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
        material.uniforms.uChannel0.value = ping.texture;
        material.uniforms.uTime.value +=.5;
    }

    this.resize = ()=>{
        material.uniforms.uResolution.value.x = window.innerWidth;
        material.uniforms.uResolution.value.y = window.innerHeight;
    }


}

export default FullScreenQuad;
