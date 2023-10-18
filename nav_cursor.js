$(allInView);
$(window).scroll(allInView);


function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    
    var v = ((docViewBottom >= elemTop) && (elemBottom >= docViewTop));
	
	
    var docViewLeft = $(window).scrollLeft();
    var docViewRight = docViewLeft + $(window).width();

    var elemLeft = $(elem).offset().left;
    var elemRight = elemLeft + $(elem).width();
    
    var h = ((docViewRight >= elemLeft) && (elemRight >= docViewLeft));
	
	return (v && h)
}

function allInView() {
	
	var elements_du_fil = document.getElementsByClassName(`panneau`);

	var visible_nav_els_set = new Set();
	
	for (var i = 0; i < elements_du_fil.length; i++) {
		
		var el_content = window.content[elements_du_fil[i].id];
		
		if (el_content.nav_type == "timespan") {var nav_el = document.getElementById(`${el_content.espace}${el_content.nav_class}_nav`);}
		else {var nav_el = document.getElementById(`${elements_du_fil[i].id}_nav`);}
		
		
		if (isScrolledIntoView(elements_du_fil.item(i))) {
			
			visible_nav_els_set.add(nav_el);
			
			nav_el.style.borderWidth = "3px";
			
		}
		
	}
	
	[].forEach.call($(".nav_timepoint"), function(nav_el) {
		if (!visible_nav_els_set.has(nav_el)) {
			
			nav_el.style.borderWidth = "1px";
		}
	})
	
	
    
}