function requestElevationsUpdate(layerGroup, map, api_url) {
  // Gradations
  var high = 0.0833;
  var mid = 0.05;

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
      var steepness = "Significant</b><br>(greater than 5% grade)";
      if (bounds.contains(coord1) || bounds.contains(coord2)) {
        line = L.geoJson(geoJSON, {
          'style': function(feature) {
            if (feature.geometry.properties.grade >= high) {
              return {'color': '#FF0000',
                      'weight': 5,
                      'opacity': 0.6};
            } else if (feature.geometry.properties.grade > mid) {
              steepness = "Moderate</b><br>(between 1% and 5% grade)";
              return {'color': '#FFFF00',
                      'weight': 5,
                      'opacity': 0.6};
            } else {
              steepness = "Negligible</b><br>(less than 1% grade)";
              return {'color': '#00FF00',
                      'weight': 5,
                      'opacity': 0.6};
            }
          }
        });

        //Display info when user clicks on the line
        var popup = L.popup().setContent("<b>Elevation Change is " + steepness);
        line.bindPopup(popup);

        layerGroup.addLayer(line);
      }
    }
  }

bounds = map.getBounds().toBBoxString();
// Request data
$.ajax({
  type: 'GET',
  url: api_url + '/sidewalks.json',
  data: {
    bbox: bounds
  },
  dataType: 'json',
  success: function(data) {
    drawElevations(data);
    layerGroup.bringToBack();
  }
});
}
