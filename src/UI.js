import interact from 'interactjs';

import TextInput from './ui/TextInput';
import CharControls from './ui/CharControls';
import About from './ui/About';
import saveAs from './libs/fileSaver';

function UI(materials){
    const text = new TextInput(materials);
    const controls = new CharControls({
        textInput: text
    });

    const about = new About();
    const screenShot = createScreenshot();
    const rules = createRuleTable();


    function createScreenshot(){
        const div = document.createElement('div');
        div.className = 'editor';
        div.id = 'sshot';
        const initialX= 50;
        const initialY=0;
        div.style.transform = `translate(${initialX}px, ${initialY}px)`;
        div.setAttribute('data-x', initialX);
        div.setAttribute('data-y', initialY);

        const but = document.createElement('button');
        but.innerText = "📸";
        div.appendChild(but);


        but.addEventListener('click', function(event) {

            var aCanvas = document.getElementsByTagName('canvas')[0],
                ctx =  aCanvas.getContext("webgl2", {preserveDrawingBuffer: true});

            aCanvas.toBlob( function(blob)
                            {
                                var d = new Date();
                                var fName = d.getFullYear()+"_"+d.getMonth()+"_"+d.getDate()+"_"+
                                    d.getHours()+"_"+d.getMinutes()+"_"+d.getSeconds();

                                saveAs(blob, "catgtp-" + fName +".png");
                            });

        });

        const appElement = document.getElementById('app');
        appElement.appendChild(div);


        interact('#sshot').draggable({
            onmove: function (event) {
                const target = event.target;
                const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                target.style.transform = `translate(${x}px, ${y}px)`;
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            }
        })

        return but;


    }

    function createRuleTable(){
        const div = document.createElement('div');
        div.className = 'editor';
        div.id = 'rules';

        const titlecont = document.createElement('div');
        titlecont.id = "title";
        div.appendChild(titlecont);

        const title = document.createElement('p');
        titlecont.innerText = "current rule";
        titlecont.appendChild(title);

        const but = document.createElement('button');
        but.innerText = (materials.bufferMaterial.updateRule ? "◼" :"◻");

        but.addEventListener('click', function() {
            const val = materials.bufferMaterial.updateRule;
            materials.bufferMaterial.updateRule=!val;
            but.innerText =  (materials.bufferMaterial.updateRule ? "◼" :"◻");

        });

        titlecont.appendChild(but);

        const initialX= window.innerWidth/1.16;
        const initialY= window.innerHeight/6;

        div.style.transform = `translate(${initialX}px, ${initialY}px)`;
        div.setAttribute('data-x', initialX);
        div.setAttribute('data-y', initialY);

        const numRows = 2;
        const numCols = 9;

        const table = document.createElement('table');

        for (let i = 0; i < numRows; i++) {
            const row = document.createElement('tr');

            for (let j = 0; j < numCols; j++) {
                const cell = document.createElement('td');
                const checkbox = document.createElement('input');

                checkbox.type = 'checkbox';
                checkbox.id = `checkbox_${i}_${j}`;

                checkbox.addEventListener('change', ()=>{
                    const index = i*(8+i)+(j);
                    materials.bufferMaterial.uniforms.uRule.value[index] = Number(checkbox.checked);

                });

                cell.appendChild(checkbox);
                row.appendChild(cell);
            }

            table.appendChild(row);
        }

        div.appendChild(table);
        const appElement = document.getElementById('app');
        appElement.appendChild(div);

        interact('#rules').draggable({
            onmove: function (event) {
                const target = event.target;
                const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                target.style.transform = `translate(${x}px, ${y}px)`;
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            }
        })

        let checkboxId, checkbox;
        checkboxId = 'checkbox_0_2';
        checkbox = document.getElementById(checkboxId);
        checkbox.checked = true;
        checkboxId = 'checkbox_0_3';
        checkbox = document.getElementById(checkboxId);
        checkbox.checked = true;
        checkboxId = 'checkbox_1_2';
        checkbox = document.getElementById(checkboxId);
        checkbox.checked = true;


        return div;
    }


}

export default UI;
