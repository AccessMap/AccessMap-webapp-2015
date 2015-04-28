function requestConstructionUpdate(layerGroup, map) {
  
  var constructionIcon = L.icon({
      iconUrl: '../static/img/construction.png',
      iconSize: [30, 30],
      iconAnchor: [10, 0]
    });


  function drawSidewalkClosures(data) {

    layerGroup.clearLayers();
    var bounds = map.getBounds();
    
    for (i = 0; i < data.length; i++) {
      var permit = data[i];
      var shapeArray = permit['lat_lng'];
      var latlng = L.latLng(shapeArray[0], shapeArray[1]);
      
      var boolz = bounds.contains(latlng);
       if (boolz) {
        var description = permit['description'];

        if (description != null && description.indexOf("SIDEWALK") > -1){
        
          marker = L.marker(latlng, {icon: constructionIcon});
          var popup = L.popup().setContent("<b>Sidewalk May Be Closed</b><br>Address: " 
            + permit['address'] + "<br>Details: " + permit['description'] + "<br>");
          
          
          marker.bindPopup(popup);

          layerGroup.addLayer(marker);

        }

      }
    }
  }
   

 $.when(constructionDataRequest).done(function(data) {
   drawSidewalkClosures(data);
 });
}

