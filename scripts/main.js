
var abreModulo = "";
    abreModulo=function(){
       var dondeEstoy = window.location.href;
            $.fancybox({                        
                'type'      : 'iframe',
                'href'   : "modalContacto.html?url="+dondeEstoy,
                'autoSize'  : true,
                'closeBtn'  : true,     
                afterClose  : function (n) {
                    //console.log(n);
                },
                /*  helpers : {
                    overlay : {closeClick: false}
                }*/
            }); 
    }
    //Agrega favicon.ico con logo
    $('head').append('<link rel="shortcut icon" href="images/logos/favicon.ico" type="image/x-icon">');
    $('head').append('<link rel="icon" href="images/logos/favicon.ico" type="image/x-icon">');
 
    $(".main-logo").attr("href","index.html");
    $(".cover-img").attr("href","index.html");

    $(".primary-nav").children().each(function(){
        if($(this).attr("title") == "Para profesores"){
            $(this).hide();

        }if($(this).attr("title") == "Para estudiantes"){
            $(this).attr("href","para-estudiantes.html");   

        }if($(this).attr("title") == "Adquirir"){
          //  $(this).attr("href","adquirir.html");   
          $(this).hide();

        }if($(this).attr("title") == "Blog"){
            $(this).hide();

        }if($(this).attr("title") == "Ingresar"){

        }                      
    });

    $( ".breadcrumbs a:first-child" ).attr("href","index.html");

// Elimina child drop down Acerca de adapt, y Elimina Ayuda y contacto
    $(".secondary-nav__list").children().each(function(){
        if($(this).attr("class") == "secondary-nav__item secondary-nav__item--has-children"){
            $(this).attr("class","secondary-nav__item secondary-nav__item");
        }
        $(this).children().each(function(i,v){
            if($(v).attr("title") == "Acerca de adaptativamente"){        
                $(v).attr("href","acerca-de.html")    
                $(v).next().remove();
            }if($(v).attr("title") == "Ayuda"){
                //$(v).attr("href","ayuda.html") 
                $(v).next().remove();
                $(v).remove();
            }if($(v).attr("title") == "Contacto"){
                //$(v).attr("href","contanto.html") 
                $(v).next().remove();
                $(v).remove();
            }
        });
    });
     
    
    //FOOTER
    $(".island").children().each(function(){
        if($(this).attr("title") == "Contáctanos"){
           // $(this).attr("href","contacto.html");
           $(this).attr("onClick","abreModulo()");
            
        }
    });
    $(".footer-nav-holder").children().each(function(ii,vv){
        if(ii == 0){
            $(this).children().each(function(ind,val){
                if($(val).attr("titl") == "Ver página de inicio"){        
                    $(val).attr("href","index.html")    

                }if($(val).attr("titlr") == "Ver sección"){//para ocultar más espesifico usar .text del elemento <a>
                    $(val).remove();
                }
            });
        }else{
               $(this).children().each(function(iii,vvv){
                if($(vvv).text() == "Acerca de adaptativamente"){
                    $(vvv).attr("href","acerca-de.html")   
                }else{
                   $(vvv).remove(); 
                }
            });         
        } 
    });
   


    /*-----------------------------------------Funciones de bloques-----------------------------------------*/

            /*document.addEventListener('contextmenu', event => event.preventDefault()); //Prevenir click derecho

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
        
            });*/

    /*-----------------------------------------Fin funciones de bloqueos-----------------------------------------*/