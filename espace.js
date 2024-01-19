// JavaScript Document

window.addEventListener('scroll', isOnEspaceChange);
window.espace_courrant = "sommaire";
window.espace_actif = window.espace_courrant;


function isOnEspaceChange() {
	
	var espace_courrant = _espace_courrant();
	
	if ((espace_courrant != window.espace_courrant) & (document.readyState == "complete")) {
		window.espace_courrant = espace_courrant;
	
		var evt = new CustomEvent('onEspaceChange', {detail: espace_courrant});

		window.dispatchEvent(evt);
	}
}


//Listen to your custom event
window.addEventListener('onEspaceChange', onEspaceChange);


function onEspaceChange(event) {
	var espace_courrant = event.detail;
}