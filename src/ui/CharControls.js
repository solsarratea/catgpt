import interact from 'interactjs';

function CharControls({
    textInput
}) {

    let charControls = {
        char1: "a",
        char2: "e",
        char3: "s",
        char4: ".",
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
            textInput.updateChars(charControls);
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

        const input1 = createInput('char1', charControls.char1, controlDiv);
        const input2 = createInput('char2', charControls.char2, controlDiv);
        const input3 = createInput('char3', charControls.char3, controlDiv);
        const input4 = createInput('char4', charControls.char4, controlDiv);



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



    
}

export default CharControls;
