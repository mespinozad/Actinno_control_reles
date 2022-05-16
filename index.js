//const { StringDecoder } = require('string_decoder');
//var funciones = require('./MODBUS');
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const puerto = 81;
//const Gpio = require('pigpio').Gpio;
var estado_R1 = "off";
var estado_R2 = "off";
var estado_R3 = "off";
var estado_R4 = "off";



/*

	{
		{
			"id": 1,
			"accion": "consulta"
		},
		{
			"id": 2,
			"accion": "encendido"
		},
		{
			"id": 3,
			"accion": "apagado"
		}
	}
 
*/




app.post('/', function (req, res2) {

	const salida_1 = new Gpio(2, {mode: Gpio.OUTPUT});
	const salida_2 = new Gpio(3, {mode: Gpio.OUTPUT});
	const salida_3 = new Gpio(4, {mode: Gpio.OUTPUT});
	const salida_4 = new Gpio(17, {mode: Gpio.OUTPUT});
	var armado = '{"Respuestas":['


	console.log(req.body.data);
	console.log(req.body.consultas);
	console.log(req.body.control);

    for(var attributename in req.body.data){
	    console.log("ID de consulta "+req.body.data[attributename]["id"]);
	    //console.log(attributename+": "+req.body.data[attributename]["id"]);
	    console.log("accion: "+req.body.data[attributename]["accion"]);

	    if (req.body.data[attributename]["accion"] == "consulta" )
	    {
		    console.log("consulta id : "+req.body.data[attributename]["id"]);

		    if(parseInt(req.body.data[attributename]["id"]) == 1){
		    	armado+= '{"id": 1,';
		    	armado+= '"respuesta": "'+estado_R1+'"}';
		    	armado+=",";
		    }else if(parseInt(req.body.data[attributename]["id"]) == 2){
		    	armado+= '{"id": 2,';
		    	armado+= '"respuesta": "'+estado_R2+'"}';
		    	armado+=",";

		    }else if(parseInt(req.body.data[attributename]["id"]) == 3){
		    	armado+= '{"id": 3,';
		    	armado+= '"respuesta": "'+estado_R3+'"}';
		    	armado+=",";

		    }else if(parseInt(req.body.data[attributename]["id"]) == 4){
		    	armado+= '{"id": 4,';
		    	armado+= '"respuesta": "'+estado_R4+'"}';
		    	armado+=",";

		    }
		    //armado+=",";
		}

	    if (req.body.data[attributename]["accion"] === "encendido" )
	    {
	    console.log("id de encendido es: "+req.body.data[attributename]["id"]);

		    if(parseInt(req.body.data[attributename]["id"]) == 1){
		    	salida_1.pwmWrite(0);
		    	estado_R1 = "on";
		    	armado+= '{"id": 1,';
		    	armado+= '"respuesta": "'+estado_R1+'"}';
		    	armado+=",";

		    }else if(parseInt(req.body.data[attributename]["id"]) == 2){
		    	salida_2.pwmWrite(0);
		    	estado_R2 = "on";
		    	armado+= '{"id": 2,';
		    	armado+= '"respuesta": "'+estado_R2+'"}';
		    	armado+=",";

		    }else if(parseInt(req.body.data[attributename]["id"]) == 3){
		    	salida_3.pwmWrite(0);
		    	estado_R3 = "on";
		    	armado+= '{"id": 3,';
		    	armado+= '"respuesta": "'+estado_R3+'"}';
		    	armado+=",";

		    }else if(parseInt(req.body.data[attributename]["id"]) == 4){
		    	salida_4.pwmWrite(0);
		    	estado_R4 = "on";
		    	armado+= '{"id": 4,';
		    	armado+= '"respuesta": "'+estado_R4+'"}';
		    	armado+=",";

		    }
		   //armado+=",";

	    }
	    if (req.body.data[attributename]["accion"] === "apagado" )
	    {
	    console.log("id de apagado es: "+req.body.data[attributename]["id"]);


		    if(parseInt(req.body.data[attributename]["id"]) == 1){
		    	salida_1.pwmWrite(255);
		    	estado_R1 = "off";
		    	armado+= '{"id": 1,';
		    	armado+= '"respuesta": "'+estado_R1+'"}';
		    	armado+=",";

		    }else if(parseInt(req.body.data[attributename]["id"]) == 2){
		    	salida_2.pwmWrite(255);
		    	estado_R2 = "off";
		    	armado+= '{"id": 2,';
		    	armado+= '"respuesta": "'+estado_R2+'"}';
		    	armado+=",";

		    }else if(parseInt(req.body.data[attributename]["id"]) == 3){
		    	salida_3.pwmWrite(255);
		    	estado_R3 = "off";
		    	armado+= '{"id": 3,';
		    	armado+= '"respuesta": "'+estado_R3+'"}';
		    	armado+=",";

		    }else if(parseInt(req.body.data[attributename]["id"]) == 4){
		    	salida_4.pwmWrite(255);
		    	estado_R4 = "off";
		    	armado+= '{"id": 4,';
		    	armado+= '"respuesta": "'+estado_R4+'"}';
		    	armado+=",";

		    }
		    //armado+=",";
	    }
	

	
    

/*
    for(var attributename in req.body.control){
    console.log("Control");
    console.log(attributename+": "+req.body.control[attributename]["id"]);
    console.log(req.body.control[attributename]["accion"]);
    }

*/
	//var jsonString = JSON.parse(req.body.consultparse(armado);
  		

	}

	var armado_c = armado.substring(0, armado.length - 1);
  	armado_c += "]}"
	res2.send(armado_c);

	//toma_data();
 



  
}); // post

app.listen(puerto);
console.log('Server started at http://localhost:'+puerto);



