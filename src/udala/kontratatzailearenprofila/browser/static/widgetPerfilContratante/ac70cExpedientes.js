// Licencia: http://creativecommons.org/licenses/by-sa/3.0/
// Basado en "Content Syndication with Case-Hardened JavaScript" (http://kentbrewster.com/case-hardened-javascript/) [http://kentbrewster.com/rights-and-permissions]

 (function() {

	var idPoder =document.getElementById('poder').value;
	var idEntidad =document.getElementById('entidad').value;
	var idioma = document.getElementById('idioma').value;

	/** cambiar a url de produccion para entrega**/
	// LOCAL
	//var urlPagina ='http://desarrollo.jakina.ejiedes.net:7001/';
	//DESARROLLO 
	//var urlPagina ='https://www.contratacion.euskadi.ejiedes.eus/';
	//PRUEBAS
	//var urlPagina ='https://www.contratacion.euskadi.ejiepru.eus/';
	//PRODUCCION 	
	var urlPagina ='https://www.contratacion.euskadi.eus/';
	var urlAgrupacion = 'ac70cPublicidadWar/serviciosWidgetREST/recuperarConfiguracion/?';
	var urlAplicacion = 'ac70cPublicidadWar/serviciosWidgetREST/recuperarExpedientes/?';
	
	var agrupacionPestanas = "";
	
	var nombreOfuscado = '';
	for (var i = 0; i < 16; i++) {
		nombreOfuscado += String.fromCharCode(Math.floor(Math.random() * 26) + 97);
	}
	window[nombreOfuscado] = {};
	var $ = window[nombreOfuscado];
	
	mostrarLoader();
	
	$.f = function() {
		
		return {	
			
			URL_datos_inicio :  'tipoWidget=1&idioma='+idioma+'&idPoder='+idPoder+'&idEntidad='+idEntidad+'&estadoTramitacion=&contratosMenores=FALSE&fechaPublicacionDesde=&tipoProcedimiento=&R01HNoPortal=true',
			
			//Estados 
			URL_datos_ta :  'tipoWidget=1&idioma='+idioma+'&idPoder='+idPoder+'&idEntidad='+idEntidad+'&estadoTramitacion=&contratosMenores=FALSE&fechaPublicacionDesde=&tipoProcedimiento=&R01HNoPortal=true',
			URL_datos_ap :  'tipoWidget=1&idioma='+idioma+'&idPoder='+idPoder+'&idEntidad='+idEntidad+'&estadoTramitacion=AP&contratosMenores=&fechaPublicacionDesde=&tipoProcedimiento=&R01HNoPortal=true',
			URL_datos_al :  'tipoWidget=1&idioma='+idioma+'&idPoder='+idPoder+'&idEntidad='+idEntidad+'&estadoTramitacion=AL&contratosMenores=&fechaPublicacionDesde=&tipoProcedimiento=&R01HNoPortal=true',
			URL_datos_ac :  'tipoWidget=1&idioma='+idioma+'&idPoder='+idPoder+'&idEntidad='+idEntidad+'&estadoTramitacion=AC&contratosMenores=&fechaPublicacionDesde=&tipoProcedimiento=&R01HNoPortal=true',
			URL_datos_an :  'tipoWidget=1&idioma='+idioma+'&idPoder='+idPoder+'&idEntidad='+idEntidad+'&estadoTramitacion=AN&contratosMenores=&fechaPublicacionDesde=&tipoProcedimiento=&R01HNoPortal=true',
			URL_datos_ad :  'tipoWidget=1&idioma='+idioma+'&idPoder='+idPoder+'&idEntidad='+idEntidad+'&estadoTramitacion=AD&contratosMenores=FALSE&fechaPublicacionDesde=&tipoProcedimiento=&R01HNoPortal=true',
			URL_datos_de :  'tipoWidget=1&idioma='+idioma+'&idPoder='+idPoder+'&idEntidad='+idEntidad+'&estadoTramitacion=DE&contratosMenores=&fechaPublicacionDesde=&tipoProcedimiento=&R01HNoPortal=true',
			URL_datos_fo :  'tipoWidget=1&idioma='+idioma+'&idPoder='+idPoder+'&idEntidad='+idEntidad+'&estadoTramitacion=FO&contratosMenores=&fechaPublicacionDesde=&tipoProcedimiento=&R01HNoPortal=true',
			URL_datos_ds :  'tipoWidget=1&idioma='+idioma+'&idPoder='+idPoder+'&idEntidad='+idEntidad+'&estadoTramitacion=DS&contratosMenores=&fechaPublicacionDesde=&tipoProcedimiento=&R01HNoPortal=true',
			URL_datos_hi :  'tipoWidget=1&idioma='+idioma+'&idPoder='+idPoder+'&idEntidad='+idEntidad+'&estadoTramitacion=HI&contratosMenores=&fechaPublicacionDesde=&tipoProcedimiento=&R01HNoPortal=true',
			URL_datos_cpm:  'tipoWidget=1&idioma='+idioma+'&idPoder='+idPoder+'&idEntidad='+idEntidad+'&estadoTramitacion=CP&contratosMenores=&fechaPublicacionDesde=&tipoProcedimiento=&R01HNoPortal=true',
			URL_datos_pac:  'tipoWidget=1&idioma='+idioma+'&idPoder='+idPoder+'&idEntidad='+idEntidad+'&estadoTramitacion=PAC&contratosMenores=&fechaPublicacionDesde=&tipoProcedimiento=&R01HNoPortal=true',
			URL_datos_mo :  'tipoWidget=1&idioma='+idioma+'&idPoder='+idPoder+'&idEntidad='+idEntidad+'&estadoTramitacion=MO&contratosMenores=&fechaPublicacionDesde=&tipoProcedimiento=&R01HNoPortal=true',
			URL_datos_me :  'tipoWidget=1&idioma='+idioma+'&idPoder='+idPoder+'&idEntidad='+idEntidad+'&estadoTramitacion=AD&contratosMenores=TRUE&fechaPublicacionDesde=&tipoProcedimiento=&R01HNoPortal=true',

			//Procedimientos
			URL_datos_ta :  'tipoWidget=1&idioma='+idioma+'&idPoder='+idPoder+'&idEntidad='+idEntidad+'&estadoTramitacion=&contratosMenores=&fechaPublicacionDesde=&tipoProcedimiento=&R01HNoPortal=true',
			URL_datos_ab :  'tipoWidget=1&idioma='+idioma+'&idPoder='+idPoder+'&idEntidad='+idEntidad+'&estadoTramitacion=&contratosMenores=&fechaPublicacionDesde=&tipoProcedimiento=1&R01HNoPortal=true',
			URL_datos_re :  'tipoWidget=1&idioma='+idioma+'&idPoder='+idPoder+'&idEntidad='+idEntidad+'&estadoTramitacion=&contratosMenores=&fechaPublicacionDesde=&tipoProcedimiento=2&R01HNoPortal=true',			
			URL_datos_dc :  'tipoWidget=1&idioma='+idioma+'&idPoder='+idPoder+'&idEntidad='+idEntidad+'&estadoTramitacion=&contratosMenores=&fechaPublicacionDesde=&tipoProcedimiento=4&R01HNoPortal=true',
			URL_datos_am :  'tipoWidget=1&idioma='+idioma+'&idPoder='+idPoder+'&idEntidad='+idEntidad+'&estadoTramitacion=&contratosMenores=&fechaPublicacionDesde=&tipoProcedimiento=5&R01HNoPortal=true',
			URL_datos_sd :  'tipoWidget=1&idioma='+idioma+'&idPoder='+idPoder+'&idEntidad='+idEntidad+'&estadoTramitacion=&contratosMenores=&fechaPublicacionDesde=&tipoProcedimiento=6&R01HNoPortal=true',
			URL_datos_ot :  'tipoWidget=1&idioma='+idioma+'&idPoder='+idPoder+'&idEntidad='+idEntidad+'&estadoTramitacion=&contratosMenores=&fechaPublicacionDesde=&tipoProcedimiento=7&R01HNoPortal=true',
			URL_datos_ns :  'tipoWidget=1&idioma='+idioma+'&idPoder='+idPoder+'&idEntidad='+idEntidad+'&estadoTramitacion=&contratosMenores=&fechaPublicacionDesde=&tipoProcedimiento=8&R01HNoPortal=true',
			URL_datos_nc :  'tipoWidget=1&idioma='+idioma+'&idPoder='+idPoder+'&idEntidad='+idEntidad+'&estadoTramitacion=&contratosMenores=&fechaPublicacionDesde=&tipoProcedimiento=9&R01HNoPortal=true',
			URL_datos_di :  'tipoWidget=1&idioma='+idioma+'&idPoder='+idPoder+'&idEntidad='+idEntidad+'&estadoTramitacion=&contratosMenores=&fechaPublicacionDesde=&tipoProcedimiento=10&R01HNoPortal=true',
			URL_datos_da :  'tipoWidget=1&idioma='+idioma+'&idPoder='+idPoder+'&idEntidad='+idEntidad+'&estadoTramitacion=&contratosMenores=&fechaPublicacionDesde=&tipoProcedimiento=11&R01HNoPortal=true',			
			URL_datos_cp :  'tipoWidget=1&idioma='+idioma+'&idPoder='+idPoder+'&idEntidad='+idEntidad+'&estadoTramitacion=&contratosMenores=&fechaPublicacionDesde=&tipoProcedimiento=12&R01HNoPortal=true',
			URL_datos_ai :  'tipoWidget=1&idioma='+idioma+'&idPoder='+idPoder+'&idEntidad='+idEntidad+'&estadoTramitacion=&contratosMenores=&fechaPublicacionDesde=&tipoProcedimiento=13&R01HNoPortal=true',
			URL_datos_cs :  'tipoWidget=1&idioma='+idioma+'&idPoder='+idPoder+'&idEntidad='+idEntidad+'&estadoTramitacion=&contratosMenores=&fechaPublicacionDesde=&tipoProcedimiento=14&R01HNoPortal=true',
			URL_datos_as :  'tipoWidget=1&idioma='+idioma+'&idPoder='+idPoder+'&idEntidad='+idEntidad+'&estadoTramitacion=&contratosMenores=&fechaPublicacionDesde=&tipoProcedimiento=15&R01HNoPortal=true',
			URL_datos_mp :  'tipoWidget=1&idioma='+idioma+'&idPoder='+idPoder+'&idEntidad='+idEntidad+'&estadoTramitacion=&contratosMenores=&fechaPublicacionDesde=&tipoProcedimiento=16&R01HNoPortal=true',			
			URL_datos_dem:  'tipoWidget=1&idioma='+idioma+'&idPoder='+idPoder+'&idEntidad='+idEntidad+'&estadoTramitacion=&contratosMenores=&fechaPublicacionDesde=&tipoProcedimiento=17&R01HNoPortal=true',
			URL_datos_ass:  'tipoWidget=1&idioma='+idioma+'&idPoder='+idPoder+'&idEntidad='+idEntidad+'&estadoTramitacion=&contratosMenores=&fechaPublicacionDesde=&tipoProcedimiento=18&R01HNoPortal=true',
			URL_datos_dcp:  'tipoWidget=1&idioma='+idioma+'&idPoder='+idPoder+'&idEntidad='+idEntidad+'&estadoTramitacion=&contratosMenores=&fechaPublicacionDesde=&tipoProcedimiento=19&R01HNoPortal=true',
			URL_datos_dai:  'tipoWidget=1&idioma='+idioma+'&idPoder='+idPoder+'&idEntidad='+idEntidad+'&estadoTramitacion=&contratosMenores=&fechaPublicacionDesde=&tipoProcedimiento=20&R01HNoPortal=true',
			URL_datos_esp:  'tipoWidget=1&idioma='+idioma+'&idPoder='+idPoder+'&idEntidad='+idEntidad+'&estadoTramitacion=&contratosMenores=&fechaPublicacionDesde=&tipoProcedimiento=21&R01HNoPortal=true',
			
			
			runFunction : [],
			async:false,
			init : function(target) {
				var theScripts = document.getElementsByTagName('SCRIPT');
				for (var i = 0; i < theScripts.length; i++) {
					
					if (theScripts[i].src.indexOf("ac70cExpedientes.js") != -1) {
						$.a = {};
						if (theScripts[i].innerHTML) {
							
							$.a = $.f.parseJson(theScripts[i].innerHTML);

						}
						if ($.a.err) {
							alert($.f.traducir('param_mal'));//bad json!
						}
							$.f.cargarVariables();
							$.f.crearEstructuraGeneral();
							//$.f.cargarAgrupacion();
						break;
					}
				}				
			},
			parseJson : function(json) {
					
				this.parseJson.data = json;
				if ( typeof json !== 'string') {
					return {"err":"Parametrizaci&oacute;n del widget mal formada."};//trying to parse a non-string JSON object
				}
				try {
					var f = Function(['var document,top,self,window,parent,Number,Date,Object,Function,',
						'Array,String,Math,RegExp,Image,ActiveXObject;',
						'return (' , json.replace(/<\!--.+-->/gim,'').replace(/\bfunction\b/g,'function&shy;') , ');'].join(''));
					return f();
				} catch (e) {
					return {"err":"ERROR parametrizando"};//trouble parsing JSON object
				}
			},
			crearPresentacion : function () {
				
				var ns = document.createElement('style');
				document.getElementsByTagName('head')[0].appendChild(ns);
				if (!window.createPopup) {
					ns.appendChild(document.createTextNode(''));
					ns.setAttribute("type", "text/css");
				}
				var s = document.styleSheets[document.styleSheets.length - 1];
				var ieRules = "";
				for (r in $.css) {
					var selector = '.' + nombreOfuscado + ' ' + r;
					if (!window.createPopup) {
						var theRule = document.createTextNode(selector + $.css[r]);
						ns.appendChild(theRule);
					} else {
						ieRules += selector + $.css[r];
					}
				}
				if (window.createPopup) { s.cssText = ieRules; }
				
			},
			cargarJSON : function() {
				
				var inf = $.a.tipoInformacion;
				
				eval ('var urlXML = $.f.URL_datos_'+inf);	
				
				if (inf == "ul")	
				{
					urlXML = urlXML + '' +$.a.poder;
				}
				
				if (!$.f.runFunction) { 			
					$.f.runFunction = [];
				}
								
				var url = urlPagina + urlAgrupacion + urlXML;
				obtenerAgrupacion(url, "jswidget",$.w,$.a);
				
				var url = urlPagina + urlAplicacion +urlXML;
				cargarAnuncios(url, "jswidget",$.w,$.a,agrupacionPestanas);
			},
			borrarElemento : function(id) {
				
				if (document.getElementById(id)) {
					var s = document.getElementById(id);
					s.parentNode.removeChild(s);
				}
			},
			cargarVariables : function() {	
				$.d = {
					"idioma" : document.getElementById('idioma').value,
					"titulo" : document.getElementById('titulo').value,
					"poder" : document.getElementById('poder').value,
					"tipoInformacion" : document.getElementById('tipoInformacion').value,
					"entidad" : document.getElementById('entidad').value
					};
				for (var k in $.d) { if ($.a[k] === undefined) { $.a[k] = $.d[k]; } }
			},

			crearEstructuraGeneral : function() {
				$.f.borrarElemento("perfil");
				$.w = document.createElement('div');
				$.w.id = "perfil";
				$.f.cargarJSON();									
			},
			
			
			cortar_cadena: function (txt,numLetras) {
				palabras = txt.split(' ');
				texto_acortado = '';
				i=0;
				tot=0;
				while (tot + palabras[i].length <= numLetras) {
					texto_acortado += palabras[i] + ' ';
					tot += palabras[i].length;
					i++;
					if (i > palabras.length-1) break;
				}
				if (txt.length > numLetras) return texto_acortado+'[...]';
				else return texto_acortado;
			},
			traducir: function (cadena) {
				if (idioma=='eu') {//	if ($.a.idioma=='eu') {
					return $.traducciones_eu[cadena];
				} else {
					return $.traducciones_es[cadena];
				}
			}
		};
	}();
	var thisScript = /^ac70cExpedientes.js$/;
	
	
	if ((document.getElementById('probar')) && (document.getElementById('actualizar'))) {
		h1 = function() { $.f.init(thisScript); };
		if(typeof window.addEventListener !== 'undefined') {
			document.getElementById('probar').addEventListener('click', h1, false);
			document.getElementById('actualizar').click();
			document.getElementById('probar').removeEventListener('click', h1 ,false);
		} else if(typeof window.attachEvent !== 'undefined') {
			document.getElementById('probar').attachEvent('onclick', h1);
			document.getElementById('actualizar').click();
			document.getElementById('probar').onclick=null;
			document.getElementById('probar').detachEvent('onclick', h1);
		}
	}
	
	ocultarLoader();		
 })();

	function cargarAnuncios(url, id, window, literales, agrupacionPestanas){
		$.ajax({ 
			url: url,
			type: "GET",
			dataType: "json",			
			async: false,
			contentType: "application/json;charset=utf-8",
			success: function(html, status, xhr ) {				
				pintarTablaDinamica(html, window, literales);	
			},
			error: function (xhr, ajaxOptions, thrownError) {
				alert("error " + thrownError);
			}
		});
	}

	function obtenerAgrupacion(url, id, window, literales){		
		$.ajax({ 
			url: url,
			type: "GET",
			dataType: "json",			
			async: false,				
			contentType: "application/json;charset=utf-8",
			success: function(html, status, xhr) {				
				configurarAgrupacion(html, window, literales);	
			},
			error: function (xhr, ajaxOptions, thrownError) {
				alert("error " + thrownError);
			}
		});
	}
	
	function configurarAgrupacion(html, window, literales){
		document.getElementById('numResult').value=html["numResult"];
		var tipo_licit, tipo_procedi,  tipo_contra;
		var agrupa = html["agrupacion"];

		if(agrupa==0){//Sin agrupacion
			var idioma = literales.idioma;
			if (idioma == "es"){							
				location.href = "ac70cWidgetExpedientesSinConfigurarEs.html";
			}else{
				location.href = "ac70cWidgetExpedientesSinConfigurarEu.html";
			}
		}
		//Agrupacion por estados de tramitacion
		else if (agrupa==1){
				document.getElementById('agrupacion').value=1;
				tipo_procedi = document.getElementById('tipo_procedimientos');
				if(tipo_procedi!=null){
					tipo_procedi.parentNode.removeChild(tipo_procedi);
				}
				document.getElementById('tipo_licitaciones').style.visibility = 'visible';
		}
		//Agrupacion por tipos de procedimientos
		else if(agrupa==2){
			
				document.getElementById('agrupacion').value=3;
				document.getElementById('titulo').value=html["titulo"];	
				tipo_licit = document.getElementById('tipo_licitaciones');
				if(tipo_licit!=null){
					tipo_licit.parentNode.removeChild(tipo_licit);
				}				
				document.getElementById('tipo_procedimientos').style.visibility = 'visible';
		}

		agrupacionPestanas = agrupa;		
	}
	
	function pintarTablaDinamica (r,window, literales, agrupacionPestanas) {
		
		var idioma = literales.idioma;
					
		var tit = document.createElement('h4');				
		if(literales.titulo===""){			
			tit.innerHTML = document.getElementById('titulo').value;
			
			if(document.getElementById('titulo').value==="" 
					&& document.getElementById('tipoInformacion').value == 'inicio'){
					
				if (idioma == "es"){
					if (agrupacionPestanas == 1){
						tit.innerHTML = 'Todos los anuncios';
					}else if (agrupacionPestanas == 2){
						tit.innerHTML = 'Anuncios Abiertos';
					}else if (agrupacionPestanas == 3){
						tit.innerHTML = 'Anuncios de Contratos Mayores';
					}
				}else{					
					if (agrupacionPestanas == 1){
						tit.innerHTML = 'Iragarki guztiak';
					}else if (agrupacionPestanas == 2){
						tit.innerHTML = 'Irekitako Lizitazioak';
					}else if (agrupacionPestanas == 3){
						tit.innerHTML = 'Kontratu Handien Iragarkiak';
					}					
				}
			}
			
		}else{			
			tit.innerHTML = literales.titulo;
		}
		window.appendChild(tit);
					
		var tablaWidget = document.createElement('table');
		tablaWidget.id = "tablaWidget";

		var cab = document.createElement('thead');
		var cuerpo = document.createElement('tbody');
		var filaCabecera    = document.createElement('tr');
		
		//Creo las columnas.
		var columnas = r.columnas;		
		if (columnas != null){						
			for(col = 0; col < columnas.length; col++){
				var columnaCabecera = document.createElement('th');
				columnaCabecera.innerHTML = columnas[col].nombre;
				filaCabecera.appendChild(columnaCabecera);
			} 
		}
		cab.appendChild(filaCabecera);

		var numMaxRegistros = '';
		var lista = r.lista;													
		if (lista == null || (lista!=null && lista.length == 0)){
			var m = document.createElement('dl');
			window.appendChild(m);
			h = document.createElement('dt');												
			sub = document.createElement('dd');
											
			if (idioma == "es")
			{							
				sub.innerHTML = "No se ha encontrado nada que mostrar";
			}else
			{
				sub.innerHTML = "Ez da aurkitu ezer erakusteko";
			}
												
			h.appendChild(sub);
			m.appendChild(h);
						
		}else{
			if (lista != null){
								
				for (var i = 0; i < lista.length; i++) {												
					var fila = document.createElement('tr');
					var valores = lista[i].valores;
										
					for(var v = 0; v < valores.length; v++) {
						var columna = document.createElement('td');

						var tipo = valores[v].tipo;

						if(tipo == 'F'){
							//COLUMNA FECHA
							var fechadato = "";						
							if (idioma == "es")
							{
								fechadato = formatearFecha_es(valores[v].valor.substring(0,valores[v].valor.indexOf("00")));
							} else {
								fechadato = formatearFecha_eu(valores[v].valor.substring(0,valores[v].valor.indexOf("00")));
							}
							columna.innerHTML = fechadato;
						} else if(tipo == 'L') {
							//COLUMNA CON LINK.
							var a = document.createElement('A');
							var link = lista[i].link;
							var link_final = link.replace("//contenidos","/"+idioma+"/contenidos");
							a.href = link_final;
							a.target = '_blank';
							a.innerHTML = valores[v].valor + "  ";						
							columna.appendChild(a);
						} else {
							//COLUMNA NORMAL
							columna.innerHTML = valores[v].valor;
						}
						
						//ESTILO
						if (i % 2 != 0) {
							fila.className = "impar"
						} else {
							fila.className = "par"
						}
						
						fila.appendChild(columna);
					}							
					cuerpo.appendChild(fila);			
				}
				tablaWidget.appendChild(cab);		
				tablaWidget.appendChild(cuerpo);
				window.appendChild(tablaWidget);
			}

			
			if (idioma == "es")
			{			
				numMaxRegistros = '* El n\u00famero de resultados est\u00E1 limitado a ' + r.numMaxRegistros + ' elementos';
			} else {			
				numMaxRegistros = '* Emaitz kopurua ' + r.numMaxRegistros + ' elementuetara mugatua dago';
			}
			
		}
		
		//INICIO TABLA CON IMAGEN			
		var tabla = document.createElement('table');
		tabla.id = "tablaImagen";
		var cuerpo2 = document.createElement('tbody');
		var fila = document.createElement('tr');
		var columna1 = document.createElement('td');
		var columna2 = document.createElement('td');
		var imagen = document.createElement('img');
					
		var a1 = document.createElement('A');
		//url al que se redirecciona al pulsar la imagen			
		a1.href = "http://www.contratacion.euskadi.eus/w32-kpehome/"+literales.idioma;
		a1.target = '_blank';
		
		var a1 = document.createElement('A');
		//url al que se redirecciona al pulsar la imagen				
		a1.href = "http://www.contratacion.euskadi.eus/w32-kpehome/"+literales.idioma;
		a1.target = '_blank';
					
		imagen.src = 'w32-logo_contratacion.jpg';
		a1.appendChild(imagen);		
		columna1.innerHTML = numMaxRegistros;		
		columna1.style.width = '82%';
		columna1.style.border='none';
		columna1.style.background= '#ffffff';
		columna1.style.fontSize= '100%';
		columna2.style.width = '18%';
		columna2.style.border='none';
		columna2.style.align = 'right';
		columna2.style.background= '#ffffff';			
		columna2.appendChild(a1);
		fila.appendChild(columna1);
		fila.appendChild(columna2);
		cuerpo2.appendChild(fila);
		tabla.appendChild(cuerpo2);
		window.appendChild(tabla);	
		elemento2 = document.getElementById('jswidget');
		elemento2.appendChild(window);
		//FIN TABLA CON IMAGEN	

		//paginacion o no paginacion
		
		if(document.getElementById('numResult').value=="0"){
			
			if (idioma=='es') {
				
				$('#tablaWidget').dataTable( {
					"bPaginate": false,
					"bFilter": false,
					"bSort": false,
					"bLengthChange": false,
					 "bDestroy": true,
					"oLanguage": {
						"sInfo":          "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
						"sInfoThousands":  ",",
						"oPaginate": {
							"sFirst":    "Primero",
							"sLast":    "Último",
							"sNext":    "Siguiente",
							"sPrevious": "Anterior"
						}
					}
				} );
			}else{
				$('#tablaWidget').dataTable( {
					"bPaginate": false,
					"bFilter": false,
					"bSort": false,
					"bLengthChange": false,
					 "bDestroy": true,
					"oLanguage": {
						"sInfo":          "Erregistroak erakusten _START_-tik _END_-ra  _TOTAL_ erregistroko guztizkotik",
						"sInfoThousands":  ",",
						"oPaginate": {
							"sFirst":    "Lehenengoa",
							"sLast":    "Azkena",
							"sNext":    "Hurrengoa",
							"sPrevious": "Aurrekoa"
						}
						
					}
				} );
			}
		}else{
						
			if (idioma=='es') {
			
				$('#tablaWidget').dataTable( {
					"iDisplayLength": parseInt(document.getElementById('numResult').value),
					"bPaginate": true,
					"bFilter": false,
					"bSort": false,
					"bDestroy": true,					
					"bLengthChange": false,
					 "oLanguage": {
						"sInfo":          "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
						"sInfoThousands":  ",",
						"oPaginate": {
							"sFirst":    "Primero",
							"sLast":    "Último",
							"sNext":    "Siguiente",
							"sPrevious": "Anterior"
						}
					}
				} );
			}else{
				$('#tablaWidget').dataTable({
					"iDisplayLength": parseInt(document.getElementById('numResult').value),
					"bPaginate": true,
					"bFilter": false,
					"bSort": false,
					 "bDestroy": true,
					"bLengthChange": false,
					"oLanguage": {
						"sInfo":          "Erregistroak erakusten _START_-tik _END_-ra  _TOTAL_ erregistroko guztizkotik",
						"sInfoThousands":  ",",
						"oPaginate": {
							"sFirst":    "Lehenengoa",
							"sLast":    "Azkena",
							"sNext":    "Hurrengoa",
							"sPrevious": "Aurrekoa"
						}
						
					}
				} );
			}
		
		}		
	}
	
	 $(document).ajaxStart(function () { 	 
		 mostrarLoader();
     });  
	 
	 $(document).ajaxStop(function () {  
		 ocultarLoader();
     }); 
	 
	 function mostrarLoader() {
		 $("#loading-overlay").append("<img src='./images/loader.gif' class='loader_img'/>")
		 $("#loading-overlay").show();
	 }
	 
	 function ocultarLoader(){
		 $("#loading-overlay").hide();
		 $("#loader_div img:last-child").remove();
	 }
