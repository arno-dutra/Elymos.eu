// Managing anchors

function goTop() {
	
	// Determine in which espace we are
	
	const espace_courrant = _espace_courrant();
	
	//  Jumping to current space
	
//	window.scrollTo({top: window.espaces[espace_courrant].y, left: window.espaces[espace_courrant].x, behavior: 'smooth'});
	if (typeof espace_courrant !== "undefined") {
		
		const anchor = espace_courrant.concat("-anchor");
		document.getElementById(anchor).scrollIntoView();
		
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


function move_home_top() { // NOT WORKING
	const espace_courrant = _espace_courrant();
	
	$("#home_top").animate({ 
        top: espace_courrant.y,
		left: espace_courrant.x,
      }, 1000);
}
