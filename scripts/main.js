
$("document").ready(function(){
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
   

});