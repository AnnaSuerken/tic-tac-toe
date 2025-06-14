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
    
    if (checkWin()) {
    return;
    }

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

function checkWin() {
    const winCombinations = [
        [0, 1, 2], // Zeilen
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6], // Spalten
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8], // Diagonalen
        [2, 4, 6],
    ];

     for (const [a, b, c] of winCombinations) {
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            drawWinningLine(a, c); // Linie vom ersten zum letzten Feld
            for (let i = 0; i < 9; i++) {
            document.getElementById(`cell-${i}`).onclick = null;
}
        }
    }
    return false; // kein Gewinn


}


function drawWinningLine(start, end) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    line.setAttribute("class", "win-line");
    line.setAttribute("viewBox", "0 0 300 300");

    const [x1, y1] = getCoordinates(start);
    const [x2, y2] = getCoordinates(end);

    const svgLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    svgLine.setAttribute("x1", x1);
    svgLine.setAttribute("y1", y1);
    svgLine.setAttribute("x2", x2);
    svgLine.setAttribute("y2", y2);
    svgLine.setAttribute("stroke", "white");
    svgLine.setAttribute("stroke-width", "10");
    svgLine.setAttribute("stroke-linecap", "round");

    line.appendChild(svgLine);
    document.getElementById("content").appendChild(line);
}

function getCoordinates(index) {
    const row = Math.floor(index / 3);
    const col = index % 3;
    return [col * 100 + 50, row * 100 + 50]; // Middle of cell
}

function disableAllClicks() {
    for (let i = 0; i < 9; i++) {
        const cell = document.getElementById(`cell-${i}`);
        if (cell) {
            cell.onclick = null;
        }
    }
}

function resetGame() {
    fields = [null, null, null, null, null, null, null, null, null];
    render();
}