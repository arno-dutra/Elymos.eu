// JavaScript Document
nav_put_elements(window.content)

function nav_put_elements(content) {

	var preprocessed_content = _nav_preprocessing(content);
	
	make_nav(preprocessed_content);
	
	window.dispatchEvent(new CustomEvent("nav_filled", {}));
	
}


function _nav_preprocessing(content) {
	
	var elements = {};
	var id = "";
	
	var keys = Object.keys(content);
	for (var i=0; i < keys.length; i++) {
		var k = keys[i];
		
		switch (content[k].nav_type) {
			case "timespan":
				id = `${content[k].espace}${content[k].nav_class}`;
				
				if (Object.keys(elements).includes(id)) {
					// Let verify if the datas are the same
					if ((elements[id].nav_starting_date != content[k].nav_starting_date) | (elements[id].nav_ending_date != content[k].nav_ending_date)) {
						alert(`Incoherent dates for nav_classe ${id} found while reading ${k}`);
					}
				} else {
					elements[id] = {};
					elements[id].espace = content[k].espace;
					if (k.localeCompare(elements[id].href) < 0) {
						elements[id].href = k;
					}
					elements[id].nav_type = content[k].nav_type;
					elements[id].nav_starting_date = content[k].nav_starting_date;
					elements[id].nav_ending_date = content[k].nav_ending_date;
				}
				break;
				
			case "instant":
				id = k;
				
				elements[id] = {};
				elements[id].espace = content[k].espace;
				elements[id].href = k;
				elements[id].nav_type = content[k].nav_type;
				elements[id].nav_date = content[k].nav_date;
				break;
				
		}
		
	}
	
	return elements
	
}


function make_nav(content) {
	
	var current_date = Date.parse(Date());
	var nav_month_height = 25;
	var first = current_date;
	
	var height = 0;
	var top = 0;
	
	var keys = Object.keys(content);
	for (var i=0; i < keys.length; i++) {
		var k = keys[i];
		
		var a = document.createElement('a');
		a.href = `javascript:go("${content[k].href}")`;

		a.id = `${k}_nav`;
		a.classList.add(`nav_timepoint`);
		a.classList.add(`nav_timepoint_${content[k].espace}`);
		
		switch (content[k].nav_type)  {
			case "timespan":
				if ((content[k].nav_ending_date == "now") | (_parse_date(content[k].nav_ending_date) > current_date)) {
					var nav_ending_date = current_date;
					var alt = `depuis le ${content[k].nav_starting_date}`;
				} else {
					var nav_ending_date = _parse_date(content[k].nav_ending_date);
					var alt = `du ${content[k].nav_starting_date} au ${content[k].nav_ending_date}`
				}
				var nav_starting_date = _parse_date(content[k].nav_starting_date);
				height = Math.max(12, (nav_ending_date - nav_starting_date) / 2678400000 * nav_month_height);
				top = (current_date - nav_ending_date) / 2678400000 * nav_month_height;
				
				first = Math.min(first, nav_starting_date);
				break;
				
			case "instant":
				height = 12;
				var nav_ending_date = _parse_date(content[k].nav_date);
				top = (current_date - nav_ending_date) / 2678400000 * nav_month_height;
				var alt = `le ${content[k].nav_date}`;
				
				first = Math.min(first, nav_ending_date);
				break;
				
		}
		
				
		a.style.top = `${top}px`;
		a.style.height = `${height}px`;
		a.title = alt;
//		a.appendChild(div);
		var espace = document.getElementById(`nav_container_${content[k].espace}`);
		espace.appendChild(a);
	
	}
	
	// Make time ticks
	first = new Date(first);
	var last = new Date(current_date);
	var first_year = first.getFullYear();
	var last_year = last.getFullYear();
	
	for (var year=first_year; year <= last_year; year++) {
		
		
		var d = new Date(year, 1, 1)
		var height = 24;  // Parameter
		var top = (current_date - Date.parse(d)) / 2678400000 * nav_month_height - height / 2 + 27;
		
		
		var a = document.createElement('div');
		a.innerHTML = `${year} —`;

		a.classList.add(`nav_timetick`);
		
		a.style.top = `${top}px`;
		a.style.height = `${height}px`;
//		a.appendChild(div);
		var espace = document.getElementById(`nav_container_time_ticks`);
		espace.appendChild(a);
	}
	
	// nav sizer
	var height = Math.abs(((last - first) / 2678400000 + 6) * nav_month_height + 90 + 50);
	
	document.getElementById("nav").style.height = `${height}px`;
}


function _parse_date(str) {
	var parts = str.split("/");
	var dt = new Date(parseInt(parts[2], 10),
                  parseInt(parts[1], 10) - 1,
                  parseInt(parts[0], 10));
	return Date.parse(dt);
}




function go(id) {
//	document.querySelector(`#${id}`).scrollIntoView({
//  behavior: 'smooth'
//});
	switch (window.content[id].nav_type) {
		case "timespan":
			var top = $(`#${id}`).offset().top - 200 - 2;
			break;
		case "instant":
			var top = $(`#${id}`).offset().top + (parseInt(window.getComputedStyle(document.getElementById(id)).getPropertyValue("height").replace("px", "")) / 2) - (window.innerHeight / 2);
			break;
	}
//	var top = $(`#${id}`).offset().top - 200 - 2;
	
	var espace = window.espaces[window.content[id].espace];
	var espace_container = document.getElementById(`espace_${window.content[id].espace}_container`);
	if (window.content[id].espace == window.espace_actif) {var isEspaceChange = false} else {var isEspaceChange = true};
	window.espace_actif = window.content[id].espace;
		
	window.scrollTo({
		top: window.espaces[window.espace_actif].y + window.espaces.sommaire.height,
		left: window.espaces[window.espace_actif].x,
		behavior: 'smooth',
	});

	var top_inside_container = top - (window.espaces[window.espace_actif].y + window.espaces.sommaire.height); // Note : This function is never called to go to the sommaire

	espace_container.scrollTo({
		top: top_inside_container,
		behavior: 'smooth',
	});
		
//	
//	window.scrollTo({
//		top: espace_container.style.top,
//		left: espace_container.style.left,
//		behavior: 'smooth',
//	});
	if (isEspaceChange) {
		update_nav_top_position(top_inside_container);
		move_home_top(top_inside_container);
	};
	
		
	
	timetick_off();
	
	var newActiveEspaceEvent = new CustomEvent("onNewActiveEspace", {
	  detail: {
		newEspace: window.content[id].espace,
		first_load: false,
	  },
	});
	
	window.dispatchEvent(newActiveEspaceEvent);
}



























