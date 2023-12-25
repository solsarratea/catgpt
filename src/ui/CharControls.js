import interact from 'interactjs';

function CharControls() {

    let charControls = {
        char0: "a",
        char1: "e",
        char2: "1",
        char3: "2",
        char4: "3",
        char5: "4",
        char6: "5",
        char7: "6",
        char8: "7",
    }


    const controls = initElements();

    function createInput(id, value, parent){
        const input = document.createElement('input');
        input.id = id;
        input.spellcheck = false;
        input.value = value;
        input.autofocus = true;

        input.addEventListener('input', function(event) {

            const newValue = event.target.value;
            console.log(`Input value changed to: ${newValue} for ${id}`);

            charControls[id] = newValue;
        });

        parent.appendChild(input);

    }

    function initElements() {
        const controlDiv = document.createElement('div');
        controlDiv.className = 'editor';
        controlDiv.id = 'controls';

        const title = document.createElement('p');
        title.innerText = "char controls";
        controlDiv.appendChild(title);


        const initialX= window.innerWidth -300;
        const initialY= 30;

        controlDiv.style.transform = `translate(${initialX}px, ${initialY}px)`;
        controlDiv.setAttribute('data-x', initialX);
        controlDiv.setAttribute('data-y', initialY);

        const input0 = createInput('char0', charControls.char0, controlDiv);
        const input1 = createInput('char1', charControls.char1, controlDiv);
        const input2 = createInput('char2', charControls.char2, controlDiv);
        const input3 = createInput('char3', charControls.char3, controlDiv);

        const input4 = createInput('char4', charControls.char4, controlDiv);
        const input5 = createInput('char5', charControls.char5, controlDiv);
        const input6 = createInput('char6', charControls.char6, controlDiv);
        const input7 = createInput('char7', charControls.char7, controlDiv);


        const appElement = document.getElementById('app');
        appElement.appendChild(controlDiv);


        interact('#controls').draggable({
            onmove: function (event) {
                const target = event.target;
                const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                target.style.transform = `translate(${x}px, ${y}px)`;
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            }
        })

        return controlDiv;
    }

    this.getMap = ()=>{
        return charControls;
    }


    
}

export default CharControls;
