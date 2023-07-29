
function load_nav() {
	var container = document.getElementById("_nav_container");
	
	container.innerHTML = `<table id="nav_container" width="100%" border="0">
	  <tbody>
		<tr>
		  <td width="${window.prop*100}%" align="center" valign="top"></td>
		  <td width="${(1 - window.prop)*100}%"" align="center" valign="top">
			  <div id="nav"></div>
			</td>
		</tr>
	  </tbody>
	</table>`;
	
	
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
	
	if (brightness < 100) {
		document.documentElement.style.setProperty("--hud-element-color", "#fff");
		home_to_top.style.filter = "invert(100%)";
		home_top.style.filter = "invert(100%)";
	} else {
		document.documentElement.style.setProperty("--hud-element-color", "#000");
		home_to_top.style.filter = "invert(0%)";
		home_top.style.filter = "invert(0%)";
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