import interact from 'interactjs';

function TextInput({
    bufferMaterial,
    renderMaterial,
    charControls
}){
    const {editor, textarea} = initElements();

    function initElements() {
        // Create elements
        const editorDiv = document.createElement('div');
        editorDiv.className = 'editor';
        editorDiv.id = 'editor';

        const textarea = document.createElement('textarea');
        textarea.id = 'textarea';
        textarea.spellcheck = false;
        textarea.placeholder = 'Write text...';
        textarea.autofocus = true;

        // Append elements
        editorDiv.appendChild(textarea);

        // Append the editorDiv to the element with id 'app'
        const appElement = document.getElementById('app');
        appElement.innerHTML = ''; // Clear existing content
        appElement.appendChild(editorDiv);

        return {editor: editorDiv , textarea};
    }

    document.addEventListener('DOMContentLoaded', function () {
        interact('.editor').draggable({
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
    });

        const  updateCharCount = (txt, chr, v)=> {
        const count = (txt.split(chr) || []).length - 1;
        return (count % v) / (v - 1);
    }

    const onUpdate = (text)=>{

        const val = text.split("").reduce((i, s) => s.charCodeAt(0) + i, 0) % 9;
        const index = 2 * val + 1;
        const current  = bufferMaterial.uniforms.uRule.value[index];

        bufferMaterial.uniforms.uRule.value[index] = Number(!current);

        bufferMaterial.uniforms.uOffset1.value = updateCharCount(
            text,
            charControls.char1,
            100
        );

        bufferMaterial.uniforms.uOffset2.value = updateCharCount(
            text,
            charControls.char2,
            100
        );

        bufferMaterial.uniforms.uOffset3.value = updateCharCount(
            text,
            charControls.char3,
            100
        );

        renderMaterial.uniforms.uOffset4.value = updateCharCount(
            text,
            charControls.char4,
            100
        );


    }

    textarea.addEventListener('input', function () {

        onUpdate(textarea.value);
    });



}

export default TextInput;
