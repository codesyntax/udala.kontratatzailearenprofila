jQuery(function($){
	$(document).ready(function(){
		
		// LOCAL
		//var urlPagina ='http://desarrollo.jakina.ejiedes.net:7001/';
		//DESARROLLO 
		//var urlPagina ='https://www.contratacion.euskadi.ejiedes.eus/';
		//PRUEBAS
		//var urlPagina ='https://www.contratacion.euskadi.ejiepru.eus/';
		//PRODUCCION 	
		var urlPagina ='https://www.contratacion.euskadi.eus/';
		
		jQuery.fn.extend({
		param: function( a ) { 
			var s = []; 
	 
			// If an array was passed in, assume that it is an array 
			// of form elements 
			if ( a.constructor == Array || a.jquery ){
				// Serialize the form elements 
				jQuery.each( a, function(){ 
					s.push(unescape(encodeURIComponent(escape(this.name))) + "=" + unescape(encodeURIComponent(escape(this.value)))); 
				}); 
			} 
			// Otherwise, assume that it's an object of key/value pairs 
			else{ 
				// Serialize the key/values 
				for ( var j in a ) 
					// If the value is an array then the key names need to be repeated 
					if ( a[j] && a[j].constructor == Array ) 
						jQuery.each( a[j], function(){ 
							s.push(unescape(encodeURIComponent(escape(j)) + "=" + encodeURIComponent(escape(this)))); 
						}); 
					else 
						s.push(unescape(encodeURIComponent(escape(j)) + "=" + encodeURIComponent(escape(a[j])))); 
			} 
			// Return the resulting serialization 
			return s.join("&").replace(/ /g, "+"); 
			},

			serialize: function() { 
				return this.param(this.serializeArray()); 
			}
		}); 
	  
		var idCaptcha = (new Date).getTime();
		$("#captcha").attr("src", urlPagina + 'ac70cPublicidadWar/captcha?idCaptcha=' + idCaptcha +'&R01HNoPortal=true');
		$("#idCaptcha").val(idCaptcha);

		$("#btnAlta").on("click", function(){
			if (camposAltaObligatorios()){						
				let validacionCaptcha = false;
				let id = $('#idCaptcha').val();
				let txt = $('#txtCaptcha').val();
				let params = id +','+ txt;
				
				$.get(urlPagina + 'ac70cPublicidadWar/suscripcionPoder/captcha/' + params)
				.done(function(data) {
					validacionCaptcha = JSON.parse(data.toLowerCase());				
					if (validacionCaptcha){
						continuarAlta();
					}else{
						$("#divErrores").attr("class","erroresSuscripcion");
						$("#divErrores").html(cabeceraError + "<ul id='ulErrores'><li>" + errorCaptcha + "</li></ul>");
					}
				})
				.fail(function() {
					$("#divErrores").attr("class","erroresSuscripcion");
					$("#divErrores").html(cabeceraError + "<ul id='ulErrores'><li>" + errorCaptcha + "</li></ul>");
				});
			}else{
				$("#divErrores").attr("class","erroresSuscripcion");
				$("#divErrores").html(cabeceraError + "<ul id='ulErrores'><li>" + errorDatosObligatorios + "</li></ul>");
			}
		});	
		
		function camposAltaObligatorios() {
			let txt = $('#txtCaptcha').val();
			if (txt.trim() != ""){
				let email = $('#emailAlta').val();
				if (email.trim() != ""){
					return true;
				}else{
					return false;
				}
			}else{
				return false;
			}
		}	
		
		function continuarAlta() {
			if (validarEmail($('#emailAlta').val())){
				if (comprobarTelefono()){
					
					let idPoder = $('#idPoder').val().toLowerCase().trim();
					let email = $('#emailAlta').val().toLowerCase().trim();				
					let tipoSuscripcion = '';
					if ($('#tipoS1').prop("checked")){					
						tipoSuscripcion = $('#tipoS1').val().toLowerCase().trim();
					}else if ($('#tipoS2').prop("checked")){					
						tipoSuscripcion = $('#tipoS2').val().toLowerCase().trim();
					}				
					let nombre = $('#nombre').val().toLowerCase().trim();				
					let empresa = $('#empresa').val().toLowerCase().trim();				
					let telefono = $('#telefono').val().toLowerCase().trim();				
					let params = idPoder + ',' + email + ','+ tipoSuscripcion + ',' + nombre + ',' + empresa + ','+ telefono;				
									
					$.post(urlPagina + 'ac70cPublicidadWar/suscripcionPoder/altaWidget/' + params + '/')
					.done(function(data) {					
						let altaWidgetOK = JSON.parse(data.toLowerCase());
						if (altaWidgetOK){
							$("#widget_poderadjudicadorform").attr('style','display:none');
							$("#widget_poderadjudicadorerror").attr('style',"display:none");
							$("#widget_poderadjudicadorconfirm").attr('class',"visible");	
						}else{
							$("#widget_poderadjudicadorform").attr('style','display:none');
							$("#widget_poderadjudicadorerror").attr('style',"display:''");
							$("#widget_poderadjudicadorerror").attr('class',"visible");	
						}				
					})
					.fail(function() {
						$("#widget_poderadjudicadorform").attr('style','display:none');
						$("#widget_poderadjudicadorerror").attr('style',"display:''");
						$("#widget_poderadjudicadorerror").attr('class',"visible");	
					});				
					
				}else{
					$("#divErrores").attr("class","erroresSuscripcion");
					$("#divErrores").html(cabeceraError + "<ul id='ulErrores'><li>" + errorTelefonoFormato + "</li></ul>");
				}
			}else{
				$("#divErrores").attr("class","erroresSuscripcion");
				$("#divErrores").html(cabeceraError + "<ul id='ulErrores'><li>" + errorMailFormato + "</li></ul>");
			}
		}
		
		$("#btnBaja").on("click", function(){
			if (validarEmail($('#emailBaja').val())){
				let email = $('#emailBaja').val().toLowerCase().trim();
				let idPoder = $('#idPoderCancelar').val().toLowerCase().trim();			
				let params = email + ',' + idPoder;
							
				$.post(urlPagina + 'ac70cPublicidadWar/suscripcionPoder/bajaWidget/' + params + '/')
				.done(function(data) {					
					let bajaWidgetOK = JSON.parse(data.toLowerCase());
					if (bajaWidgetOK){
						$("#widget_poderadjudicadorform").attr('style','display:none');
						$("#widget_bajapoderadjudicadorerror").attr('style',"display:none");
						$("#widget_bajapoderadjudicadorconfirm").attr('class',"visible");	
					}else{
						$("#widget_poderadjudicadorform").attr('style','display:none');
						$("#widget_bajapoderadjudicadorerror").attr('style',"display:''");
						$("#widget_bajapoderadjudicadorerror").attr('class',"visible");	
					}				
				})
				.fail(function() {
					$("#widget_poderadjudicadorform").attr('style','display:none');
					$("#widget_bajapoderadjudicadorerror").attr('style',"display:''");
					$("#widget_bajapoderadjudicadorerror").attr('class',"visible");	
				});						
			}else{
				$("#divErrores").attr("class","erroresSuscripcion");
				$("#divErrores").html(cabeceraError + "<ul id='ulErrores'><li>" + errorMailFormato + "</li></ul>");
			}
		});

		function comprobarTelefono(){
			let tlf = $('#telefono').val();
			if (tlf != ""){
				return validarTelefonoFax(tlf);
			}else{
				// No es un dato obligatorio
				return true;
			}
		}	
		
		function validarEmail(value) {
			// ^[A-Za-z0-9!#$%&''*+\/=?_-]+(\.[A-Za-z0-9!#$%&''*+\/=?_-]+)*@([A-Za-z0-9]([A-Za-z0-9_-]*[A-Za-z0-9])?\.)+([A-Za-z]{2,})$
			var pattern = new RegExp("\^\[A\-Za\-z0\-9\!#\$%&''\*\+\\\/\=\?_\-\]\+\(\\\.\[A\-Za\-z0\-9\!#\$%&''\*\+\\\/\=\?_\-\]\+\)\*@\(\[A\-Za\-z0\-9\]\(\[A\-Za\-z0\-9_\-\]\*\[A\-Za\-z0\-9\]\)\?\\\.\)\+\(\[A\-Za\-z\]\{2,\}\)\$");
			return pattern.test(value);
		}

		function validarTelefonoFax(value) {
			// ^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$
			var pattern = new RegExp("\^\[\+\]\*\[\(\]\{0,1\}\[0\-9\]\{1,3\}\[\)\]\{0,1\}\[\-\\s\\\.\/0\-9\]\*\$");
			if(value.length < 9){
				return false;
			}else{
				return pattern.test(value);
			}
		}	
	
	});
});