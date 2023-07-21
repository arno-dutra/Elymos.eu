// Managing anchors

function goTop() {
	
	// Determine in which espace we are
	
	const espace_courrant = _espace_courrant();
	
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
		
		
		if ((value.left < x) & (x < value.left + value.width)) {
			if (value.top < y) {
				return key;
			}
			
		}
		
	}
}


function move_home_top() {
	const espace_courrant = _espace_courrant();
	
	$("#home_top").animate({ 
        top: window.espaces[espace_courrant].y,
		left: window.espaces[espace_courrant].x,
      }, 1000);
}
