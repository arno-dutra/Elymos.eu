// JavaScript Document



function set_espace_height() {
	
	const espaces = document.getElementsByClassName("espace_container");
	
	var h = 0;
	
	for (var i = 0; i < espaces.length; i++) {
		h = Math.max(h, eval(window.getComputedStyle(espaces[i]).getPropertyValue("height").replace("px", "")));
	}
	
	window.map_height = h;
	
	const color_tiles = document.getElementsByClassName("background_color_element");
	
	for (var j = 0; j < color_tiles.length; j++) {
		color_tiles[j].style.height = `${h}px`;
	}
	
}

set_espace_height();

function set_noise_size() {
	
bg = document.getElementById("background_texture");

body = document.getElementById("body");

bg.style.width = `${window.map_width}px`;
bg.style.height = `${window.map_height}px`;
	
}

set_noise_size()