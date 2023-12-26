import interact from 'interactjs';

function About(controls){

    const modal = initModal();
    const button = initButton();


    function initButton() {
        const div = document.createElement('div');
        div.className = 'editor';
        div.id = 'aboutContainer';

        const but = document.createElement('button');
        but.innerText = "?";
        div.appendChild(but);

        but.addEventListener('click', function() {
            document.getElementById('infochar0').innerText = controls.getChar('char0');
            document.getElementById('infochar1').innerText = controls.getChar('char1');
            document.getElementById('examplechar1').innerText = controls.getChar('char1');
            document.getElementById('infochar2').innerText = controls.getChar('char2');
            document.getElementById('infochar3').innerText = controls.getChar('char3');
            document.getElementById('infochar4').innerText = controls.getChar('char4');
            document.getElementById('infochar5').innerText = controls.getChar('char5');
            document.getElementById('infochar6').innerText = controls.getChar('char6');
            document.getElementById('infochar7').innerText = controls.getChar('char7');

            modal.style.display="block";

        });

        const appElement = document.getElementById('app');
        appElement.appendChild(div);


        interact('#aboutContainer').draggable({
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

    function initModal(){
        // Create the outer modal div
        const modalDiv = document.createElement('div');
        modalDiv.id = 'showInfo';
        modalDiv.className = 'modal';

        // Create the modal header
        const modalHeaderDiv = document.createElement('div');
        modalHeaderDiv.className = 'modal-header';

        // Create the heading and close button
        const heading = document.createElement('h2');
        heading.textContent = 'CAT_gpt';

        const closeButton = document.createElement('span');
        closeButton.className = 'close';
        closeButton.textContent = '×';

        closeButton.addEventListener('click', function() {
            modal.style.display="none";

        });

        // Append the heading and close button to the modal header
        modalHeaderDiv.appendChild(heading);
        modalHeaderDiv.appendChild(closeButton);

        // Append the modal header to the outer modal div
        modalDiv.appendChild(modalHeaderDiv);

        // Create the modal content container
        const modalContentDiv = document.createElement('div');
        modalContentDiv.className = 'modal-content';

        // Create the form element with enctype attribute
        const formElement = document.createElement('form');
        formElement.enctype = 'multipart/form-data';

        // Create paragraphs and headings with their respective content
        const paragraphs = [
            "<h3>Cellular Automatas through Grafted Poetic Text</h3>",
            "Tool created for workshop hostead at the 37C3",
            "<h3>WHAT IS IT</h3>",
            "Environment for live coding visuals with ASCII characters.",
            "<h3>HOW DO I USE IT</h3>",
            "Writing in the square black box.",
            "ASCII characters are being interpreted as numbers updating rules of the CA simulation.",
            "There are special characters under the square <b>Char Controls</b> which allow you to modify",
            "<ul>",
            `<li> <span id="infochar0">${controls.getChar(0)}</span>. Camera luminosity threshold </li>`,
            `<li><span id="infochar1">${controls.getChar(1)}</span>. Pixel size.</li>`,
            `<li><span id="infochar2">${controls.getChar(2)}</span>. Saturation.</li>`,
            `<li><span id="infochar3">${controls.getChar(3)}</span>. Hue shift .</li>`,
            `<li><span id="infochar4">${controls.getChar(4)}</span>. Mix with RGBSplit.</li>`,
            `<li><span id="infochar5">${controls.getChar(5)}</span>. Amount of RGB offset.</li>`,
            `<li><span id="infochar6">${controls.getChar(6)}</span>. Mix with spatial displacement.</li>`,
            `<li><span id="infochar7">${controls.getChar(7)}</span>. Add motion to displacement.</li>`,
            "</ul>",
            `For example, if the char <b id=examplechar1>${controls.getChar(2)}</b> controls the pixel size, writing many time the character you will see how the canvas changes.`,
            "<a href=\"https://github.com/solsarratea/catgpt\" >See source code<\a>"
        ];

        // Append the paragraphs to the form element
        paragraphs.forEach(paragraph => {
            const pElement = document.createElement('p');
            pElement.innerHTML = paragraph;
            formElement.appendChild(pElement);
        });

        // Append the form element to the modal content container
        modalContentDiv.appendChild(formElement);

        // Append the modal content container to the outer modal div
        modalDiv.appendChild(modalContentDiv);

        // Append the modal div to the document body or another container
        const appElement = document.getElementById('app');
        appElement.appendChild(modalDiv);
        modalDiv.style.display= "none";

        interact('#showInfo').draggable({
            onmove: function (event) {
                const target = event.target;
                const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                target.style.transform = `translate(${x}px, ${y}px)`;
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            }
        })

        return modalDiv;

    }





}

export default About;
