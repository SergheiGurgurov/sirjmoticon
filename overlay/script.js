function reviver(key, value) {
    if (typeof value === 'object' && value !== null) {
        if (value.dataType === 'Map') {
            return new Map(value.value);
        }
    }
    return value;
}

function decode(data) {
    return JSON.parse(data, reviver);
}

/**
 * @param {{list:Map<string,
 * {
 * contestant:string,
 * score:number,
 * imageUrl:string,
 * }>}} data 
 */
function renderEmojiCounters(data) {
    console.log('Rendering data: ', data);
    const container = document.querySelector('#container');
    const newContainer = document.createElement('div');
    newContainer.style.display = "flex";
    newContainer.style.flexDirection = "column";
    newContainer.style.gap = "20px";
    newContainer.id = 'container';
    newContainer.style.width = "min-content"
    newContainer.style.float = "right"
    for (const [key, value] of data.list) {
        const card = document.createElement('div');
        card.style.backgroundColor = "rgba(255,255,255,0.7)"
        card.style.paddingRight = "20px";
        card.style.paddingLeft = "35px";
        card.style.paddingBlock = "15px";
        card.style.borderRadius = "100px";
        card.style.borderTopRightRadius = "0px";
        card.style.borderBottomRightRadius = "0px";
        card.style.display = 'flex';
        card.style.gap = '20px';
        card.style.justifyContent="end"
        const score = document.createElement('span');
        score.style.fontSize = '100px';
        score.style.fontFamily = 'monospace';
        score.style.fontWeight = 'bold';
        score.style.color = 'black';
        //drop shadow
        //score.style.textShadow = '2px 2px 2px #000, -2px -2px 2px #000, 2px -2px 2px #000, -2px 2px 2px #000';\
        score.style.whiteSpace = "nowrap"
        score.textContent = value.score;
        const img = document.createElement('img');
        img.src = value.imageUrl;
        img.alt = value.contestant;
        card.appendChild(score);
        card.appendChild(img);
        newContainer.appendChild(card);
    }

    container.replaceWith(newContainer);
}

var socketProtocol = window.location.protocol == "https:" ? "wss:" : "ws:";
var socket = new WebSocket(`${socketProtocol}//${window.location.host}/overnightlive`);

/**@type {HTMLCanvasElement} */
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

function loadCanvas(imageDataUrl) {
    
    var img = new Image();
    img.onload = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0);
    }

    img.src = imageDataUrl
}

socket.addEventListener('message', function (event) {
    /** @type {{type:string,data:any}} */
    const message = decode(event.data)
    if(message.type == "scoreboard-update"){
        renderEmojiCounters(message.data);
    } else if(message.type == "canvas-update"){
        loadCanvas(message.data)
    } else {
        console.log("Received Socket Message:", message)
    }
});
socket.addEventListener('open', function (event) {
    console.log('Connected to server');
});
socket.addEventListener('close', function (event) {
    console.log('Server connection closed: ', event.reason);
});
socket.addEventListener('error', function (event) {
    console.log('WebSocket error: ', event);
});

