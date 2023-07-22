make_espaces()

function make_espaces() {
	
	var container = document.getElementById("espace_containers");
	
	var accumulateur = "";
	
	for (var [espace, value] of Object.entries(window.espaces)) {
		
		var top = value.y;
		if (espace != "sommaire") {
			top += window.espaces.sommaire.height;
		}
		
		accumulateur = accumulateur.concat(
`<table width="100%" border="0" id="espace_${espace}_container" style="z-index: 0; position: absolute; left: ${value.x}px; top: ${top}px;">
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
}