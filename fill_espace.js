
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
		case "minecraft_carrousel":
			make_minecraft_carrousel(element, id);
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
	
	var img_container = document.createElement('div');
	
	img_container.id = id;
	img_container.classList.add("panneau");
	img_container.classList.add(`panneau_${element.espace}`);
	div.appendChild(img_container);
	
	var img = document.createElement('img');
	img.src = `img/${element.espace}/${element.src}`;
	img.classList.add("panneau_img");
	img_container.appendChild(img);
	
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

function make_minecraft_carrousel(element, id) {
	var div = document.createElement('div');
	div.classList.add("group");
	var espace = document.getElementById(`espace_fil_${element.espace}`);
	espace.appendChild(div);
	
	
	var carrousel_container = document.createElement('div');
	carrousel_container.innerHTML = `
		<table width="100%" border="0" id="espace_${element.espace}_carrousel_container">
		  <tbody>
			<tr>

			  <td width="46px" align="center" valign="center">
				<img id=${id.concat(`-btn-left`)} src=${"img/minecraft_carrousel_arrow_left.svg"} class="panneau_minecraft_arrow panneau_minecraft_arrow_left"
				</td>
			  <td width="66%" align="center" valign="top">
				  <div id="${id}" class="panneau panneau_${element.espace}"></div>
				</td>
			  <td width="46px" align="center" valign="center">
				<img id=${id.concat(`-btn-right`)} src=${"img/minecraft_carrousel_arrow_right.svg"} class="panneau_minecraft_arrow panneau_minecraft_arrow_right"
				</td>
			</tr>
		  </tbody>
		</table>`;
	div.appendChild(carrousel_container);
	
	var img_container = document.getElementById(id);
	
	for (var i = 0; i < element.src.length; i++) {
		var img = document.createElement('img');
		img.id = id.concat(`-${i}`)
		img.src = `img/${element.espace}/${element.src[i]}`;
		img.classList.add("panneau_img");
		img.classList.add(`panneau_img_tag-${id}`);
		img_container.appendChild(img);
	}	
	
	
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






