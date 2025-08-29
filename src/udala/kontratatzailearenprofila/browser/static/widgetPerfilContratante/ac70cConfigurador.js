// Configurador Widget Expedientes v1.0 [2021-01-13]
C = {
	txt_codigo_variables: '',
	txt_codigo_final: '',
	variables: {},
	variables_defecto: {},
	idioma:'',
	iniciar: function() {

		//Cargamos las variables por defecto.
		C.cargar_variables_defecto();
		//Cogemos los valores elegidos por URL.
		C.coger_variables_URL();
		document.getElementById('probar').style.visibility = 'hidden';
		document.getElementById('actualizar').style.visibility = 'hidden';

		removeEvent(document.getElementById('actualizar'), 'click', C.disparar);
		addEvent(document.getElementById('actualizar'), 'click', C.disparar);

		//cargamos el widget y rellenamos el text del c�digo
		C.carga_widget();

		C.cargar_variables_inicio();
		C.genera_codigo_variables(C.txt_codigo_variables);

		eval ('C.variables = '+C.txt_codigo_variables);

		for (var k in C.variables) { if (C.variables_defecto[k]) { C.variables_defecto[k] = C.variables[k]; } }

	},


	cambiar_idioma: function() {
		C.variables['idioma'] = document.getElementById('idioma').value;
		C.actualizar_configurador(true);
	},

	cambiar_poder: function() {
		C.variables['poder'] = document.getElementById('poder').value;
		C.actualizar_configurador(true);
	},
	cambiar_titulo: function() {
		C.variables['titulo'] = document.getElementById('titulo').value;
		C.actualizar_configurador(true);
	},
	cambiar_titulo: function() {
		C.variables['tipoInformacion'] = document.getElementById('tipoInformacion').value;
		C.actualizar_configurador(true);
	},



	actualizar_configurador: function(bl_carga_widget) {
		C.genera_codigo_variables(C.variables);
		if (bl_carga_widget) {C.carga_widget()};

	},
	genera_codigo_variables: function(obj_variables) {
		C.txt_codigo_variables = '{\n';
		for (var k in obj_variables) {
			C.txt_codigo_variables += '\t'+'"'+k+'"'+' : '+'"'+obj_variables[k]+'"'+','+'\n';
		}
		/*Quitamos la ultima coma*/
		C.txt_codigo_variables = C.txt_codigo_variables.substr(0,C.txt_codigo_variables.lastIndexOf(','));
		C.txt_codigo_variables += '\n}\n';
	},
	genera_codigo_final: function() {
		C.txt_codigo_final = '<script src="++plone++udala.kontratatzailearenprofila/widgetPerfilContratante/ac70cExpedientes.js" type="text/javascript">\n';
		C.txt_codigo_final += C.txt_codigo_variables;
		C.txt_codigo_final += '</script>\n';
	},

	carga_widget: function() {


		if(document.getElementById('jswidget').childNodes[0] != undefined){
			document.getElementById('jswidget').removeChild(document.getElementById('jswidget').childNodes[0]);
		}


		var j = document.createElement("script");
		j.type = "text/javascript";
		j.src = '++plone++udala.kontratatzailearenprofila/widgetPerfilContratante/ac70cExpedientes.js';
		j.text = C.txt_codigo_variables;

		document.getElementById('jswidget').appendChild(j);


	},

	coger_variables_URL: function () {
		var Url = location.href;
		Url = Url.replace(/.*\?(.*?)/,"$1");
		ar_variables = Url.split ("&");
		if (ar_variables.length>0) {
			var txt_codigo_variables = '{\n';
			for (i = 0; i < ar_variables.length; i++) {
				Separ = ar_variables[i].split("=");
				if ((C.variables_defecto[Separ[0]]) && (C.variables_defecto[Separ[0]] != Separ[1])) {
					var ultima = (i==(ar_variables.length-1));
					if (ultima==true) {
						txt_codigo_variables += '\t'+'"'+Separ[0]+'"'+' : '+'"'+Separ[1]+'"'+'\n';
					} else {
						txt_codigo_variables += '\t'+'"'+Separ[0]+'"'+' : '+'"'+Separ[1]+'"'+','+'\n';
					}
				}
			}
			txt_codigo_variables += '}\n';
			C.txt_codigo_variables = txt_codigo_variables;
		}
	},
	disparar: function () {
		document.getElementById('probar').click();
	},
	cargar_variables_defecto : function() {

		C.variables_defecto = {

			"idioma" : document.getElementById('idioma').value,
			"titulo" : document.getElementById('titulo').value,
			"poder" : document.getElementById('poder').value,
			"tipoInformacion" : document.getElementById('tipoInformacion').value

		};
	},
	cargar_variables_inicio : function() {
		C.txt_codigo_variables = {
			"idioma" : document.getElementById('idioma').value,
			"titulo" : document.getElementById('titulo').value,
			"poder" : document.getElementById('poder').value,
			"tipoInformacion" : document.getElementById('tipoInformacion').value
		};
	}
}



function removeEvent(obj, evType, fn){
 if (obj.removeEventListener){
   obj.addEventListener(evType, fn, false);
   return true;
 } else if (obj.detachEvent){
   var r = obj.detachEvent("on"+evType, fn);
   return r;
 } else {
   return false;
 }
}

function addEvent(obj, evType, fn){
 if (obj.addEventListener){
   obj.addEventListener(evType, fn, false);
   return true;
 } else if (obj.attachEvent){
   var r = obj.attachEvent("on"+evType, fn);
   return r;
 } else {
   return false;
 }
}
addEvent(window, 'load', C.iniciar);
