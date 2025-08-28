
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
	
	fecha =fecha.replace("Jan",'urtarrila');
	fecha =fecha.replace("Feb",'otsaila');
	fecha =fecha.replace("Mar",'martxoa');
	fecha =fecha.replace("Apr",'apirila');
	fecha =fecha.replace("May",'maiatza');
	fecha =fecha.replace("Jun",'ekaina');
	fecha =fecha.replace("Jul",'uztaila');
	fecha =fecha.replace("Aug",'abuztua');
	fecha =fecha.replace("Sep",'iraila');
	fecha =fecha.replace("Oct",'urria');
	fecha =fecha.replace("Nov",'azaroa');
	fecha =fecha.replace("Dec",'abendua');
	
	fecha =fecha.replace("Fri",'Ostirala');
	fecha =fecha.replace("Sat",'Larunbata');
	fecha =fecha.replace("Sun",'Igandea');
	fecha =fecha.replace("Mon",'Astelehena');
	fecha =fecha.replace("Tue",'Asteartea');
	fecha =fecha.replace("Wed",'Asteazkena');
	fecha =fecha.replace("Thu",'Osteguna');
	
	return fecha;
}

function transformarFechaEuskera(fecha) {

	var fechaArray = fecha.split(" ");
	
	if (fechaArray.length > 3) {
		var dia = fechaArray[1];
		fechaArray[1] = fechaArray[3];
		fechaArray[3] = dia;
		fecha = fechaArray[0] + " " + fechaArray[1]+ "(e)ko " + fechaArray[2]+ "k " + fechaArray[3];
	}
	
	return fecha;
}
