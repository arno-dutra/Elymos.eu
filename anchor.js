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
		top: window.espaces[espace_actif].y,
		left: window.espaces[espace_actif].x,
		behavior: 'instant',
	});
}

anchor_onLoad()


// Managing anchors

function goSommaire() {
	window.espace_actif = "sommaire";
	
	window.scrollTo({
		top: window.espaces["sommaire"].y,
		left: window.espaces["sommaire"].x,
		behavior: 'smooth',
	});
	timetick_on();
	
	update_nav_top_position(0);
	move_home_top(0);
	
	var newActiveEspaceEvent = new CustomEvent("onNewActiveEspace", {
	  detail: {
		newEspace: "sommaire",
		first_load: false,
	  },
	});
	
	window.dispatchEvent(newActiveEspaceEvent);
}

function goTop() {
	
	var container = document.getElementById(`espace_${window.espace_actif}_container`);
		
	container.scrollTo({
		top: 0,
		left: 0,
		behavior: 'smooth',
	});
	
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


//window.addEventListener('onEspaceChange', move_home_top);

function move_home_top(top_inside_container) {
//	var espace_actif = event.detail;
	
	_move_home_top(window.espace_actif, 1000, top_inside_container);
}

function _move_home_top(espace_actif, duration, top_inside_container) {
	
	var element = document.getElementById('home_to_top');
    var style = window.getComputedStyle(element);
    var top = eval(style.getPropertyValue('top').replace("px", ""));
    var left = eval(style.getPropertyValue('left').replace("px", ""));
	
	
	
	if (espace_actif !== "sommaire") {
		
		$("#home_top").stop().animate({ 
			top: window.espaces[espace_actif].y + window.espaces.sommaire.height + top - top_inside_container,
			left: window.espaces[espace_actif].x + left,
		}, duration);
		
	} else {
		
		$("#home_top").stop().animate({ 
			top: window.espaces[espace_actif].y + top - top_inside_container,
			left: window.espaces[espace_actif].x + left,
		}, duration);
		
	}
}


function synchronize_anchor_with_active_espace() {
	
  var container = document.getElementById(`espace_${window.espace_actif}_container`);
  $('#home_top').css('top', `calc(${container.style.top} - ${container.scrollTop}px + 20px)`);
}
