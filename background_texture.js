// JavaScript Document



function set_espace_height() {
	
	var h = 0;
	var hh = 0;
	var margin_top = 0;
	
	Object.keys(window.espaces).forEach(function(espace) {
		if (espace != "sommaire") {
			hh = eval(window.getComputedStyle(document.getElementById(`espace_${espace}_container`)).getPropertyValue("height").replace("px", ""));
			margin_top = eval(window.getComputedStyle(document.getElementById(`espace_fil_${espace}`)).getPropertyValue("margin-top").replace("px", ""));
			h = Math.max(h, hh + margin_top);
		}
   
	});
	
	const sommaire_h = eval(window.getComputedStyle(document.getElementById("sommaire")).getPropertyValue("height").replace("px", ""));
	const groupe_margin_bottom = eval(window.getComputedStyle(document.getElementsByClassName("group")[0]).getPropertyValue("margin-bottom").replace("px", ""));
	
	window.map_height = h + sommaire_h + groupe_margin_bottom;
	
	const color_tiles = document.getElementsByClassName("background_color_element");
	
	for (var j = 0; j < color_tiles.length; j++) {
		color_tiles[j].style.height = `${h + groupe_margin_bottom}px`;
	}
	
}

//set_espace_height();

function set_noise_size() {
	
	bg = document.getElementById("background_texture");

	body = document.getElementById("body");

	bg.style.width = `${window.map_width}px`;	
	bg.style.height = `${window.map_height}px`;
	
}

//set_noise_size()

window.addEventListener('onEspaceChange', set_espace_height);
window.addEventListener('onEspaceChange', set_noise_size);