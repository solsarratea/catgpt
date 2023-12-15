import './style.css';
import App from './App';
import Webcam from './Webcam';


const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const webcam = new Webcam();

await webcam.init();

const app =   new App({canvas},webcam);

function render() {
    requestAnimationFrame(render);
    app.update();
}

render();

window.addEventListener('resize', ()=>{
    app.resize();

});
