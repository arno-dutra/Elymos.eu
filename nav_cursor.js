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

	for (var i = 0; i < elements_du_fil.length; i++) {
		
		var el_content = window.content[elements_du_fil[i].id];
		
		if (el_content.nav_type == "timespan") {var nav_el = $(`#${el_content.espace}${el_content.nav_class}_nav`);}
		else {var nav_el = $(`#${elements_du_fil[i].id}_nav`);}
		
		
		if (isScrolledIntoView(elements_du_fil.item(i))) {
			
			nav_el.css("border-width", "3px");
			
		} else {
			
			nav_el.css("border-width", "1px");
			
		}
		
	}
    
}