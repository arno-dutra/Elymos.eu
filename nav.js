
function load_nav() {
	var container = document.getElementById("_nav_container");
	
	container.innerHTML = `<div id="nav_container" style="display: flex; flex-direction: column; justify-content: center; width: ${(1 - window.prop)*100}%; left: ${window.prop*100}%;">
			  <div id="nav"></div>
	</div>`;
//	container.innerHTML = `<table id="nav_container" width="100%" border="0">
//	  <tbody>
//		<tr>
//		  <td width="${window.prop*100}%" align="center" valign="top"></td>
//		  <td width="${(1 - window.prop)*100}%"" align="center" valign="top">
//			  <div id="nav"></div>
//			</td>
//		</tr>
//	  </tbody>
//	</table>`;
	
	
	var nav = document.getElementById('nav');
	nav.style.left = `${window.espaces[espace_courrant].x}px`;
	
	$(function(){
	  $("#nav").load("nav.html"); 
	});
	
}

load_nav()




// Make nav following us along x
$(window).on('scroll', function () {

  var $w = $(window);
  $('#nav').css('left', $w.scrollLeft());

});


const hexToRgb = hex =>
  hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
             ,(m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16))




window.addEventListener('onEspaceChange', update_hud_color);
// Adapt the color of the hud elements depending on espace
function update_hud_color(event) {
	var espace_courrant = event.detail;
	
	var home_to_top = document.getElementById('home_to_top');
	var home_top = document.getElementById('home_top');
	
	var hex_color = window.espaces[espace_courrant].backgroundColor;
	
	var brightness = Math.max(...hexToRgb(hex_color));
	
	if (brightness < 150) {
		document.documentElement.style.setProperty("--hud-element-color", "#fff");
		home_to_top.style.filter = "invert(100%)";
		home_top.style.filter = "invert(100%)";
	} else {
		document.documentElement.style.setProperty("--hud-element-color", "#000");
		home_to_top.style.filter = "invert(0%)";
		home_top.style.filter = "invert(0%)";
	}
	if (espace_courrant == "sommaire") {
		timetick_on(true);
	} else {	
		timetick_off(true);
	}
	
}

window.addEventListener('onEspaceChange', update_nav_top_position);

function update_nav_top_position(event) {
	var espace_courrant = event.detail;
	
	var fil = document.getElementById(`espace_${espace_courrant}_container`);
	
	$("#nav_container").animate({ 
        top: fil.style.top,
      }, 1000);
	
}

// Gestion des titres des espaces

function on_mousehover_timeline(espace) {
	switch (window.espaces[espace].type) {
		case "Portfolio":
			var type = "portfolio";
			break;
		case "Carriere":
			var type = "carriere";
			break;
	}
	
	document.getElementById(`nav_hover_box_${type}`).style.backgroundColor = window.espaces[espace].backgroundColor;
	document.getElementById(`nav_hover_box_${type}`).style.borderColor = getComputedStyle(document.getElementsByClassName(`panneau_${espace}`)[0]).borderColor;
//	document.getElementById(`nav_hover_box_${type}`).style.opacity = 1;
	$(`#nav_hover_box_${type}`).stop().animate({ 
        opacity: 1,
      }, 100);
	
	var hex_color = window.espaces[espace].backgroundColor;
	
	var brightness = Math.max(...hexToRgb(hex_color));
	
	if (brightness < 150) {
		document.getElementById(`nav_text_${type}_hover`).style.color = "white";
	} else {
		document.getElementById(`nav_text_${type}_hover`).style.color = "black";
	}
	
	document.getElementById(`nav_text_${type}_hover`).innerHTML = window.espaces[espace].name;
}

function on_mouseout_timeline(espace) {
	switch (window.espaces[espace].type) {
		case "Portfolio":
			var type = "portfolio";
			break;
		case "Carriere":
			var type = "carriere";
			break;
	}
	
	$(`#nav_hover_box_${type}`).stop().animate({ 
        opacity: 0,
		backgroundColor: window.espaces[window.espace_courrant].backgroundColor,
      }, 100);
	
}