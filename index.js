make_espaces()

function make_espaces() {
	
	var container = document.getElementById("espace_containers");
	
	var map_width = 0;
	
	var accumulateur = "";
	
	for (var [espace, value] of Object.entries(window.espaces)) {
		
		if (espace != "sommaire") {
		
			accumulateur = accumulateur.concat(
				`<table width="100%" border="0" id="espace_${espace}_container" style="z-index: 0; position: absolute; left: ${value.x}px; top: ${value.y + window.espaces.sommaire.height}px;">
				  <tbody>
					<tr>
					  <td width="66%" align="center" valign="top">
						  <div id="espace_${espace}"></div>
						</td>
					  <td width="34%" align="center" valign="top"></td>
					</tr>
				  </tbody>
				</table>`);
			map_width += value.width;
		}
	}
	
	espace = "sommaire";
	value = window.espaces.sommaire;
	accumulateur = accumulateur.concat(
		`<table width="100%" border="0" id="espace_${espace}_container" style="z-index: 0; position: relative; left: ${value.x}px; top: ${value.y}px;">
			  <tbody>
				<tr>
				  <td width="66%" align="center" valign="top">
					  <div id="espace_${espace}"></div>
					</td>
				  <td width="34%" align="center" valign="top"></td>
				</tr>
			  </tbody>
		  </table>`);
	
	container.innerHTML = accumulateur;
}