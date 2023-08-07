
var content = JSON.parse(window.contenu);

content = make_order(content);

function make_order(content) {

	var espaces = Object.keys(window.espaces);
	for (var i=0; i < espaces.length; i++) {
		var espace = espaces[i];
		
		var arr = filterByEspace(content, espace);
		
		arr.sort(_order);

		for (var j = 0; j < arr.length; j++) {
			content[arr[j].id].order = j;  // Défini l'ordre dans lequel les elements doivent apparaitre dans les fils
		}
		
	}
	
	return content;
}

function _order(a,b) {
	switch (a.nav_type) {
		case "timespan":
			var a_date = _parse_date(a.nav_starting_date) - eval(a.id.split('-').reverse()[0]);
			break;
		case "instant":
			var a_date = _parse_date(a.nav_date) - eval(a.id.split('-').reverse()[0]);
			break;
	}
	switch (b.nav_type) {
		case "timespan":
			var b_date = _parse_date(b.nav_starting_date) - eval(b.id.split('-').reverse()[0]);
			break;
		case "instant":
			var b_date = _parse_date(b.nav_date) - eval(b.id.split('-').reverse()[0]);
			break;
	}
	return b_date - a_date;
}

function _parse_date(str) {
	var parts = str.split("/");
	var dt = new Date(parseInt(parts[2], 10),
                  parseInt(parts[1], 10) - 1,
                  parseInt(parts[0], 10));
	return Date.parse(dt);
}

function filterByEspace(dictionary, k) {
  const filteredItems = [];
  for (const key in dictionary) {
    if (dictionary.hasOwnProperty(key) && dictionary[key].espace === k) {
		dictionary[key].id = key;
        filteredItems.push(dictionary[key]);
    }
  }
  return filteredItems;
}

put_elements(content);


function put_elements(content) {

	var keys = Object.keys(content);
	for (var i=0; i < keys.length; i++) {
		var key = keys[i];
		content[key].id = key;
	}
	
	var arr = Object.values(content);
	
	arr.sort(function(a, b) {return a.order - b.order;});
	
	for (var j = 0; j < arr.length; j++) {
		var k = arr[j].id;
		
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
		case "score":
			make_score(element, id);
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


function make_score(element, id) {
	var div = document.createElement('div');
	div.classList.add("group")
	var espace = document.getElementById(`espace_fil_${element.espace}`);
	espace.appendChild(div);
	
	var html_container = document.createElement('div');
	
	html_container.id = id;
	html_container.innerHTML = `<iframe src="score.html?id=${id}&src_audio=${element.src_audio}" id="${id}_iframe" scrolling="no" onload="score_onLoad(this)"></iframe>`
	html_container.classList.add("panneau");
	html_container.classList.add(`panneau_${element.espace}`);
	div.appendChild(html_container);
	
}


function score_onLoad(e) {
	resizeIframe(e);
	
	var id = e.id.replace("_iframe", "");
	var element = window.content[id];
	
	$(`#${id}_iframe`)[0].contentWindow.document.getElementById("titre").innerHTML = element.titre;
	$(`#${id}_iframe`)[0].contentWindow.document.getElementById("composer").innerHTML = element.composer;
	$(`#${id}_iframe`)[0].contentWindow.document.getElementById("player").innerHTML = element.player;

	$(`#${id}_iframe`)[0].contentWindow.document.getElementById("link").src = element.link;
	$(`#${id}_iframe`)[0].contentWindow.document.getElementById("src_score").src = `score/${id}/${element.src_score}`;

	$(`#${id}_iframe`)[0].contentWindow.document.getElementById("score").src = `score/${id}/${element.src_img}`;
	
	
//  	var x = document.createElement("AUDIO");
//    x.setAttribute("src",`score/${id}/${element.src_audio}`);
//	$(`#${id}_iframe`)[0].contentWindow.document.getElementById("iframe_listener_1").appendChild(x);
//	$(`#${id}_iframe`)[0].contentWindow.document.getElementById("iframe_listener_2").innerHTML = `<script src="score.js"></script>`;
}





