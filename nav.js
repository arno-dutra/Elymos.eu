$(window).scroll(function(){
    $('#nav').css({
        'left': $(this).scrollLeft() + window.screen.width * 0.67 //Why this 15, because in the CSS, we have set left 15, so as we scroll, we would want this to remain at 15px left
    });
});