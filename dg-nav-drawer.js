


window.customElements.define('dg-left-sidernav',class dgNavDrawer extends HTMLElement{

    constructor(){super();}
    
    connectedCallback(){
    let dgNavDrawer = this;
     dgNavDrawer.state = "close"
    dgNavDrawer.style.zIndex = "calc(1000 * 1000 + 1)";


    dgNavDrawer.back = document.createElement("div");
    let back = dgNavDrawer.back;

   

    back.style.width = "100%";
    back.style.height = "100%";
    back.style.display = "none";
    back.style.zIndex = "calc(1000 * 1000)";
    back.style.position = "absolute";
    back.style.top = "0px";back.style.left = "0px";
    back.style.background = "#0005";
    back.style.opacity = "0";

    back.addEventListener("click",function(){
     dgNavDrawer.toggle();
    },false)
    
    dgNavDrawer.parentElement.appendChild(back);

    setTimeout(() => {
  
       document.querySelector("body").style.overflow = "hidden";
       document.querySelector("body").style.width = "100%";
       document.querySelector("body").style.height = "100%";
       document.querySelector("html").style.overflow = "hidden";
       document.querySelector("html").style.width = "100%";
       document.querySelector("html").style.height = "100%";
        
        let side = dgNavDrawer.getAttribute("side");
        
        let navWidth = window.getComputedStyle(dgNavDrawer).getPropertyValue("width");
        let navHeight = window.getComputedStyle(dgNavDrawer).getPropertyValue("height");
    
        let width = (navWidth == "auto" && navWidth == "")?"100%":navWidth;
        let height = (navHeight == "auto" && navHeight == "")?"100%":navHeight;
    
       dgNavDrawer.style.width = width;
       dgNavDrawer.style.height = height;
       dgNavDrawer.style.display = 'block';
       dgNavDrawer.style.top = '0px';
       dgNavDrawer.style.left = -dgNavDrawer.getBoundingClientRect().width + 'px';
       dgNavDrawer.style.position = 'absolute';
       dgNavDrawer.style.transition = "ease 0s"



       document.addEventListener("touchstart",doc_start);
       document.addEventListener("touchmove",doc_move);
       document.addEventListener("touchend",doc_end);

       let x = 0; 
       let x2 = 0; 

       dgNavDrawer.toogle = false;

       function doc_start(){

        if(dgNavDrawer.getBoundingClientRect().left < -(dgNavDrawer.getBoundingClientRect().width / 2)){
       dgNavDrawer.state = "close" 
       }else{
        dgNavDrawer.state = "open" 
       }

        if(dgNavDrawer.toogle == true){
          dgNavDrawer.toogle = false;
          return;
        }
        if(dgNavDrawer.toogle == false){
        dgNavDrawer.back.style.transition = "ease 0s";
        dgNavDrawer.style.opacity = 1;
       x = ( event.touches[0].pageX - dgNavDrawer.getBoundingClientRect().left );
       x2 = ( event.touches[0].pageX);
       dgNavDrawer.style.transition = "ease 0s";
       
       if(event.touches[0].pageX <= 10){
        dgNavDrawer.enabled = true;
        }else{
          dgNavDrawer.enabled = false;
        }
       }
      }

       function doc_move(){
        if(dgNavDrawer.toogle == false){
        if(!dgNavDrawer.enabled && dgNavDrawer.state == "close") return;
        dgNavDrawer.back.style.display = "block";
        dgNavDrawer.style.transition = "ease 0s"
        let slider_value = (event.touches[0].pageX - x);
        
       let speed = (Math.sqrt(Math.abs(event.touches[0].pageX - (dgNavDrawer.speeding==undefined?0:dgNavDrawer.speeding))) / 50 * 100);

       //let dir = event.touches[0].pageX - (dgNavDrawer.speeding==undefined?0:dgNavDrawer.speeding);

       dgNavDrawer.direction = event.touches[0].pageX - x2;
        dgNavDrawer.speed = speed;
        
        if(Math.abs(dgNavDrawer.direction) > 40 && dgNavDrawer.state == "open"){
        dgNavDrawer.style.left = `calc(${(Math.min(Math.max(slider_value,-dgNavDrawer.getBoundingClientRect().width),-40))}px + 40px)`;
         }
         else if(dgNavDrawer.state == "close"){
          dgNavDrawer.style.left = `calc(${(Math.min(Math.max(slider_value,-dgNavDrawer.getBoundingClientRect().width),0))}px)`;
           }

           let level_opacity = ((1-Math.abs(dgNavDrawer.getBoundingClientRect().left) / dgNavDrawer.getBoundingClientRect().width * 1));
           dgNavDrawer.back.style.opacity = level_opacity

       }else{
        dgNavDrawer.back.style.display = "block";
       }
      }

       function doc_end(){
        if(dgNavDrawer.toogle == false){
        dgNavDrawer.style.transition = "ease 0.5s";
        dgNavDrawer.back.style.transition = "ease 0.5s";

        if(dgNavDrawer.speed > 12 && dgNavDrawer.state == "close" && dgNavDrawer.direction >= 30){
          dgNavDrawer.style.left = "0px"; 


         // dgNavDrawer.style.opacity = 1;
          dgNavDrawer.back.style.opacity = 1;
        }
        else if(dgNavDrawer.speed > 20 && dgNavDrawer.state == "open" && dgNavDrawer.direction <= -40){
          dgNavDrawer.style.left = -dgNavDrawer.getBoundingClientRect().width+"px";
         // dgNavDrawer.style.opacity = 0;
          dgNavDrawer.back.style.opacity = 0;
        }
       else if(dgNavDrawer.getBoundingClientRect().left < -(dgNavDrawer.getBoundingClientRect().width/2 )){
        dgNavDrawer.style.left = -dgNavDrawer.getBoundingClientRect().width+"px";
       // dgNavDrawer.style.opacity = 0;
        dgNavDrawer.back.style.opacity = 0;

       }else{
        dgNavDrawer.style.left = "0px";
       // dgNavDrawer.style.opacity = 1;
        dgNavDrawer.back.style.opacity = 1;

       }
      }
       }

       dgNavDrawer.addEventListener("transitionend",function(){
        dgNavDrawer.style.transition = "ease 0s";
       
       });
       dgNavDrawer.back.addEventListener("transitionend",function(){
        dgNavDrawer.back.style.transition = "ease 0s";
        if(eval(dgNavDrawer.back.style.opacity) == 0){
           dgNavDrawer.back.style.display = "none"; 
        }
       
      },false);



})

  }



toggle(){

  let dgNavDrawer = this;
   dgNavDrawer.back.style.display = "block";
   dgNavDrawer.back.style.opacity = "0";
setTimeout(() => {
   dgNavDrawer.toogle = true;

 
  dgNavDrawer.style.transition = "ease 0.5s";
  dgNavDrawer.back.style.transition = "ease 0.5s";
 
   
  if(dgNavDrawer.state == "open"){ 
    dgNavDrawer.style.left = -dgNavDrawer.getBoundingClientRect().width+"px";
    let level_opacity = 0
    dgNavDrawer.back.style.opacity = level_opacity;
    dgNavDrawer.state="close"  
  }
  else if(dgNavDrawer.state == "close"){
    
 
   
    setTimeout(() => {
         dgNavDrawer.style.left = "0px";
      let level_opacity = 1
    dgNavDrawer.back.style.opacity = level_opacity 
    },0);
    dgNavDrawer.state="open"
  }

   

 
  dgNavDrawer.back.addEventListener("transitionend",function(){
    dgNavDrawer.back.style.transition = "ease 0s";
    dgNavDrawer.toogle = false;
    if(eval(dgNavDrawer.back.style.opacity) == 0){
       dgNavDrawer.back.style.display = "none"; 
    }
});
 
  },1);



}


});
