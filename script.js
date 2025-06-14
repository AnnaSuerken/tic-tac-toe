let fields = [null, null, null, null, null, null, null, null, null];
let currentShape = 'circle'; // abwechselnd zwischen 'circle' und 'cross'

function init() {
    render();
}

function render() {
    let html = "<table>";

    for (let i = 0; i < 3; i++) {
        html += "<tr>";
        for (let j = 0; j < 3; j++) {
            let index = i * 3 + j;
            let symbol = "";

            if (fields[index] === "circle") {
                symbol = createAnimatedCircleSVG();
            } else if (fields[index] === "cross") {
                symbol = createAnimatedCrossSVG();
            }

            html += `<td id="cell-${index}" onclick="handleClick(${index})">${symbol}</td>`;
        }
        html += "</tr>";
    }

    html += "</table>";
    document.getElementById("content").innerHTML = html;
}

function handleClick(index) {
    if (fields[index] !== null) return; // Feld bereits belegt

    fields[index] = currentShape;

    const cell = document.getElementById(`cell-${index}`);
    if (currentShape === 'circle') {
        cell.innerHTML = createAnimatedCircleSVG();
    } else {
        cell.innerHTML = createAnimatedCrossSVG();
    }

    cell.onclick = null; // Klick deaktivieren
    currentShape = currentShape === 'circle' ? 'cross' : 'circle'; // ternary operator > short form of if/else > condition ? if_true : if_false
}

function createAnimatedCircleSVG() {
    return `
        <svg width="70" height="70" viewBox="0 0 70 70">
            <circle
                cx="35"
                cy="35"
                r="30"
                stroke="#3C98BA"
                stroke-width="5"
                fill="none"
                stroke-dasharray="188.4"
                stroke-dashoffset="188.4">
                <animate
                    attributeName="stroke-dashoffset"
                    from="188.4"
                    to="0"
                    dur="125ms"
                    fill="freeze" />
            </circle>
        </svg>
    `;
}

function createAnimatedCrossSVG() {
    return `
        <svg width="70" height="70" viewBox="0 0 70 70">
            <line x1="15" y1="15" x2="55" y2="55"
                stroke="#EEB402"
                stroke-width="5"
                stroke-linecap="round"
                stroke-dasharray="56.57"
                stroke-dashoffset="56.57">
                <animate attributeName="stroke-dashoffset"
                         from="56.57" to="0"
                         dur="125ms"
                         fill="freeze" />
            </line>
            <line x1="55" y1="15" x2="15" y2="55"
                stroke="#EEB402"
                stroke-width="5"
                stroke-linecap="round"
                stroke-dasharray="56.57"
                stroke-dashoffset="56.57">
                <animate attributeName="stroke-dashoffset"
                         from="56.57" to="0"
                         dur="125ms"
                         begin="125ms"
                         fill="freeze" />
            </line>
        </svg>
    `;
}
