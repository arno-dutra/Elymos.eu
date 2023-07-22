// Managing anchors

function goTop() {
	
	// Determine in which espace we are
	
	var espace_courrant = window.espace_courrant;
	
	//  Jumping to current space
	
	if (typeof espace_courrant !== "undefined") {
		
		window.scrollTo({
			top: window.espaces[espace_courrant].y,
			left: window.espaces[espace_courrant].x,
			behavior: 'smooth',
		});
		
	}
	
}

function _espace_courrant() {
	
	var x = window.scrollX;
	var y = window.scrollY;
	
	
	for (var [key, value] of Object.entries(window.espaces)) {
		
		if (y < value.y) {
			return "sommaire";
		} else if ((value.left <= x) & (x < value.left + value.width)) {
			return key;
			
		}
		
	}
}


window.addEventListener('onEspaceChange', move_home_top);

function move_home_top(event) {
	var espace_courrant = event.detail;
	
	var element = document.getElementById('home_to_top');
    var style = window.getComputedStyle(element);
    var top = eval(style.getPropertyValue('top').replace("px", ""));
    var left = eval(style.getPropertyValue('left').replace("px", ""));
	
	
	$("#home_top").animate({ 
        top: window.espaces[espace_courrant].y + top,
		left: window.espaces[espace_courrant].x + left,
      }, 1000);
}
