function requestElevationsUpdate(layerGroup, map) {
  // Gradations
  var high = 0.05;
  var mid = 0.01;

  function drawElevations(data) {
    // TODO: turn this into map tiles for several zoom levels to speed
    // things up (slowness is due to drawing so many lines)
    layerGroup.clearLayers();
    var bounds = map.getBounds();
    for (i = 0; i < data.length; i++) {
      var geoJSON = data[i];
      var coords = geoJSON['coordinates'];
      var coord1 = [coords[0][1], coords[0][0]];
      var coord2 = [coords[1][1], coords[1][0]];
      if (bounds.contains(coord1) || bounds.contains(coord2)) {
        line = L.geoJson(geoJSON, {
          'style': function(feature) {
            if (feature.geometry.properties.grade > high) {
              return {'color': '#FF0000',
                      'weight': 5,
                      'opacity': 0.6};
            } else if (feature.geometry.properties.grade > mid) {
              return {'color': '#FFFF00',
                      'weight': 5,
                      'opacity': 0.6};
            } else {
              return {'color': '#00FF00',
                      'weight': 5,
                      'opacity': 0.6};
            }
          }
        });
        layerGroup.addLayer(line);
      }
    }
  }

$.when(elevationDataRequest).done(function(data) {
  drawElevations(data);
});
}
