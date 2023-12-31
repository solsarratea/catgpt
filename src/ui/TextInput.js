import interact from 'interactjs';
import Cat from '../Cat.js';


function TextInput({
    bufferMaterial,
    renderMaterial,
    charControls
}){

    const {editor, textarea} = initElements();

    const miau = new Cat();
    miau.loadCats();

    let offsets= [...bufferMaterial.offsets];

    function initElements() {
        // Create elements
        const editorDiv = document.createElement('div');
        editorDiv.className = 'editor';
        editorDiv.id = 'editor';

        const initialX= window.innerWidth/20;
        const initialY= window.innerHeight/7;

        editorDiv.style.transform = `translate(${initialX}px, ${initialY}px)`;
        editorDiv.setAttribute('data-x', initialX);
        editorDiv.setAttribute('data-y', initialY);

        const textarea = document.createElement('textarea');
        textarea.id = 'textarea';
        textarea.spellcheck = false;
        textarea.placeholder = 'Write text...';
        textarea.autofocus = true;

        // Append elements
        editorDiv.appendChild(textarea);

        // Append the editorDiv to the element with id 'app'
        const appElement = document.getElementById('app');
        appElement.appendChild(editorDiv);


        interact('#editor').draggable({
            onmove: function (event) {
                const target = event.target;
                const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
                target.style.transform = `translate(${x}px, ${y}px)`;
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            }
        }).resizable({
            edges: { left: true, right: true, bottom: true, top: true },
            onmove: function (event) {
                const target = event.target;
                const x = (parseFloat(target.getAttribute('data-x')) || 0);
                const y = (parseFloat(target.getAttribute('data-y')) || 0);

                target.style.width = event.rect.width + 'px';
                target.style.height = event.rect.height + 'px';
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            }
        });

        return {editor: editorDiv , textarea};
    }




    const  updateCharCount = (txt, i, v)=> {
        const chr =  charControls.getMap()[`char${i}`];
        const prev =  bufferMaterial.uniforms.uOffset.value[i];

        if(chr == '') return prev;
        const count = Math.max(0,(txt.split(chr) || []).length-1);

        if(count > 1 && prev > offsets[i]){ offsets[i] = 0;}

        const ret = (count % v) / (v - 1);
        return offsets[i]+ret;
    };


    var lastMiau= '';
    const onUpdate = (text)=>{
        console.log("update: ", text);
        const regex = /\bmeow\b/gi;
        if(text.length < lastMiau.length){  lastMiau = '';}
        var t = (lastMiau.length > 0 ? text.replace(lastMiau, ''): text );

        const matches = t.match(regex);

        if (matches) {
            const tcat = miau.textureRand();
            renderMaterial.uniforms.uChannel0.value = tcat;
            bufferMaterial.uniforms.uCat.value = tcat;
            bufferMaterial.uniforms.uShowcat.value = true;
            renderMaterial.showCat = true;
            lastMiau = text;
        }

        bufferMaterial.uniforms.uShowcat.value = renderMaterial.showCat;

        if(bufferMaterial.updateRule){
            const val = text.split("").reduce((i, s) => s.charCodeAt(0) + i, 0) % 9;
            const index = 2 * val + 1;
            const current  = bufferMaterial.uniforms.uRule.value[index];

            const x = Math.floor(index / 9);
            const y = index % 9;

            let checkbox = document.getElementById(`checkbox_${x}_${y}`);
            checkbox.checked = !current;

            bufferMaterial.uniforms.uRule.value[index] = Number(!current);
        }

        for(let i=0; i < 8; i ++){
            const value = updateCharCount(
                text,
                i,
                100
            );

            bufferMaterial.uniforms.uOffset.value[i] = value;

            renderMaterial.uniforms.uOffset.value[i] = value;

        }



    };

    textarea.addEventListener('input', function () {
        onUpdate(textarea.value);
    });


}

export default TextInput;
