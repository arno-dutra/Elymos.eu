
console.log(window.contenu);
var content = JSON.parse(window.contenu);
put_elements(content);


function put_elements(content) {
	
	

	var keys = Object.keys(content);
	console.log(keys);
	for (var i=0; i < keys.length; i++) {
		var k = keys[i];
		
		make_element(content[k], k);
		
	}
	
}

function make_element(element, id) {
	switch (element.type) {
		case "image":
			make_image(element, id);
			break;
		default:
			alert(`element's type ${element.type} is not recognized`);
	}
}

function make_image(element, id) {
	var div = document.createElement('div');
	div.classList.add("group")
	var espace = document.getElementById(`espace_fil_${element.espace}`);
	espace.appendChild(div);
	
	var img = document.createElement('img');
	
	img.id = id;
	img.classList.add("panneau");
	img.classList.add(`panneau_${element.espace}`);
	img.src = `img/${element.espace}/${element.src}`;
	div.appendChild(img);
	
	if (typeof element.legend !== 'undefined') {
		var legend = document.createElement('h2');
		legend.style.left = "75px";
		legend.style.top = "-20px";
		legend.id = id + "-legend";
		legend.classList.add("legend");
		legend.classList.add(`legend_${element.espace}`);
		legend.innerHTML = element.legend;
		div.appendChild(legend);
	}
}








