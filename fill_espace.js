
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
		case "carrousel":
			make_carrousel(element, id);
			break;
		case "html":
			make_html(element, id);
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
	
	if ((typeof element.legend !== 'undefined') | (typeof element.link !== 'undefined')) {
		var legend_container = document.createElement('div');
		legend_container.classList.add("legend_container");
		
		if (typeof element.legend !== 'undefined') {
			var legend = document.createElement('h2');
			legend.id = id + "-legend";
			legend.classList.add("legend");
			legend.classList.add(`legend_${element.espace}`);
			legend.innerHTML = element.legend;
			legend_container.appendChild(legend);
		}
	
		if (typeof element.link !== 'undefined') {
			var a = document.createElement('a');
			a.href = element.link;
			a.target = "_blank";
			
			var link = document.createElement('img');
			link.id = id + "-link";
			link.src = `img/${element.espace}_link.svg`;
			link.classList.add("link");
			link.classList.add(`link_${element.espace}`);
			link.innerHTML = element.legend;
			
			a.appendChild(link);
			legend_container.appendChild(a);
		}
		
		div.appendChild(legend_container);
		
	}
}

function make_carrousel(element, id) {
	var div = document.createElement('div');
	div.classList.add("group");
	var espace = document.getElementById(`espace_fil_${element.espace}`);
	espace.appendChild(div);
	
	switch (element.espace) {
		case "minecraft":
			var arrow_width = 46;
			break;
		case "farnnight":
			var arrow_width = 30;
			break;
	}
	
	var carrousel_container = document.createElement('div');
	carrousel_container.innerHTML = `
		<table width="100%" border="0" id="espace_${element.espace}_carrousel_container">
		  <tbody>
			<tr>

			  <td width="${arrow_width}px" align="center" valign="center">
				<a href="javascript:carrousel_slide('${id}', 'left')">
					<img id=${id.concat(`-btn-left`)} src="img/${element.espace}_carrousel_arrow_left.svg" class="panneau_${element.espace}_arrow panneau_${element.espace}_arrow_left" width="${arrow_width}px">
				</a>
				</td>
			  <td width="66%" align="center" valign="top">
				  <div id="${id}" class="panneau panneau_${element.espace}">
					<div id="${id}-slider" class="panneau_carrousel_slider" style="left: 0px;"></div>
					</div>
				</td>
			  <td width="${arrow_width}px" align="center" valign="center">
				<a href="javascript:carrousel_slide('${id}', 'right')">
					<img id=${id.concat(`-btn-right`)} src="img/${element.espace}_carrousel_arrow_right.svg" class="panneau_${element.espace}_arrow panneau_${element.espace}_arrow_right" width="${arrow_width}px">
				</a>
				</td>
			</tr>
		  </tbody>
		</table>`;
	div.appendChild(carrousel_container);
	
	var img_container = document.getElementById(`${id}-slider`);
	
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

function carrousel_slide(id, direction) {
	var img_container = document.getElementById(`${id}-slider`);
	
	var images = document.getElementsByClassName(`panneau_img_tag-${id}`);
	var width = window.getComputedStyle(document.getElementById(id), null).getPropertyValue("width");
	
	
	var d = {"left": "", "right":"-"}[direction];
	
	if (((img_container.style.left != "0px") & (direction == "left")) | ((img_container.style.left != `-${(images.length - 1) * eval(width.replace("px", ""))}px`) & (direction == "right"))) {
		
		$(`#${id}-slider`).animate({ 
			left: `+=${d}${width}`,
		}, 750);
	}
	
	
}

function make_html(element, id) {
	var div = document.createElement('div');
	div.classList.add("group")
	var espace = document.getElementById(`espace_fil_${element.espace}`);
	espace.appendChild(div);
	
	var html_container = document.createElement('div');
	
	html_container.id = id;
	html_container.innerHTML = `<iframe src="html/${element.espace}/${element.src}" scrolling="no" onload="resizeIframe(this)"></iframe>`
	html_container.classList.add("panneau");
	html_container.classList.add(`panneau_${element.espace}`);
	div.appendChild(html_container);
}



