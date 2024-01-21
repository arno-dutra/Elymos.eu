// Allow scrolling when cursor is on nav

document.getElementById("nav").addEventListener("wheel", (e) => {
		var espace_container = document.getElementById(`espace_${window.espace_actif}_container`);
		espace_container.scrollTop += e.deltaY;
		espace_container.dispatchEvent(new CustomEvent("wheel", e));
	})