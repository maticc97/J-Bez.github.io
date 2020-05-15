/**var buttonX = document.getElementById("rotateX");
alert(buttonX);
buttonX.addEventListener('touchstart',rotateX,false);
*/
function openNav() {
  document.getElementById("overlay").style.display = "block";
}

function closeNav() {
    document.getElementById("overlay").style.display = "none";
}

function startAnimation() {
  let model = document.getElementById("model");
  let secModel = document.getElementById("secModel");
  if (this.model) {
    this.model.setAttribute('position', "100 0 0");
    this.secModel.removeAttribute('position');
    this.secModel.setAttribute('animation-mixer', {loop: "once"});
    setTimeout(function(){
      this.secModel.removeAttribute('animation-mixer');
      this.secModel.setAttribute('position', "100 0 0");
      this.model.removeAttribute('position');
    }, 5000);
  }
  
}

function rotateX(){
      let model = document.getElementById("model");
      let secModel = document.getElementById("secModel");
      let a = this.model.getAttribute('rotation');
      model.setAttribute('rotation', {x: a.x+5, y: a.y, z: a.z});
    
}

function rotateY(){
    let model = document.getElementById("model");
  let secModel = document.getElementById("secModel");
  
  let a = this.model.getAttribute('rotation');
  model.setAttribute('rotation', {x: a.x, y: a.y+5, z: a.z});
}

function rotateZ(){
    let model = document.getElementById("model");
  let secModel = document.getElementById("secModel");
  
  let a = this.model.getAttribute('rotation');
  model.setAttribute('rotation', {x: a.x, y: a.y, z: a.z+5});
}

AFRAME.registerComponent('drag-rotate-component',{
      schema : { speed : {default:1}},
      init : function(){
        this.ifMouseDown = false;
        this.x_cord = 0;
        this.y_cord = 0;
        document.addEventListener('touchstart',this.OnDocumentMouseDown.bind(this));
        document.addEventListener('touchend',this.OnDocumentMouseUp.bind(this));
        document.addEventListener('touchmove',this.OnDocumentMouseMove.bind(this));
      },
      OnDocumentMouseDown : function(event){
        this.ifMouseDown = true;
        this.x_cord = event.touches[0].pageX;
        this.y_cord = event.touches[0].pageY;
      },
      OnDocumentMouseUp : function(){
        
        this.ifMouseDown = false;
        
      },
      OnDocumentMouseMove : function(event)
      {
        if(this.ifMouseDown)
        {
    
          var temp_x = event.touches[0].pageX-this.x_cord;
          var temp_y = event.touches[0].pageY-this.y_cord;
          if(Math.abs(temp_y)<Math.abs(temp_x))
          {
            this.el.object3D.rotateY(temp_x*this.data.speed/100);
      
          }
          else
          {
            this.el.object3D.rotateX(temp_y*this.data.speed/100);
          }
          this.x_cord = event.touches[0].pageX;
          this.y_cord = event.touches[0].pageY;
        }
      }
    });


AFRAME.registerComponent('resize',{
      schema : { speed : {default:1}},
      init : function(){
        document.addEventListener('touchstart',this.OnDocumentMouseDown.bind(this));
      },
      OnDocumentMouseDown : function(event){
        let a = this.el.getAttribute('scale');
        this.el.setAttribute('scale',{x: a.x*1.1 ,y: a.y*1.1 ,z: a.z*1.1});
      }
      
    });
