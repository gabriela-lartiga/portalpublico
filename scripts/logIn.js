/*-----------------------------------------Funciones de bloques-----------------------------------------*/

	document.addEventListener('contextmenu', event => event.preventDefault()); //Prevenir click derecho

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
/*-----------------------------------------Fin funciones de bloqueos-----------------------------------------*/	

function LogIn(){
	if($("#usuario").val() == "" || $("#password").val() == "" ) return false;
	//if($("#password").val().length <= 3 ){$("#password").val("");$("#password").attr("placeholder","Contraseña minima 4 caracteres");return false;} 
	
	$("#imgCargando").show();
	var dataSend = JSON.stringify({ "usuario" : $("#usuario").val(), "passusuario": $("#password").val()});
	
	$.ajax({
		url: "http://desarrolloadaptnodeback.azurewebsites.net/login",		
		data : JSON.parse(dataSend),						
		type: 'POST',
		dataType : "json",				
		success : function(result) {
			
			document.cookie = "adaptativamente="+String(result.token);
			document.cookie = "nombreUsuario="+String(result.nombre +" "+result.apellido);

				$.ajax({
					 url: "http://desarrolloadaptnodeback.azurewebsites.net/roles/",
					 headers:{"Authorization": getCookie("adaptativamente")},
					 type: "GET",
					 success: function(resultado) {			 
						if(resultado.length == 0){
							return false;
						}else{
							var rol = []
							$(resultado).each(function(i,v){
								rol.push(resultado[i].TIPOROLUSUARIO);
							});
							if(rol.length > 1){
								
								var html = '<div >';
									html +=		'<h6 style="color:#00a89c;margin-left:15px;">Tienes más de un Rol, elige como quieres navegar.</h6>';
									html +=		'<div style="margin-top:20px;margin-left:5px;">';
									html +=			'<select id="slcMultiRol" name="slcMultiRol" required="" style="border-radius:10px;width:180px;padding:0.5em;" class="form-select">';
									html +=				'<option value="0">Selecciona un Rol</option>';
									$(rol).each(function(i,v){
										html +=				'<option rol="'+resultado[i].IDROLUSUARIO+'" value="'+rol[i]+'">'+rol[i]+'</option>';							
									});
									html +=			'</select>';
									html +=		'</div>';
									html +=		'<div>';
									html +=			'<button onClick=btnElegir() class="button button--gradient-regular" style="position:relative;top:20px;left:160px;">';
									html +=				'<span class="button__text">Elegir</span>';
									html +=			'</button>';
									html +=		'</div>';
									html +=	'</div>';
									$("#multiRol").html(html);
									
								$.fancybox({						
									'type' : 'iframe',
									'content' : $("#multiRol"),
									'autoSize' : false,
									'width'   : 253,
									'height'  : 190,
									'scrolling' : 'no',
									'closeBtn': false,	
									afterClose : function(){
										$("#htmlRes").html("");
									},
									helpers : { 
										overlay : {closeClick: false}
									}
								});
								
							}else{
								//Un solo ROL
								if(resultado[0].TIPOROLUSUARIO == "Docente"){ 
									location.href = "./profesores/dashboard.html";
								}else if(resultado[0].TIPOROLUSUARIO == "Alumno"){
									location.href = "./alumno/dashboard-3.html?alumno="+resultado[0].IDROLUSUARIO;
								}else{
									alert("No esta hecho el sitio para"+resultado[0].TIPOROLUSUARIO);
								}
								
							}	
						}						
					 }
				  }).fail( function(e) {	
					$("#imgCargando").hide();					  
					$(e).each(function(i){							
						console.log(e.responseText);							
					});
				});				
		},
		}).fail( function(err) {	
			$("#imgCargando").hide();			
			console.log(err);
			$(err).each(function(i){							
				//console.log(err.responseText);	
				$("#password").val("");
				$("#password").attr("placeholder",JSON.parse(err.responseText).message);
				$("#password").focus();
				$("#labelPass").removeClass();
				$("#labelPass").addClass("form-control form-control--has-button form-control--filled form-control--invalid");

		});
	});	
}

function btnElegir(){	
	if($("#slcMultiRol").val() != 0){
		if($("#slcMultiRol").val() == "Docente"){ location.href = "./profesores/dashboard.html";}	
		if($("#slcMultiRol").val() == "Alumno"){ location.href = "./alumno/dashboard-3.html?alumno="+$("#slcMultiRol option:selected").attr("rol");}		
	}
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}