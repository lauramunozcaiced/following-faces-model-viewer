(() => {
    const modelViewer = document.querySelector('#orbit-demo');
    //Orbit to Initialize
    var orbitCycle = [
    '0deg 90deg 2m',    
  ];
    $(document).mousemove(function(event){
        var modelRealCoordenates = changePivotModel(document.getElementById('orbit-demo'));

        var Xpoint = event.pageX -  modelRealCoordenates.realX;
        var Ypoint = (event.pageY - (modelRealCoordenates.realY))*-1;
   
        var AngleX = ((radians_to_degrees(Math.atan(Xpoint/20)))/3)*-1;
        var AngleY;
        var PreAngleY= radians_to_degrees(Math.atan(Ypoint/20)) +90 ;
        
        if(PreAngleY >= 90){
            AngleY = (Math.cos(convert(PreAngleY))*70)+PreAngleY;
        }
        else{
            AngleY = (Math.cos(convert(PreAngleY))*60)+PreAngleY;
        }
        orbitCycle = [
        ''+AngleX+'deg '+AngleY+'deg 2.5m'
        ];
        });
        
  setInterval(() => {
    const currentOrbitIndex = orbitCycle.indexOf(modelViewer.cameraOrbit);
    modelViewer.cameraOrbit =
        orbitCycle[(currentOrbitIndex + 1) % orbitCycle.length];
  }, 100);

})();
//Calculos empiricos Width: ((($(document).width())/2) + (($(document).width())/5))

/* Esto calcula la posición del modelo en el eje de coordenadas que 
yo defino y ubica el pivote en el centro del modelo:*/
function changePivotModel(element){
  var widthModel = element.offsetWidth;
  var heightModel = element.offsetWidth;
  var rect = element.getBoundingClientRect();
  var model = {};
  model.realX = rect.x + (widthModel/2);
  model.realY = rect.y + (heightModel/2);

  return model;
}

function radians_to_degrees(radians)
{
  var pi = Math.PI;
  return radians * (180/pi);
}

function convert(angle){
    return angle * Math.PI * 2 / 360;
}