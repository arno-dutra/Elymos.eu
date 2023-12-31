function anchor_onLoad() {
//	
//	var home_to_top = document.getElementById('home_to_top');
//	home_to_top.style.left = window.espaces.sommaire.left.toString().concat("px");
//	home_to_top.style.top = window.espaces.sommaire.top.toString().concat("px");
	var element = document.getElementById('home_to_top');
    var style = window.getComputedStyle(element);
    var top = eval(style.getPropertyValue('top').replace("px", ""));
    var left = eval(style.getPropertyValue('left').replace("px", ""));
	
	var home_top = document.getElementById('home_top');
	home_top.style.left = `${window.espaces.sommaire.x + left}px`;
	home_top.style.top = `${window.espaces.sommaire.y + top}px`;
	
	var sommaire = document.getElementById('espace_sommaire_container');
	sommaire.style.left = `${window.espaces.sommaire.x}px`;
	sommaire.style.top = `${window.espaces.sommaire.y}px`;
	
	window.scrollTo({
		top: window.espaces[espace_courrant].y,
		left: window.espaces[espace_courrant].x,
		behavior: 'instant',
	});
}

anchor_onLoad()


// Managing anchors

function goSommaire() {
	window.scrollTo({
		top: window.espaces["sommaire"].y,
		left: window.espaces["sommaire"].x,
		behavior: 'smooth',
	});
	timetick_on();
}

function goTop() {
	
	// Determine in which espace we are
	
	var espace_courrant = window.espace_courrant;
	
	//  Jumping to current space
	
	if (espace_courrant !== "sommaire") {
		
		window.scrollTo({
			top: window.espaces[espace_courrant].y + window.espaces.sommaire.height,
			left: window.espaces[espace_courrant].x,
			behavior: 'smooth',
		});
		
	} else {
		
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
		
		if (y < window.espaces.sommaire.height) {
			return "sommaire";
		} else if ((value.left <= x) & (x < value.left + value.width)) {
			return key;
			
		}
		
	}
}


window.addEventListener('onEspaceChange', move_home_top);

function move_home_top(event) {
	var espace_courrant = event.detail;
	
	_move_home_top(espace_courrant, 1000);
}

function _move_home_top(espace_courrant, duration) {
	
	var element = document.getElementById('home_to_top');
    var style = window.getComputedStyle(element);
    var top = eval(style.getPropertyValue('top').replace("px", ""));
    var left = eval(style.getPropertyValue('left').replace("px", ""));
	
	
	
	if (espace_courrant !== "sommaire") {
		
		$("#home_top").stop().animate({ 
			top: window.espaces[espace_courrant].y + window.espaces.sommaire.height + top,
			left: window.espaces[espace_courrant].x + left,
		}, duration);
		
	} else {
		
		$("#home_top").stop().animate({ 
			top: window.espaces[espace_courrant].y + top,
			left: window.espaces[espace_courrant].x + left,
		}, duration);
		
	}
}
