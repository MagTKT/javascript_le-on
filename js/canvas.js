var canvas = {

  canvas_bloc : document.getElementById('canvas'),//premier canvas
  canvas_blank : document.getElementById('blank'),//deuxieme canvas
  canvas_efface : document.getElementById("effacer"),
  context: document.getElementById('canvas').getContext('2d'),
  radius : 1.5,
  dragging : false,

  //création du trait
  putPoint : function(e){
    if(canvas.dragging){
      canvas.context.lineTo(e.offsetX, e.offsetY);
      canvas.context.stroke();
      canvas.context.beginPath();
      canvas.context.arc(e.offsetX, e.offsetY, canvas.radius, 0, Math.PI*2);
      canvas.context.fill();
      canvas.context.beginPath();
      canvas.context.moveTo(e.offsetX, e.offsetY)
    }
  },

  //tant que le bouton de souris est appuyé tracer le trait
  engage : function(e){
    canvas.dragging = true;
    canvas.putPoint(e);
  },

  //Quand le bouton est laché arrêter le tracer
  disengage : function(){
    canvas.dragging = false;
    canvas.context.beginPath();
  },
    
  raze : function(){ //efface le dessin
    canvas.context.clearRect(0,0, 300, 200);
    canvas.canvas_efface = true;
  },
}

canvas.canvas_bloc.width = 200;
canvas.canvas_bloc.height = 70;

canvas.canvas_blank.width = 200;
canvas.canvas_blank.height = 70;

canvas.context.lineWidth = canvas.radius*2;

// Nos event sur ordinateur
canvas.canvas_bloc.addEventListener('mousedown', canvas.engage);
canvas.canvas_bloc.addEventListener('mousemove', canvas.putPoint);
canvas.canvas_bloc.addEventListener('mouseup', canvas.disengage);
canvas.canvas_efface.addEventListener('click',canvas.raze);

// Nos event sur mobile pour signer avec le doigt
canvas.canvas_bloc.addEventListener("touchstart", canvas.engage);
      
canvas.canvas_bloc.addEventListener("touchmove", function (e) {

  e.preventDefault();

  var touch = e.touches[0];
  var rect = document.getElementById("canvas").getBoundingClientRect();

  var x = touch.clientX - rect.left;
  var y = touch.clientY - rect.top;
  canvas.context.lineWidth = canvas.radius*2; // largeur de ligne

  if (canvas.dragging) {
    canvas.context.lineTo(x, y);
    canvas.context.stroke();
    canvas.context.beginPath();
    canvas.context.arc(x, y, canvas.radius, 0, Math.PI*2);
    canvas.context.fill();
    canvas.context.beginPath();
    canvas.context.moveTo(x, y);
  }

});
canvas.canvas_bloc.addEventListener("touchend", canvas.disengage);