


window.customElements.define('dg-left-sidernav',class dgNavDrawer extends HTMLElement{

    constructor(){super();}
    
    connectedCallback(){
    let dgNavDrawer = this;
    
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



       function doc_start(){
        dgNavDrawer.style.opacity = 1;
       x = ( event.touches[0].pageX - dgNavDrawer.getBoundingClientRect().left );
       x2 = ( event.touches[0].pageX);
       dgNavDrawer.style.transition = "ease 0s";
       if(dgNavDrawer.getBoundingClientRect().left < -(dgNavDrawer.getBoundingClientRect().width / 2)){
       this.state = "close" 
       }else{
        this.state = "open" 
       }
       }

       function doc_move(){
       
        dgNavDrawer.style.transition = "ease 0s"
        let slider_value = (event.touches[0].pageX - x);
        dgNavDrawer.style.left = (Math.min(Math.max(slider_value,-dgNavDrawer.getBoundingClientRect().width),0))+'px';
    
       let speed = (Math.sqrt(Math.abs(event.touches[0].pageX - (this.speeding==undefined?0:this.speeding))) / 50 * 100);

       //let dir = event.touches[0].pageX - (this.speeding==undefined?0:this.speeding);

       this.direction = event.touches[0].pageX - x2;
        this.speed = speed;



       }

       function doc_end(){



        dgNavDrawer.style.transition = "ease 1s";

        console.log(this.direction );

        if(this.speed > 20 && this.state == "close" && this.direction >= 70){
          dgNavDrawer.style.left = "0px";
        }
        else if(this.speed > 20 && this.state == "open" && this.direction <= -70){
          dgNavDrawer.style.left = -dgNavDrawer.getBoundingClientRect().width+"px";
        dgNavDrawer.style.opacity = 0;

        }
       else if(dgNavDrawer.getBoundingClientRect().left < -(dgNavDrawer.getBoundingClientRect().width/2 )){
        dgNavDrawer.style.left = -dgNavDrawer.getBoundingClientRect().width+"px";
        dgNavDrawer.style.opacity = 0;

       }else{
        dgNavDrawer.style.left = "0px";
       }
       }

       dgNavDrawer.addEventListener("transitionend",function(){
        dgNavDrawer.style.transition = "ease 0s";
       })

       

        



})

  }

});