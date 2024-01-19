//// For IE support
//(function () {
//  if ( typeof window.CustomEvent === "function" ) return false; //If not IE
//
//  function CustomEvent ( event, params ) {
//    params = params || { bubbles: false, cancelable: false, detail: undefined };
//    var evt = document.createEvent( 'CustomEvent' );
//    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
//    return evt;
//   }
//
//  CustomEvent.prototype = window.Event.prototype;
//
//  window.CustomEvent = CustomEvent;
//})();
//
//let element = $(window)[0];
//
//function scrollDown(e){
//  console.log("scrolled down", window.scrollY);
//}
//function scrollUP(e){
//	console.log("scrolled up");
//	if (window.espace_courrant != "sommaire") {
//		
//		if (window.scrollY <= (window.espaces["sommaire"].height + window.espaces[window.espace_courrant].y)) {
//			console.log("cdscbvuhsd", window.scroll_quantity_top_of_espace, e.detail.deltaY);
//			
//			window.scrollTo({
//				top: window.espaces["sommaire"].height + window.espaces[window.espace_courrant].y,
//				behavior: 'instant',
//			});
//			
//			window.scroll_quantity_top_of_espace += e.detail.deltaY;
//			if (window.scroll_quantity_top_of_espace < -300) {
//				goSommaire();
//			}
//		}
//		
//	}
	
//	
//}
//
//function scrollHappened(e){
//	
//	if(e.deltaY < 0){
//		scrollUpEvent = new CustomEvent("scrollUp", {"detail": e});
//		element.dispatchEvent(scrollUpEvent);
//	} else {
//		scrollDownEvent = new CustomEvent("scrollDown", {"detail": e});
//		element.dispatchEvent(scrollDownEvent);
//		
//		if (window.scrollY > 4000) {
//			e.preventDefault()
//		}
//	}
//}
//
//window.scroll_quantity_top_of_espace = 0;
//
//
//element.addEventListener("wheel", scrollHappened, {passive:false});
//element.addEventListener("scrollUp", scrollUP);
//element.addEventListener("scrollDown", scrollDown);

























//
//document.addEventListener('keydown', preventKeyBoardScroll, false);
//
//function preventKeyBoardScroll(e) {
//  var keys = [32, 33, 34, 35, 37, 38, 39, 40];
//  if (keys.includes(e.keyCode)) {
//    e.preventDefault();
//    return false;
//  }
//}