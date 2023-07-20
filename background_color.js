// Defining the color of the background


console.log(window.espaces);
window.espaces = JSON.parse(window.espaces);

load_background_color();

function load_background_color() {
	
	var background_color = document.getElementById("background_color");
	
	for (const [key, value] of Object.entries(window.espaces)) {
		
		var div = document.createElement('div');
		div.id = key;
		div.style.backgroundColor = value.backgroundColor;
		div.style.left = value.left.toString().concat("px");
		div.style.top = value.top.toString().concat("px");
		div.style.width = value.width.toString().concat("px");
		div.classList.add("background_color_element");
		
		background_color.appendChild(div);
		
		
	}
	
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