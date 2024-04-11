document.addEventListener("DOMContentLoaded", function() {

    //ANIMACIÓN NOMBRE
    let observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          
          entry.target.classList.add('vanishIn');
          observer.unobserve(entry.target); // Opcional: dejar de observar una vez animado
        }
      });
    });
  
    const animatedParagraph = document.querySelector(".nombre");
    const animatedParagraph2 = document.querySelector(".bienve");
    observer.observe(animatedParagraph);
    observer.observe(animatedParagraph2);
    // ANIMACIÓN SECCIONES
    let observer2 = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          
          entry.target.classList.add('magictime','boingInUp');
          observer2.unobserve(entry.target); // Opcional: dejar de observar una vez animado
        }
      });
    });
  
    const animatedParagraph3 = document.querySelector(".stacks");
    const animatedParagraph4 = document.querySelector(".proyects");
    observer2.observe(animatedParagraph3);
    observer2.observe(animatedParagraph4);

    // APERTURA Y CIERRE DE DIV PROYECTOS
    let imagen_python = document.querySelector(".python");
    let divs_py = document. querySelectorAll("div.proyectos_py div");
    let imagen_front = document.querySelector(".front");
    let divs_front = document.querySelectorAll(".proyectos_front div");
    let imagen_csharp  = document.querySelector(".csharp");
    let divs_csharp= document.querySelectorAll(".proyectos_csharp div");
    let todos_proyects = document.querySelectorAll("section.proyects > div > div");
    console.log(divs_py);


    imagen_python.addEventListener("click",()=>{
      if(!imagen_python.classList.contains("activo")){
        for(let pro of todos_proyects){
        pro.classList.remove("activo");
        pro.previousElementSibling.classList.remove("activo");
        pro.classList.remove('magictime', 'slideRightReturn');
        }
        for(let pro of divs_py){
          pro.classList.add("activo");
          imagen_python.classList.add("activo");
          pro.classList.add('magictime', 'slideRightReturn');
        }
      }
      else{
        for(let pro of divs_py){
          pro.classList.remove("activo");
          imagen_python.classList.remove("activo");
          pro.classList.remove('magictime', 'slideRightReturn');
        }
      }
  
    });

    imagen_front.addEventListener("click",() =>{
      
      if(!imagen_front.classList.contains("activo")){
        for(let pro of todos_proyects){
        pro.classList.remove("activo")
        pro.previousElementSibling.classList.remove("activo");
        pro.classList.remove('magictime', 'slideRightReturn')
        }
        for(let pro of divs_front){
          pro.classList.add("activo")
          imagen_front.classList.add("activo");
          pro.classList.add('magictime', 'slideRightReturn');
        }
      }
      else{
        for(let pro of divs_front){
          pro.classList.remove("activo");
          imagen_front.classList.remove("activo");
          pro.classList.remove('magictime', 'slideRightReturn')
        }
        
      }

    });
    
    imagen_csharp.addEventListener("click",() =>{
      if(!imagen_csharp.classList.contains("activo")){
        for(let pro of todos_proyects){
        pro.classList.remove("activo");
        pro.previousElementSibling.classList.remove("activo");
        pro.classList.remove('magictime', 'slideRightReturn')
        }
        for(let pro of divs_csharp){
          pro.classList.add("activo");
          imagen_csharp.classList.add("activo");
          pro.classList.add('magictime', 'slideRightReturn');
        }
      }
      else{
        for(let pro of divs_csharp){
          pro.classList.remove("activo");
          imagen_csharp.classList.remove("activo");
          pro.classList.remove('magictime', 'slideRightReturn')
        }
      }
    });

    let botones_proyectos = document.querySelectorAll("section.proyects a.button");
    let iframe = document.getElementsByTagName("iframe")[0];
    for (let boton of botones_proyectos){
      
      boton.addEventListener("click",()=>{
        if(boton.classList.contains("proyect1")){
          iframe.setAttribute("src","https://www.youtube.com/embed/Czslt99HBAM");
          iframe.setAttribute("title","Actualizador de stock con IA");
        }
        else if(boton.classList.contains("proyect2")){
          iframe.setAttribute("src","https://www.youtube.com/embed/Umkxs6lyWyI");
          iframe.setAttribute("title","Web Revepetrol");
        }
        else if(boton.classList.contains("proyect3")){
          iframe.setAttribute("src","https://www.youtube.com/embed/wawBuEAVxsA");
          iframe.setAttribute("title","Semana Santa Níjar 2024");
        }
        else if(boton.classList.contains("proyect4")){
          iframe.setAttribute("src","https://www.youtube.com/embed/VnakiVZxc8w");
          iframe.setAttribute("title","Calculadora Iphone");
        }
        else if(boton.classList.contains("proyect5")){
          iframe.setAttribute("src","https://www.youtube.com/embed/1zs5WpNc-Io");
          iframe.setAttribute("title","App asistencia del personal de una empresa");
        }
      })
    }
    
  });
  
