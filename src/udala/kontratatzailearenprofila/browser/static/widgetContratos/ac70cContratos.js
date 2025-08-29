// Licencia: http://creativecommons.org/licenses/by-sa/3.0/
// Basado en "Content Syndication with Case-Hardened JavaScript" (http://kentbrewster.com/case-hardened-javascript/) [http://kentbrewster.com/rights-and-permissions]

( function() {
	
	var idPoder =document.getElementById('poder').value;
	var idEntidad =document.getElementById('entidad').value;
	var idEstado =document.getElementById('estado').value;
	var idtipoContrato =document.getElementById('tipoContrato').value;
	var contratosMenores = document.getElementById('contratosMenores').value;
	var idioma = document.getElementById('idioma').value;
	
	// LOCAL
	//var urlPagina ='http://desarrollo.jakina.ejiedes.net:7001/';
	//DESARROLLO 
	//var urlPagina ='https://www.contratacion.euskadi.ejiedes.eus/';
	//PRUEBAS
	//var urlPagina ='https://www.contratacion.euskadi.ejiepru.eus/';
	//PRODUCCION 	
	var urlPagina ='https://www.contratacion.euskadi.eus/';
	var urlAgrupacion = 'ac70cPublicidadWar/serviciosWidgetREST/recuperarConfiguracion/?';
	var urlAplicacion = 'ac70cPublicidadWar/serviciosWidgetREST/recuperarContratos/?';
	
	var nombreOfuscado = '';
	for (var i = 0; i < 16; i++) {
		nombreOfuscado += String.fromCharCode(Math.floor(Math.random() * 26) + 97);
	}
	window[nombreOfuscado] = {};
	var $ = window[nombreOfuscado];
	
	//mostrarLoader();
	
	$.f = function() {
		 
		
		return {	
			/**
				URLs de acceso a los contratos
				la parte _at / _ul .... de la URL es al que indica que tipo de informaci�n se va a mostrar
				Extension tc:	devuelve todos los contratos
				************estado********************************
				Extension ce:	devuelve contratos en ejecucion
				Extension cf:	devuelve contratos finalizados
				************tipo contrato************************
				Extension o:	devuelve tipo contrato obras
				Extension se:	devuelve tipo contrato servicios
				Extension su:	devuelve tipo contrato suministros
				Extension ae: 	devuelve tipo contrato administrativos especiales
				Extension cop:	devuelve tipo contrato concesion de obra publica
				Extension gsp:	devuelve tipo contrato gestion de servicios publicos
				Extension cspsp: devuelve tipo contrato  colaboracion entre el sector publico y el privado
				Extension p:	devuelve tipo contrato privados
			**/
			
			runFunction : [],
			init : function(target) {
				var theScripts = document.getElementsByTagName('SCRIPT');
				for (var i = 0; i < theScripts.length; i++) {
					
					if (theScripts[i].src.indexOf("ac70cContratos.js") != -1) {
						$.a = {};
						if (theScripts[i].innerHTML) {
							
							$.a = $.f.parseJson(theScripts[i].innerHTML);
						}
						if ($.a.err) {
							alert($.f.traducir('param_mal'));//bad json!
						}
						
						$.f.cargarVariables();
						$.f.crearEstructuraGeneral();
						
						break;
					}
				}
				
			},
			parseJson : function(json) {
					
				this.parseJson.data = json;
				if ( typeof json !== 'string') {
					return {"err":"Parametrizacion del widget mal formada."};//trying to parse a non-string JSON object
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

				url_datos = 'tipoWidget=2&idioma='+idioma+'&idPoder='+idPoder+'&idEntidad='+idEntidad+'&estadoContrato='+idEstado+'&tipoContrato='+idtipoContrato+'&contratosMenores='+contratosMenores+'&R01HNoPortal=true';
				
				if (!$.f.runFunction) { 			
					$.f.runFunction = [];
				}

				var url = urlPagina + urlAgrupacion + url_datos;
				obtenerAgrupacion(url, "jswidget",$.w,$.a);

				var url = urlPagina + urlAplicacion + url_datos;
				cargarContratos(url, "jswidget",$.w,$.a);

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
					"poder" : document.getElementById('poder').value
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
				if ($.a.idioma=='eu') {
					return $.traducciones_eu[cadena];
				} else {
					return $.traducciones_es[cadena];
				}
			}
		};
	}();
	var thisScript = /^ac70cContratos.js$/;

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
 	//Cuando se carga la pagina por primera vez selecciono el primer elemento de la lista.		
 	function actualizar(){		
		if( $("#agrupacion").val()==3 && idEstado==""){
			idEstado="tc";
		}else if($("#agrupacion").val()==4 && idtipoContrato==""){
			idtipoContrato="o";
		}
	}

	function obtenerAgrupacion(url, id, window, literales){
		
		$.ajax({ 
			url: url,
			type: "GET",
			dataType: "json",
			async: false,			
			contentType: "application/json;charset=utf-8",
			success: function(html, status, xhr) {
			
				document.getElementById('numResult').value=html["numResult"];
				if(html["agrupacion"]==0){
					//Mensaje de widget sin configurar
					var idioma = literales.idioma;
					if (idioma == "es"){							
						location.href = "ac70cWidgetContratosSinConfigurarEs.html";
					}else{
						location.href = "ac70cWidgetContratosSinConfigurarEu.html";
					}
				}
				//Agrupacion por estado
				else if(html["agrupacion"]==3){
					document.getElementById('agrupacion').value=1;
					document.getElementById('agruEstado').style.display = 'block';
					document.getElementById('agruTipoContrato').style.display = 'none';
					document.getElementById('agruEstado').style.visibility = 'visible';
				}				
				//Agrupacion Por tipo de contrato
				else if(html["agrupacion"]==4){
					document.getElementById('agrupacion').value=2;
					document.getElementById('agruTipoContrato').style.display = 'block';
					document.getElementById('agruEstado').style.display = 'none';					
					document.getElementById('agruTipoContrato').style.visibility = 'visible';
				}			
			},
			error: function (xhr, ajaxOptions, thrownError) {
				alert("error " + thrownError);
			}
		});
	}

	function cargarContratos(url, id, window, literales){
		$.ajax({ 
			url: url,
			type: "GET",
			dataType: "json",
			async: false,			
			contentType: "application/json;charset=utf-8",
			success: function(html, status, xhr) {
				pintarTabla(html, window, literales);	
			},
			error: function (xhr, ajaxOptions, thrownError) {
				alert("error " + thrownError);
			}
		});
	}

	function pintarTabla (r,window, literales) {
		/** cambiar a url de produccion para entrega**/
		//LOCAL var urlPagina ='http://localhost:7001'
		//DESARROLLO var urlPagina ='http://www.contratacion.euskadi.ejiedes.eus
		//PRODUCCION  Antigua --> 'http://www.contratacion.euskadi.eus';
		var urlPaginaLogo ='https://www.contratacion.euskadi.eus/w32-kpehome/';
		/** cambiar a url de produccion para entrega**/
		
		var idioma = literales.idioma;
			
		var numMaxRegistros = '';
		
		var tit = document.createElement('h4');
		
		tit.innerHTML = literales.titulo;
		window.appendChild(tit);
					
		var tablaWidget = document.createElement('table');
		tablaWidget.id = "tablaWidget";
		var cab = document.createElement('thead');
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
		
		var cuerpo = document.createElement('tbody');
		
		var lista = r.lista;													
		if (lista == null || (lista != null && lista.length == 0)){								
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
			
			if (idioma == "es")
			{			
				numMaxRegistros = '* El n\u00famero de resultados est\u00E1 limitado a ' + r.numMaxRegistros + ' elementos';
			} else {			
				numMaxRegistros = '* Emaitz kopurua ' + r.numMaxRegistros + ' elementuetara mugatua dago';
			}
			
		}
							
		var tabla = document.createElement('table');
		tabla.id = "tablaImagen";
		var cuerpo2 = document.createElement('tbody');
		var fila = document.createElement('tr');
		var columna1 = document.createElement('td');
		var columna2 = document.createElement('td');
		var imagen = document.createElement('img');
					
		var a1 = document.createElement('A');

					
		a1.href = urlPaginaLogo+literales.idioma;
		a1.target = '_blank';
		
		var a1 = document.createElement('A');
					

		a1.href = urlPaginaLogo+literales.idioma;
		a1.target = '_blank';
					
		imagen.src = 'w32-logo_contratacion.jpg';
		a1.appendChild(imagen);
		columna1.innerHTML = numMaxRegistros;
		
		columna1.style.width = '82%';
		columna1.style.border='none';
		columna1.style.background= '#ffffff';
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
							"sLast":    "�ltimo",
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
							"sLast":    "�ltimo",
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
		