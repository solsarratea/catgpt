import './style.css';
import App from './App';


const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const app =   new App({canvas});

function render() {
    requestAnimationFrame(render);
    app.update();
}

render();

window.addEventListener('resize', ()=>{
    app.resize();

});
