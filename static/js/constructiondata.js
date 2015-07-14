function requestConstructionUpdate(layerGroup, map) {
  var constructionIcon = L.icon({
      iconUrl: '../static/img/construction.png',
      iconSize: [30, 30],
      iconAnchor: [10, 0]
    });


<<<<<<< HEAD


   function drawSidewalkClosures(data) {
    layerGroup.clearLayers();
    var bounds = map.getBounds();

    for (i = 0; i < data.data.length; i++) {
      var permit = data.data[i];
      var shapeArray = permit[9];
      var latlng = L.latLng(shapeArray[1], shapeArray[2]);

      var boolz = bounds.contains(latlng);
       if (boolz) {
        var description = permit['description'];

        if (description != null && description.indexOf("SIDEWALK") > -1 &&
          description.indexOf("NO MOBILITY IMPACT") < 0){
          marker = L.marker(latlng, {icon: constructionIcon});
          var popup = L.popup().setContent("<b>Sidewalk May Be Closed</b><br>Address: " + permit[20] + "<br>Details: " + permit[24] + "<br>");
          if (permit[24] != null){
            console.log(permit[24]);
          }
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
