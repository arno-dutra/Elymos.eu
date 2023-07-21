
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

// Adapt the color of the hud elements depending on espace
function update_hud_color(espace_courrant) {
	
	var hex_color = window.espaces[espace_courrant].backgroundColor;
	
	var brightness = Math.max(...hexToRgb(hex_color));
	
	if (brightness < 100) {
		document.documentElement.style.setProperty("--hud-element-color", "#fff");
	} else {
		document.documentElement.style.setProperty("--hud-element-color", "#000");
	}
	
}