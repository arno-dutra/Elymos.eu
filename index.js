make_espaces()

function make_espaces() {
	
	var container = document.getElementById("espace_containers");
	
	var map_width = 0;
	
	var accumulateur = "";
	
	for (var [espace, value] of Object.entries(window.espaces)) {
		
		if (espace != "sommaire") {
		
			accumulateur = accumulateur.concat(
				`<div style="position: absolute; left: ${value.x}px; top: ${value.y + window.espaces.sommaire.height}px;" id="espace_${espace}_container" class="espace_container">
					<div id="${espace}_container_sizer" class="espace_sizer" style="background-color: ${window.espaces[espace].backgroundColor};">
						<table width="100%" border="0" style="z-index: 0;" id="espace_${espace}_table">
						  <tbody>
							<tr>
							  <td width="${window.prop*100}%" align="center" valign="top">
								  <div id="espace_fil_${espace}" class="espace"></div>
								</td>
							  <td width="${(1 - window.prop)*100}%" align="center" valign="top"></td>
							</tr>
						  </tbody>
						</table>
					</div>
				</div>`);
			map_width += value.width;
		}
	}
	
	container.innerHTML = accumulateur;
}


window.nav_filled = false;
window.espaces_filled = false;
window.content_loaded = false;

window.addEventListener("nav_filled", () => {window.nav_filled = true});
window.addEventListener("espaces_filled", () => {window.espaces_filled = true});
window.addEventListener('load', (event) => {window.content_loaded = true});

window.addEventListener("nav_filled", is_nav_and_espace_filled);
window.addEventListener("espaces_filled", is_nav_and_espace_filled);
window.addEventListener("load", is_nav_and_espace_filled);

function is_nav_and_espace_filled() {
	if (window.espaces_filled && window.nav_filled && window.content_loaded) {

		window.dispatchEvent(new CustomEvent("nav_and_espaces_filled", {}));
	}
}

window.addEventListener("nav_and_espaces_filled", resize_espace_containers)



function resize_espace_containers() {
	// resize espace_containers
	
	var espaces = Object.keys(window.espaces);
	
	for (let i = 0; i < espaces.length; i++) {
		document.getElementById(`${espaces[i]}_container_sizer`).style.height = `max(${window.getComputedStyle(document.getElementById("nav")).height}, ${window.getComputedStyle(document.getElementById(`espace_${espaces[i]}_table`)).height})`;
	}
}


