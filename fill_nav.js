// JavaScript Document
nav_put_elements(window.content)

function nav_put_elements(content) {

	var preprocessed_content = _nav_preprocessing(content);
	
	make_nav(preprocessed_content);
//	
//	var keys = Object.keys(content);
//	console.log(keys);
//	for (var i=0; i < keys.length; i++) {
//		var k = keys[i];
//		
//		make_element(content[k], k);
//		
//	}
	
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
					elements[id].nav_type = content[k].nav_type;
					elements[id].nav_starting_date = content[k].nav_starting_date;
					elements[id].nav_ending_date = content[k].nav_ending_date;
				}
				break;
				
			case "instant":
				id = k;
				
				elements[id] = {};
				elements[id].espace = content[k].espace;
				elements[id].nav_type = content[k].nav_type;
				elements[id].nav_date = content[k].nav_date;
				break;
				
		}
		
	}
	
	return elements
	
}


function make_nav(content) {
	
	var current_date = Date.parse(Date());
	var nav_month_height = 15;
	
	var height = 0;
	var top = 0;
	
	var keys = Object.keys(content);
	for (var i=0; i < keys.length; i++) {
		var k = keys[i];

		var div = document.createElement('div');
		div.id = k;
		div.classList.add(`nav_timepoint`);
		div.classList.add(`nav_timepoint_${content[k].espace}`);
		
		switch (content[k].nav_type)  {
			case "timespan":
				height = Math.max(12, (_parse_date(content[k].nav_ending_date) - _parse_date(content[k].nav_starting_date)) / 2678400000 * nav_month_height);
				console.log(height, _parse_date(content[k].nav_ending_date), content[k].nav_ending_date, _parse_date(content[k].nav_starting_date), content[k].nav_starting_date, nav_month_height, (_parse_date(content[k].nav_ending_date) - _parse_date(content[k].nav_starting_date)));
				
				top = (current_date - _parse_date(content[k].nav_ending_date)) / 2678400000 * nav_month_height;
				break;
				
			case "instant":
				height = 12;
				top = (current_date - _parse_date(content[k].nav_date)) / 2678400000 * nav_month_height;
				break;
				
		}
				
		div.style.top = `${top}px`;
		div.style.height = `${height}px`;
		var espace = document.getElementById(`nav_container_${content[k].espace}`);
		espace.appendChild(div);
	
	}

}


function _parse_date(str) {
	var parts = str.split("/");
	var dt = new Date(parseInt(parts[2], 10),
                  parseInt(parts[1], 10) - 1,
                  parseInt(parts[0], 10));
	return Date.parse(dt);
}
































