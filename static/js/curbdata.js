function requestCurbsUpdate(layerGroup, map) {
  function drawCurbs(data) {
    // TODO: turn this into map tiles for several zoom levels to speed
    // things up (slowness is due to drawing so many lines)
    layerGroup.clearLayers();
    var bounds = map.getBounds();
    for (i = 0; i < data.length; i++) {
      var geoJSON = data[i];
      var coord = geoJSON['coordinates'];
      var latlng = [coord[1], coord[0]];
      if (bounds.contains(latlng)) {
        point = L.geoJson(geoJSON, {
          pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng, {
              'radius': 3,
              'color': '#0000FF'
            })
          }
        });
        layerGroup.addLayer(point);
      }
    }
  }

$.when(curbDataRequest).done(function(data) {
  drawCurbs(data);
});
}
