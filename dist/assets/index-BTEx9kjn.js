(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function m(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(t){if(t.ep)return;t.ep=!0;const s=m(t);fetch(t.href,s)}})();document.addEventListener("DOMContentLoaded",function(){let l=new IntersectionObserver(e=>{e.forEach(r=>{r.isIntersecting&&(r.target.classList.add("vanishIn"),l.unobserve(r.target))})});const a=document.querySelector(".nombre"),m=document.querySelector(".bienve");l.observe(a),l.observe(m);let c=new IntersectionObserver(e=>{e.forEach(r=>{r.isIntersecting&&(r.target.classList.add("magictime","boingInUp"),c.unobserve(r.target))})});const t=document.querySelector(".stacks"),s=document.querySelector(".proyects");c.observe(t),c.observe(s);let i=document.querySelector(".python"),u=document.querySelectorAll("div.proyectos_py div"),n=document.querySelector(".front"),p=document.querySelectorAll(".proyectos_front div"),d=document.querySelector(".csharp"),f=document.querySelectorAll(".proyectos_csharp div"),v=document.querySelectorAll("section.proyects > div > div");console.log(u),i.addEventListener("click",()=>{if(i.classList.contains("activo"))for(let e of u)e.classList.remove("activo"),i.classList.remove("activo"),e.classList.remove("magictime","slideRightReturn");else{for(let e of v)e.classList.remove("activo"),e.previousElementSibling.classList.remove("activo"),e.classList.remove("magictime","slideRightReturn");for(let e of u)e.classList.add("activo"),i.classList.add("activo"),e.classList.add("magictime","slideRightReturn")}}),n.addEventListener("click",()=>{if(n.classList.contains("activo"))for(let e of p)e.classList.remove("activo"),n.classList.remove("activo"),e.classList.remove("magictime","slideRightReturn");else{for(let e of v)e.classList.remove("activo"),e.previousElementSibling.classList.remove("activo"),e.classList.remove("magictime","slideRightReturn");for(let e of p)e.classList.add("activo"),n.classList.add("activo"),e.classList.add("magictime","slideRightReturn")}}),d.addEventListener("click",()=>{if(d.classList.contains("activo"))for(let e of f)e.classList.remove("activo"),d.classList.remove("activo"),e.classList.remove("magictime","slideRightReturn");else{for(let e of v)e.classList.remove("activo"),e.previousElementSibling.classList.remove("activo"),e.classList.remove("magictime","slideRightReturn");for(let e of f)e.classList.add("activo"),d.classList.add("activo"),e.classList.add("magictime","slideRightReturn")}});let L=document.querySelectorAll("section.proyects a.button"),o=document.getElementsByTagName("iframe")[0];for(let e of L)e.addEventListener("click",()=>{e.classList.contains("proyect1")?(o.setAttribute("src","https://www.youtube.com/embed/Czslt99HBAM"),o.setAttribute("title","Actualizador de stock con IA")):e.classList.contains("proyect2")?(o.setAttribute("src","https://www.youtube.com/embed/Umkxs6lyWyI"),o.setAttribute("title","Web Revepetrol")):e.classList.contains("proyect3")?(o.setAttribute("src","https://www.youtube.com/embed/wawBuEAVxsA"),o.setAttribute("title","Semana Santa Níjar 2024")):e.classList.contains("proyect4")?(o.setAttribute("src","https://www.youtube.com/embed/VnakiVZxc8w"),o.setAttribute("title","Calculadora Iphone")):e.classList.contains("proyect5")&&(o.setAttribute("src","https://www.youtube.com/embed/1zs5WpNc-Io"),o.setAttribute("title","App asistencia del personal de una empresa"))})});