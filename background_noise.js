// Adding and managing the noise in the color background

//const hexToRgb = hex =>
//  hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
//             ,(m, r, g, b) => '#' + r + r + g + g + b + b)
//    .substring(1).match(/.{2}/g)
//    .map(x => parseInt(x, 16))


function onLoad() {
//
//	var body = document.body,
//    html = document.documentElement;
//
//	var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
//	var width = Math.max( body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth );
	var height = window.screen.height;
	var width = window.screen.width;
	
	window.tile_size = 256;
	
	window.buffer = {};
	window.buffer.margin = 1 * window.tile_size;
	
	window.buffer.x1 = window.scrollX;
	window.buffer.y1 = window.scrollY;
	window.buffer.x2 = window.buffer.x1 + window.screen.height;
	window.buffer.y2 = window.buffer.y1 + window.screen.width;
	
	window.n_tiles_x = Math.ceil((width + window.buffer.margin) / window.tile_size) + 3;
	window.n_tiles_y = Math.ceil((height + window.buffer.margin) / window.tile_size) + 3;
	
	window.elements_a_recycler = [];
	
	// manipulate tiles
	updateBackground(true)
	
	
	window.addEventListener("resize", onResize)
	window.addEventListener("scroll", onScroll)
}
onLoad()



function onResize() {

	var body = document.body,
    html = document.documentElement;

	var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
	var width = Math.max( body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth );
	
	window.n_tiles_x = Math.ceil((width + window.buffer.margin) / window.tile_size) + 3;
	window.n_tiles_y = Math.ceil((height + window.buffer.margin) / window.tile_size) + 3;
	
	updateBackground(false)
}
function onScroll() {
	updateBackground(false)
}

function updateBackground(empty) {
	// Il faut ajouter au buffer et retirer du buffer les nouvelles couleurs
	// Ajouter les couleurs qui doivent etre generees en gardant toujours une marge "margin"
	// Retirer les couleurs qui sont maintenant au delà de la marge "margin" pour ne pas surcharger la mémoire
	
	var x1 = window.scrollX;
	var y1 = window.scrollY;
	var x2 = x1 + window.screen.height;
	var y2 = y1 + window.screen.width;
	
	if (empty) {
		_updateBackground(x1, y1, x2, y2)
	} else if ((x1 % window.buffer.margin == 0) & (y1 % window.buffer.margin == 0)) {
		_updateBackground(x1, y1, x2, y2)
	}
//	
//	_updateBackground(x1, y1, x2, y2)
	
	
}

function _updateBackground(x1, y1, x2, y2) {
	
	var x0 = 0;
	var y0 = 0;
	
	// Remove tiles too far
	var tiles = document.getElementsByClassName("background_tile");
	for (var i = 0; i < tiles.length; i++) {
	
		var tile = tiles.item(i);
		
		if (!window.elements_a_recycler.includes(tile.id)) {
			var left = eval(tile.style.left.replace("px", ""));
			var top = eval(tile.style.top.replace("px", ""));
			
			if (left + window.tile_size < x1 - window.buffer.margin) {  // too at left
				window.elements_a_recycler.push(tile.id);
			} else if (top + window.tile_size < y1 - window.buffer.margin) {  // too on top
				window.elements_a_recycler.push(tile.id);
			} else if (left > x2 + window.buffer.margin) {  // too at right
				window.elements_a_recycler.push(tile.id);
			} else if (top > y2 + window.buffer.margin) {  // too at bottom
				window.elements_a_recycler.push(tile.id);
			} else {
				x0 = left;
				y0 = top;
			}
		}
		
		
			
	}
	
	
	_fillWithTiles(x0, y0, x1, y1)
	
}

function _fillWithTiles(x0, y0, x1, y1) {
	// (x0, y0) are the coordinates of one an existing tile. This will be used to phase the grid
	
	
	var background = document.getElementById("background");
	
	var x01 = x1 + ((x0 - x1) % window.tile_size);
	var y01 = y1 + ((y0 - y1) % window.tile_size);
	
	var tile_id = "";
	var tile = background;  // Only to initialize the variable
	
	// manipulate tiles
	for(var y = 0; y < window.n_tiles_y; y++) {
		for(var x = 0; x < window.n_tiles_x; x++) {
			var left = x01 + (x - 1) * window.tile_size;
			var top = y01 + (y - 1) * window.tile_size;
			var id = "background_tile_".concat(left.toString(), "_", top.toString());
			
			if (document.getElementById(id) == null) {
				if (window.elements_a_recycler.length == 0) {
					tile = createTile();
				} else {
					tile_id = window.elements_a_recycler.pop();
					tile = document.getElementById(tile_id);
				}
				tile.id = id;
				tile.style.left = left.toString().concat("px");
				tile.style.top = top.toString().concat("px");
				background.appendChild(tile);
			}
			
		}
	}
}


function createTile() {
	var tile_size = window.tile_size;
	
	var tile = document.createElement('canvas');
	
	tile.width = tile_size;
	tile.height = tile_size;
	tile.style.zIndex = -1;
	tile.style.position = "absolute";
	tile.style.border = "0px";
	tile.classList.add("background_tile");
	
	var ctx = tile.getContext("2d");

	var imgData = ctx.getImageData(0, 0, tile.width, tile.height);
	tile.data = imgData.data;
	
	for(var y = 0; y < tile_size; y++) {
		for(var x = 0; x < tile_size; x++) {
			var pos = (y * tile_size + x) * 4; // position in buffer based on x and y
			var r = Math.random() * 10;
			r = Math.min(Math.max(r, 0), 100);
			tile.data[pos  ] = r;           // some R value [0, 255]
			tile.data[pos+1] = r;          // some G value
			tile.data[pos+2] = r;           // some B value
			tile.data[pos+3] = 5*r;           // set alpha channel
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