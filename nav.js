
function load_nav() {
	var container = document.getElementById("_nav_container");
	
	container.innerHTML = `<div id="nav" style="display: flex; flex-direction: column; justify-content: center; width: ${(1 - window.prop)*100}vw; left: ${window.prop*100}vw;">
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
	nav.style.left = `calc(${window.espaces[espace_courrant].x}px + ${window.prop*100}vw)`;
	
	$(function(){
	  $("#nav").load("nav.html"); 
	});
	
}

load_nav()




// Make nav following us along x
$(window).on('scroll', function () {

  var $w = $(window);
  $('#nav').css('left', $w.scrollLeft() + window.prop * window.innerWidth);

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
window.addEventListener('resize', update_nav_top_position);

function update_nav_top_position(event) {
	var espace_courrant = event.detail;
	
	var fil = document.getElementById(`espace_${espace_courrant}_container`);
//	
//	$("#nav").animate({ 
//        top: fil.style.top,
//      }, 1000);
//	console.log(`calc(${fil.style.top} - 10px)`);
//	
	if (espace_courrant != "sommaire") {
		$("#nav").animate({ 
        	top: fil.style.top,
        	paddingTop: `-10px`,
      	}, 1000);
	} else {
		$("#nav").animate({ 
        	top: fil.style.top,
        	paddingTop: `75px`,
      	}, 1000);
	}
	
}

// Gestion des titres des espaces

function activate_espace_hover_text(espace) {
		
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

	$(`#nav_hover_box_${type}`).stop().animate({ 
		opacity: 1,
	  }, 100);

	// Donne la bonne couleur au texte
	var hex_color = window.espaces[espace].backgroundColor;

	var brightness = Math.max(...hexToRgb(hex_color));

	if (brightness < 150) {
		document.getElementById(`nav_text_${type}_hover`).style.color = "white";
	} else {
		document.getElementById(`nav_text_${type}_hover`).style.color = "black";
	}

	document.getElementById(`nav_text_${type}_hover`).innerHTML = window.espaces[espace].name;

}

function activate_espace_hover_line(espace) {

	// Animation de la ligne
	var ma = 0;
	var timepoints = document.getElementsByClassName(`nav_timepoint_${espace}`);
	for (var i = 0; i < timepoints.length; i++) {
		var m = eval(getComputedStyle(timepoints.item(i)).top.replace("px", "")); 
		if (ma < m) {
			ma = m;
		}
	}

	document.getElementById(`nav_line_for_hover_${espace}`).style.opacity = 1;
	$(`#nav_line_for_hover_${espace}`).stop().animate({ 
		height: `${ma}px`,
	  }, {duration: 300});
	
}

function deactivate_espace_hover_text(espace) {
	
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

function deactivate_espace_hover_line(espace) {

	$(`#nav_line_for_hover_${espace}`).stop().animate({ 
		height: "0px",
	  }, {duration: 300, complete: function() {document.getElementById(`nav_line_for_hover_${espace}`).style.opacity = 0}});
	
}

function on_mouseout_timeline(espace) {
	
	if (espace != window.espace_courrant) {
		deactivate_espace_hover_text(espace);
		deactivate_espace_hover_line(espace);
	} 
	if (window.espace_courrant != "sommaire") {
		activate_espace_hover_text(window.espace_courrant);
	}
	
}

function on_mousehover_timeline(espace) {
	
	activate_espace_hover_text(espace);
	activate_espace_hover_line(espace);
		
}

function deactivate_hover_lines() {
	var keys = Object.keys(window.espaces);
	for (var i = 0; i < keys.length; i++) {
		if (keys[i] != "sommaire") {
			deactivate_espace_hover_line(keys[i])
		}
	}
}

function activate_hover_text_onEspaceChange(event) {
	if (event.detail != "sommaire") {activate_espace_hover_text(event.detail)}
}

function deactivate_hover_text_onEspaceChange(event) {
	var keys = Object.keys(window.espaces);
	for (var i = 0; i < keys.length; i++) {
		if (keys[i] != "sommaire") {
			deactivate_espace_hover_text(keys[i])
		}
	}
}

function activate_hover_line_onEspaceChange(event) {
	if (event.detail != "sommaire") {activate_espace_hover_line(event.detail)}
}

function deactivate_hover_line_onEspaceChange(event) {
	if (event.detail != "sommaire") {deactivate_espace_hover_line(event.detail)}
}


window.addEventListener('onEspaceChange', deactivate_hover_text_onEspaceChange);
window.addEventListener('onEspaceChange', activate_hover_text_onEspaceChange);
window.addEventListener('onEspaceChange', deactivate_hover_lines);
window.addEventListener('onEspaceChange', activate_hover_line_onEspaceChange);
