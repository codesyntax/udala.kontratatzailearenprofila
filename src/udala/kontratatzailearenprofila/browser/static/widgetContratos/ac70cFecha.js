
function formatearFecha_es(fecha)
{

	fecha =fecha.replace("Jan",'Enero');
	fecha =fecha.replace("Feb",'Febrero');
	fecha =fecha.replace("Mar",'Marzo');
	fecha =fecha.replace("Apr",'Abril');
	fecha =fecha.replace("May",'Mayo');
	fecha =fecha.replace("Jun",'Junio');
	fecha =fecha.replace("Jul",'Julio');
	fecha =fecha.replace("Aug",'Agosto');
	fecha =fecha.replace("Sep",'Septiembre');
	fecha =fecha.replace("Oct",'Octubre');
	fecha =fecha.replace("Nov",'Noviembre');
	fecha =fecha.replace("Dec",'Diciembre');
	
	fecha =fecha.replace("Fri",'Viernes');
	//fecha =fecha.replace("Sat",'Sábado');
	fecha =fecha.replace("Sat",'S\u00E1bado');
	fecha =fecha.replace("Mon",'Lunes');
	fecha =fecha.replace("Tue",'Martes');
	fecha =fecha.replace("Wed",'Mi\u00E9rcoles');
	fecha =fecha.replace("Thu",'Jueves');
	fecha =fecha.replace("Sun",'Domingo');
	
	return fecha;
}

function formatearFecha_eu(fecha)
{
	
	fecha = transformarFechaEuskera(fecha);
	
	fecha =fecha.replace("Jan",'Urtarrila');
	fecha =fecha.replace("Feb",'Otsaila');
	fecha =fecha.replace("Mar",'Martxoa');
	fecha =fecha.replace("Apr",'Apirila');
	fecha =fecha.replace("May",'Maiatza');
	fecha =fecha.replace("Jun",'Ekaina');
	fecha =fecha.replace("Jul",'Uztaila');
	fecha =fecha.replace("Aug",'Abuztua');
	fecha =fecha.replace("Sep",'Iraila');
	fecha =fecha.replace("Oct",'Urria');
	fecha =fecha.replace("Nov",'Azaroa');
	fecha =fecha.replace("Dec",'Abendua');
	
	fecha =fecha.replace("Fri",'Ostirala');
	fecha =fecha.replace("Sat",'Larunbata');
	fecha =fecha.replace("Sun",'Igandea');
	fecha =fecha.replace("Mon",'Astelehena');
	fecha =fecha.replace("Tue",'Asteartea');
	fecha =fecha.replace("Wed",'Asteazkena');
	fecha =fecha.replace("Thu",'Osteguna');
	
	return fecha;
}
function formatearFechaDe_es_A_eu(fecha)
{
	
	fecha = transformarFechaEuskera(fecha);
	
	fecha =fecha.replace("ene",'Urtarrila');
	fecha =fecha.replace("feb",'Otsaila');
	fecha =fecha.replace("mar",'Martxoa');
	fecha =fecha.replace("abr",'Apirila');
	fecha =fecha.replace("may",'Maiatza');
	fecha =fecha.replace("jun",'Ekaina');
	fecha =fecha.replace("jul",'Uztaila');
	fecha =fecha.replace("ago",'Abuztua');
	fecha =fecha.replace("sep",'Iraila');
	fecha =fecha.replace("oct",'Urria');
	fecha =fecha.replace("nov",'Azaroa');
	fecha =fecha.replace("dic",'Abendua');
	
	fecha =fecha.replace("vie",'Ostirala');
	fecha =fecha.replace("sab",'Larunbata');
	fecha =fecha.replace("dom",'Igandea');
	fecha =fecha.replace("lun",'Astelehena');
	fecha =fecha.replace("mar",'Asteartea');
	fecha =fecha.replace("mie",'Asteazkena');
	fecha =fecha.replace("jue",'Osteguna');
	
	return fecha;
}

function transformarFechaEuskera(fecha) {

	var fechaArray = fecha.split(" ");
	
	if (fechaArray.length > 3) {
		var dia = fechaArray[1];
		fechaArray[1] = fechaArray[3];
		fechaArray[3] = dia;
		fecha = fechaArray[0] + " " + fechaArray[1]+ ".eko " + fechaArray[2]+ "k " + fechaArray[3];
	}
	
	return fecha;
}
