// JavaScript Document

function timetick_on(fast=false) {
	if (fast) {
		$(".nav_timetick").stop().animate({ 
			opacity: 0.5,
		}, 150);
	} else {
		$(".nav_timetick").stop().animate({ 
			opacity: 0.5,
		}, 2000);
	}
}

function timetick_off(fast=false) {
	if (fast) {
		$(".nav_timetick").stop().animate({ 
			opacity: 0,
		}, 150);
	} else {
		$(".nav_timetick").stop().animate({ 
			opacity: 0,
		}, 500);
	}
}
