var numeroIntento = 1;
var hiddenParent = window.parent.parent.varHidden; //Comunicacón con frame para resolver ejercicio
var hiddenParentFlagCerrarCorrecta = window.parent.parent.flagCerrarCorrecta; //Comunicacón con frame para resolver ejercicio
function enviar(){
	$(".imgFeed").attr("src","https://desarrolloadaptatin.blob.core.windows.net/feedbacksimg/PataFeedBack_00004.png");	
	var patron = /([0-9])/g;
	var he1 = $("#spanFeedBack").css('height');
	var he2 = $("#bubble").css('height');
	
	var wi1 = $("#spanFeedBack").css('width');
	var wi2 = $("#bubble").css('width');

	if(parseInt(he1) > parseInt(he2)){
		$("#bubble").css('height','100%');	
		$("#spanFeedBack").css('font-size','110%');	
	}else{
		$("#bubble").css('height','110px');	
		$("#spanFeedBack").css('font-size','150%');
	}	

	var fechaTerminoIntento = new Date();
	var vercionEjercicio = window.location.href.substring(window.location.href.search(idEjercicio)+(String(idEjercicio).length+1),window.location.href.search(".html"));
	
	Date.prototype.yyyymmdd = function() {
	  var mm = this.getMonth() + 1; // getMonth() is zero-based
	  var dd = this.getDate();

	  return [this.getFullYear(),
			  (mm>9 ? '' : '0') + mm,
			  (dd>9 ? '' : '0') + dd
			 ].join('-');
	};

	//Oculta btn Respondar para no enviar otra petición
    $("#imagenBotonRespuesta").css("visibility","hidden");
	if($("#spanFeedBack").text() == "Respuesta Correcta"){
		$(".imgFeed").attr("src","https://desarrolloadaptatin.blob.core.windows.net/feedbacksimg/PataFeedBack_00002.png");	
		//EJERCICIO CORRECTO
		$("#imagenBotonRespuesta").css("visibility","visible");
		$("#bubble").css("text-align","center");	
		$("#imagenBotonRespuesta").parent().css("background-color","#3CB371");
		$("#imagenBotonRespuesta").parent().html('<img align="left" id="imagenBotonRespuesta" src="https://desarrolloadaptatin.blob.core.windows.net/iconosimg/botones/ok2.png" width="50px" height="50px" style="cursor:pointer;z-index:999;margin-left:30px;" onclick="siguiente()">');
	
	}else if(numeroIntento == 2 && $("#spanFeedBack").text() != "Respuesta Correcta"){
		$(".imgFeed").attr("src","https://desarrolloadaptatin.blob.core.windows.net/feedbacksimg/PataFeedBack_00005.png");	
		 $("#divGeneralFeed").hide();
		//GLOSA
		/*console.log("entre GLOSA");
		$("#divGeneralFeed").show();
		$("#divGeneralFeed").css('height', '100%');
		$("#divGeneralFeed").css("margin-top","2%");	
		console.log(glosa);	
		$("#spanFeedBack").text(glosa);
		$("#spanFeedBack").css('font-size','147%');		
		$(".div1Feed").css("top","5%");
		$("#bubble").css("width","70%");
		$("#bubble").css('z-index', '9999999');			
		if(glosa.length > 200){
			$("#bubble").css('height', "70%");
		}else{
			$("#bubble").css('height', "35%");
		}
		$("#imagenBotonRespuesta").parent().html('<img align="right" id="imagenBotonRespuesta" src="https://desarrolloadaptatin.blob.core.windows.net/iconosimg/botones/Siguiente_Generico" style="cursor:pointer;z-index:999;" onclick="sgteGlosa()">');
		$("#imagenBotonRespuesta").css("visibility","hidden");
		$(".btnFeedBackCerrar").attr("onClick","cerrarFeedGlosa();");//Btn cerrar feedback segundo error.	
	
		/*Glosa con más contenido
		if($("#spanFeedBack").children().length >= 1){
			if($("#spanFeedBack").children()[0].id == "idDivImageCont1"){
				var hijoConImagen = $("#spanFeedBack").children()[0];
				$("#spanFeedBack").css("padding","10px");
				$(hijoConImagen).removeAttr("style");
				$(hijoConImagen).attr("style","position: absolute; left: 15%;padding: 10px;");
			}else{
				$("#spanFeedBack").css("margin-top","-22px");
				$("#bubble").css("height","95%");			
			}

			
		}*/
		
	}
	var envioIntento = JSON.stringify({ "numeroIntento":numeroIntento, "glosa": glosa, "text": $("#spanFeedBack").text() });
	
	/*----Comunicacion de frame a página padre----*/
		$(hiddenParent).val(envioIntento).trigger('change');
	/*--------------------------------------------*/
	numeroIntento++;
	//$(':input').val('');
}

function validaNumero(elEvento){ 
		var evento = window.event || elEvento;
		var teclaPresionada = String.fromCharCode(evento.charCode);
		var soloFlechas = evento.charCode;
		if(soloFlechas == 37 || soloFlechas == 38 || soloFlechas == 39 || soloFlechas == 40){
			return false;
		}
		var soloNumero = new RegExp(/[0-9]/g);
		if(!soloNumero.test(teclaPresionada) || $(elEvento).val().length > 8){
			evento.preventDefault();
		}		
	}

	function validaFormato(elemento){ 
		var sinEspacios = $(elemento).val().replace(/ /g,"");
		var array = sinEspacios.split("");
		var res = "";		
		
		if(sinEspacios.length <= 3){
			$(elemento).val(sinEspacios);
			return false;
		}
		
		if(sinEspacios.length == 5){
			$(array).each(function(i){
				if(i == 2){
					res += " "+this;
				}else{
					res += this;
				}
			});
			$(elemento).val(res);
			return false;
		}
		if(sinEspacios.length == 6){
			$(array).each(function(i){
				if(i == 3){
					res += " "+this;
				}else{
					res += this;
				}
			});
			$(elemento).val(res);
			return false;
		}		
		
		if(sinEspacios.length == 4){
			$(array).each(function(i){
				if(i == 1){
					res += " "+this;
				}else{
					res += this;
				}
			});
			$(elemento).val(res);
			return false;
		}			
				
		if(sinEspacios.length == 7){
			$(array).each(function(i){
				if(i == 1 || i == 4){
					res += " "+this;
				}else{
					res += this;
				}
			});
			$(elemento).val(res);
			return false;
		}		
	}	
	
	function cerrarFeed(){
		$("#divGeneralFeed").hide();
		$("#imagenBotonRespuesta").css("visibility","visible");	
		if($("#spanFeedBack").text() == "Respuesta Correcta"){
			$(hiddenParentFlagCerrarCorrecta).val("flag").trigger('change');
		}		
	}
	
	function cerrarFeedGlosa(){
		$("#divGeneralFeed").hide();
	}
	
	function siguiente(){

	}
	
	function sgteGlosa(){
		$("#imagenBotonRespuesta").css("visibility","hidden");	
	}

/*---------VALIDACIÓN INGRESO A EJERCICIO--------*/

	document.addEventListener('contextmenu', event => event.preventDefault());

	$(document).keydown(function(event){ // previene f12
			if(event.keyCode==123){
				return false;
			}
			else if(event.ctrlKey && event.shiftKey && event.keyCode==73){        
				return false;  //previene ctrl+shift+i
			}
			else if(event.ctrlKey && event.keyCode==85){        
				return false;  //previene control u
			}
			else if(event.ctrlKey && event.keyCode==67){        
				return false;  //previene control c
			}
			else if(event.ctrlKey && event.keyCode==74){        
				return false;  //previene control j
			}
			else if(event.shiftKey && event.keyCode==123){        
				return false;  //previene shift+f12 (firefox)
			}
			else if(event.ctrlKey && event.shiftKey && event.keyCode==81){        
				return false;  //previene contro+shift+q (firefox)
			}
			else if(event.shiftKey && event.keyCode==118){        
				return false;  //previene shift+f7 (firefox)
			}	
			else if(event.ctrlKey && event.shiftKey && event.keyCode==75){        
				return false;  //previene ctrl+shift+k (firefox)
			}	
			else if(event.ctrlKey && event.shiftKey && event.keyCode==74){        
				return false;  //previene ctrl+shift+j (firefox)
			}	
			else if(event.ctrlKey && event.shiftKey && event.keyCode==83){        
				return false;  //previene ctrl+shift+s (firefox)
			}	
			else if(event.ctrlKey && event.shiftKey && event.keyCode==67){        
				return false;  //previene ctrl+shift+c (firefox)
			}		
			else if(event.keyCode==27){        
				return false;  //previene escape(Opera)
			}
	});	
		
/*---------------FIN VALIDACIÓN INGRESO  ---------------------*/	

var footer = $("#imagenBotonRespuesta").parent();

$( document ).ready(function() {

	//Sin contenedor no se puede visualizar el ejercicio y se elimina el script
	/*if(hiddenParent == undefined){ 
		$("#divCreacionHtml").remove();
		var x = document.getElementsByTagName("SCRIPT");
		$(x).each(function(){
			if($(this).text().search("glosa") != -1){
				$(this).remove();
			}
		});
	}*/
    /*---Add Estilo a footer y botón consulta---*/
		/*
		$(footer).css("padding",".75rem")
		$(footer).css("background","#FAEDC3")
		$(footer).css("border-top","4px solid #EE4223")
		$(footer).prepend("<div id='consulta' style=\"position:relative;left:-370px;content: '';display: inline-block;vertical-align: middle;width: 42px;height: 42px;border-radius: 42px;margin-right: .5rem;background-color: #fff;background-repeat: no-repeat;background-position: 50% 50%;background-size: 60%;background-image: url('https://desarrolloadaptatin.blob.core.windows.net:443/iconosimg/botones/btn_consulta.svg');border: 2px solid #2E358F; cursor:pointer;\"><span style='position:absolute;top:10px;left:50px;font-size:120%;'>Consulta</span></div>");
		*/
	/*-- Fin Add Estilo a footer y botón consulta*/
	
	$(".glyphicon-remove-circle").removeAttr("style");
    $(".glyphicon-remove-circle").css("font-size","x-large");
	$("body").css("height","551px");
	$("body").css("width","980px");
	$("#divCreacionHtml").css("width","960px");
	$("#divCreacionHtml").css("height","541px");
	
	if($(".labelGrupoRdo").length > 0){
		$("#divCreacionHtml").find(".labelGrupoRdo").each(function(i){	
			if(i == 0) 	$(this).text("A. "+$(this).text());
			if(i == 1) 	$(this).text("B. "+$(this).text());
			if(i == 2) 	$(this).text("C. "+$(this).text());
			if(i == 3) 	$(this).text("D. "+$(this).text());
		});	
	}
	
	if($("#divGeneralFeed").attr("posicion") == "derecha"){		
		$("#feedFlecha").removeClass("feedFlecha");	
		$("#feedFlecha").addClass("feedFlechaAbajo");	
		$("#divGeneralFeed").css("margin-top","25%"); 
		$("#divGeneralFeed").css("margin-left","37%");
		$("#bubble").css("width","25%");
		$("#bubble").css("margin-left","37%");
		$("#bubble").css("top","-78%");		
		$(".imgFeed").css("margin-left","220%");		
	}
	if($("#divGeneralFeed").attr("posicion") == "izquierda"){
		$("#feedFlecha").removeClass("feedFlecha");	
		$("#feedFlecha").addClass("feedFlechaAbajo");	
		$("#divGeneralFeed").css("margin-top","30%"); 
		$("#divGeneralFeed").css("margin-left","-5%");
		$("#bubble").css("width","25%");
		$("#bubble").css("margin-left","7%");
		$("#bubble").css("top","-78%");
	}
	if($("#divGeneralFeed").attr("posicion") == "abajo"){
		$("#bubble").css("height","100px");
		$("#divGeneralFeed").css("margin-top","32%");			
		$("#feedFlecha").css("top","40px");			
		$("#bubble").css("top","30px");			
		$("#bubble").css("width","50%");					
	}	
	
});

function cambio(elemento){
	numeroIntento = $(elemento).val();
}

function selInput(){
	
}

function selecCbo(){
	
}