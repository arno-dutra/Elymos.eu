// JavaScript Document

const hexToRgb = hex =>
  hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
             ,(m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16))


function onLoad() {
	
	var canvas = document.getElementById("background");
	var ctx = canvas.getContext("2d");

	var body = document.body,
    html = document.documentElement;

	var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
	var width = Math.max( body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth );
	
	canvas.height = height;
	canvas.width = width;
	
	window.tile_size = 256;
	
	window.buffer = {};
	window.buffer.margin = 256;
	
	window.buffer.x1 = window.screenX;
	window.buffer.y1 = window.screenY;
	window.buffer.x2 = window.buffer.x1 + window.screen.height;
	window.buffer.y2 = window.buffer.y1 + window.screen.width;
	
	var n_tiles_x = Math.ceil((width + window.buffer.margin) / window.tile_size) + 3;
	var n_tiles_y = Math.ceil((height + window.buffer.margin) / window.tile_size) + 3;
	
	var color = "#141111";
	var c = hexToRgb(color);

	console.log(n_tiles_x, n_tiles_y)
	
	// manipulate tiles
	for(var y = 0; y < n_tiles_y; y++) {
		for(var x = 0; x < n_tiles_x; x++) {
			var pos = (y * n_tiles_y + x); // position in buffer based on x and y
			var tile = createTile(c);
			tile.id = pos.toString();
			var left = window.buffer.x1 + (x - 1) * window.tile_size;
			tile.style.left = left.toString().concat("px");
			var top = window.buffer.y1 + (y - 1) * window.tile_size;
			tile.style.top = top.toString().concat("px");
			body.appendChild(tile);
			
		}
	}
	
	window.addEventListener("resize", onResize)
	window.addEventListener("scroll", onScroll)
}
onLoad()



function onResize() {
	// Potentiellement des parametres a transmettre
	updateBackground()
}
function onScroll() {
	// Potentiellement des parametres a transmettre
	updateBackground()
}

function updateBackground() {
	// Il faut ajouter au buffer et retirer du buffer les nouvelles couleurs
	// Ajouter les couleurs qui doivent etre generees en gardant toujours une marge "margin"
	// Retirer les couleurs qui sont maintenant au delà de la marge "margin" pour ne pas surcharger la mémoire
	
	var x1 = window.screenX;
	var y1 = window.screenY;
	var x2 = x1 + window.screen.height;
	var y2 = y1 + window.screen.width;
	
	if (x1 < window.buffer.x1 - window.buffer.margin) {
		
	}
	
	
	
}


function createTile(c) {
	var tile_size = window.tile_size;
	
	var tile = document.createElement('canvas')
	
	tile.width = tile_size;
	tile.height = tile_size;
	tile.style.zIndex = -1;
	tile.style.position = "absolute";
	tile.style.border = "0px";
	tile.classList.add("background_tile");
	
	var ctx = tile.getContext("2d");

	var imgData = ctx.getImageData(0, 0, tile.width, tile.height);
	tile.data = imgData.data;
	console.log(c)
	for(var y = 0; y < tile_size; y++) {
		for(var x = 0; x < tile_size; x++) {
			var pos = (y * tile_size + x) * 4; // position in buffer based on x and y
			var r = (Math.random() - 0.5) * 10;
			tile.data[pos  ] = Math.min(Math.max(c[0] + r, 0), 255);           // some R value [0, 255]
			tile.data[pos+1] = Math.min(Math.max(c[1] + r, 0), 255);           // some G value
			tile.data[pos+2] = Math.min(Math.max(c[2] + r, 0), 255);           // some B value
			tile.data[pos+3] = 255;           // set alpha channel
		}
	}

	// put the modified pixels back on the canvas
	ctx.putImageData(imgData, 0, 0);

	// create a new img object
	var image = new Image();

	// set the img.src to the canvas data url
	image.src = tile.toDataURL();
	
	return tile  // No id has been set yet
}