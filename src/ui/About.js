import interact from 'interactjs';

function About(){

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
            "Tool created for workshop hostead at the CCH23",
            "<h3>WHAT IS IT</h3>",
            "it is",
            "<h3>HOW DO I USE IT</h3>",
            "Writing in a square box.",
            "ASCII characters are being interpreted as numbers updating rules of the simulation.",
            "There are special characters under the square <b>Char Controls</b> which allow you to modify",
            "<ul>",
            "  <li>camera luminosity threshold </li>",
            "  <li>pixel size</li>",
            "  <li>camera influence on simulation</li>",
            "  <li>hue</li>",
            "</ul>",
            "For example, if the letter <b>e</b> controls the pixel size, writing many time the character you will see how the canvas changes."
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
