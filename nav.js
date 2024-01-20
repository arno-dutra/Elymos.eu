
function load_nav() {
	var container = document.getElementById("_nav_container");
	
	container.innerHTML = `<div id="nav" style="display: flex; flex-direction: column; justify-content: flex-start; width: calc(${(1 - window.prop)*100}vw - 14px); left: ${window.prop*100}vw;">
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
	nav.style.left = `calc(${window.espaces[espace_actif].x}px + ${window.prop*100}vw)`;
	
	$(function(){
	  $("#nav").load("nav.html"); 
	});
}

// Place in header (do not use async or defer)
document.addEventListener('readystatechange', event => {
  switch (document.readyState) {
    case "loading":
      break;
    case "interactive":
      break;
    case "complete":
		  update_hud();
      break;
  }
});

function update_hud() {
	var espace_courant = _espace_courrant();
	
	_update_hud_color(espace_courant);
	_update_nav_top_position(espace_courant, "instant");
	update_left_position();
	
	anchor_onLoad();
}

const hexToRgb = hex =>
  hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
             ,(m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16));

load_nav()


function update_left_position() {

  var $w = $(window);
  $('#nav').css('left', $w.scrollLeft() + window.prop * window.innerWidth);

}


window.addEventListener('onNewActiveEspace', onNewActiveEspace);

window.dispatchEvent(new CustomEvent("onNewActiveEspace", {detail: {newEspace: window.espace_actif, first_load: true}}));

function onNewActiveEspace(e) {
  const keys = Object.keys(window.espaces);
	
  for (let i=0; i < keys.length; i++) {
	  var container = document.getElementById(`espace_${keys[i]}_container`);
	  container.removeEventListener("scroll", synchronize_scroll_with_active_espace);
	  if (!e.detail.first_load) {container.removeEventListener("scroll", synchronize_nav_cursor_with_active_espace)};
  }
	
  var container = document.getElementById(`espace_${e.detail.newEspace}_container`);
  
  container.addEventListener("scroll", synchronize_scroll_with_active_espace);
  container.addEventListener("scroll", synchronize_anchor_with_active_espace);
	
	if (!e.detail.first_load) {
		synchronize_nav_cursor_with_active_espace();
		container.addEventListener("scroll", synchronize_nav_cursor_with_active_espace);
	}
}


function synchronize_scroll_with_active_espace() {
	
  var container = document.getElementById(`espace_${window.espace_actif}_container`);
  $('#nav').css('top', `calc(${container.style.top} - ${container.scrollTop}px)`);
}

// Make nav following us along x
$(window).on('scroll', update_left_position);
$(window).on('resize', update_left_position);



window.addEventListener('onEspaceChange', update_hud_color);
// Adapt the color of the hud elements depending on espace
function update_hud_color(event) {
	var espace_courrant = event.detail;

	_update_hud_color(espace_courrant);
}
	
function _update_hud_color(espace_courrant) {
	
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

//window.addEventListener('onNewActiveEspace', update_nav_top_position);
//window.addEventListener('resize', update_nav_top_position);

function update_nav_top_position(top_inside_container) {
	
	_update_nav_top_position(window.espace_actif, 1000, top_inside_container);

}
	
function _update_nav_top_position(espace_actif, duration, top_inside_container) {
	
//	var fil = document.getElementById(`espace_${espace_actif}_container`);
//	
//	$("#nav").animate({ 
//        top: fil.style.top,
//      }, 1000);
//	console.log(`calc(${fil.style.top} - 10px)`);
	
	var container = document.getElementById(`espace_${espace_actif}_container`);
	var top = parseFloat(container.style.top) - top_inside_container;
	
	if (espace_actif != "sommaire") {
		$("#nav").animate({ 
							top: `${top}px`,
							paddingTop: `-10px`,
						  }, 
						  duration
						 );
						  
	} else {
		$("#nav").animate({ 
							top: `${top}px`,
							paddingTop: `75px`,
						  }, 
						  duration
						 );
	}
//	if (espace_actif != "sommaire") {
//		$("#nav").animate({ 
//        	top: fil.style.top,
//        	paddingTop: `-10px`,
//      	}, duration);
//	} else {
//		$("#nav").animate({ 
//        	top: fil.style.top,
//        	paddingTop: `75px`,
//      	}, duration);
//	}
	
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
		backgroundColor: window.espaces[window.espace_actif].backgroundColor,
	  }, 100);
	
}

function deactivate_espace_hover_line(espace) {

	$(`#nav_line_for_hover_${espace}`).stop().animate({ 
		height: "0px",
	  }, {duration: 300, complete: function() {document.getElementById(`nav_line_for_hover_${espace}`).style.opacity = 0}});
	
}

function on_mouseout_timeline(espace) {
	
	if (espace != window.espace_actif) {
		deactivate_espace_hover_text(espace);
		deactivate_espace_hover_line(espace);
	} 
	if (window.espace_actif != "sommaire") {
		activate_espace_hover_text(window.espace_actif);
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
