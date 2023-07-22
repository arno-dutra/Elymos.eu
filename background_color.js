// Defining the color of the background


console.log(window.espaces);
window.espaces = JSON.parse(window.espaces);

load_background_color();

function load_background_color() {
	
	var background_color = document.getElementById("background_color");
	var anchors = document.getElementById("anchors");
	
	var map_width = 0;
	
	for (const [key, value] of Object.entries(window.espaces)) {
		
		if (typeof value.issommaire == 'undefined') {
			var div = document.createElement('div');
		div.id = key;
		div.style.backgroundColor = value.backgroundColor;
		div.style.left = value.left.toString().concat("px");
		div.style.top = (value.top + window.espaces.sommaire.height).toString().concat("px");
		div.style.width = value.width.toString().concat("px");
		div.classList.add("background_color_element");
		
		background_color.appendChild(div);
		
		map_width += value.width;
		}
		
	}
	
	div = document.createElement('div');
	div.id = "sommaire";
	div.style.backgroundColor = window.espaces.sommaire.backgroundColor;
	div.style.left = window.espaces.sommaire.left.toString().concat("px");
	div.style.top = window.espaces.sommaire.top.toString().concat("px");
	div.style.width = map_width.toString().concat("px");
	div.style.height = window.espaces.sommaire.height.toString().concat("px");

	background_color.appendChild(div);
}


function change_background_color() {
	
	var x = window.scrollX;
	var y = window.scrollY;
	
	for (const [key, value] of Object.entries(window.espaces)) {
//	for (var i = 0; i < window.espaces.length; i++) {
//		console.log(key, value);
		if ((value.left < x) & (x < value.left + value.width)) {
			if (value.top < y) {
				document.getElementById("body").style.backgroundColor = value.backgroundColor;
				
			}
			
		}
		
	}
	
}


window.addEventListener("scroll", change_background_color);