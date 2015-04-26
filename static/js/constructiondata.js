function requestConstructionUpdate(layerGroup, map) {
  console.log("That's right, Bob, I'm here in the const update function.")
  
  var constructionIcon = L.icon({
      iconUrl: '../static/img/construction.png',
      iconSize: [30, 30],
      iconAnchor: [10, 0]
    });

  //var data = JSON.parse("../static/data/sdot-sidewalk-closure.json");
 // $.getJSON( "../static/data/sdot-sidewalk-closure.json", function( data ) {
  //  console.log("Regarding Construction Data, the foreman had this to say: " + data);
 // });

  

  //var hr = new XMLHttpRequest();
  //hr.open("GET", '{{ url_for("static", filename="data/sdot-sidewalk-closure.json") }}', true);
  //hr.setRequestHeader("Content-type", "application/json", true);
  //console.log("The HR request thing has been sent")
  //console.log("Here's what I'm getting from HR: " + hr);
  //hr.onreadystatechange = function() {
    //console.log("There's been some movement on the ground. The ready state has changed.")
    //if (hr.readyState == 4 && hr.status == 200){
      //console.log("Ready states are as they should be")
      //var data = JSON.parse(hr.responseText);
     // console.log("Let's see that again parsed as a JSON: " + data);
      //for (var obj in data){

        //console.log("data[obj]");
      //}
    //}
  //}

   function drawSidewalkClosures(data) {

    
     console.log("Things are getting exciting around here, Bob.  They just called for the metadata!");


     
    /* var bool = false;
     for (var obj in dataset.data){
      console.log("I seem to be in some kind of vortex, Bob.");
      if (!bool){
        console.log("Here comes an object now, Bob: " + JSON.stringify(JSON.parse(obj)));
        var testyMcGee = obj[0];
        var cuz = testyMcGee[0];
        console.log("Let's hear what it has to tell us.  Testy? " + JSON.stringify(testyMcGee));
        console.log("That was Testy McGee, folks.  Let's see if he has anything else for us: " + JSON.stringify(testyMcGee[0]));
        console.log("Let's hear what it's cuz has to tell us.  Cuz? " + JSON.stringify(cuz));
        console.log("Anything else you'd like to add? " + JSON.stringify(cuz[0]));

        bool = true;
      } else {
        break;
      }
     }*/

    //for (i = 0; i < data.length; i++) {
    layerGroup.clearLayers();
    var bounds = map.getBounds();
    //console.log("These are the bounds: " + bounds.toBBoxString());
    //console.log("Data.length seems to be " + data.data.length);
    
    for (i = 0; i < data.data.length; i++) {
      /*var permit = JSON.stringify(data.data[i]);
      var thing = permit[0];
      console.log("permit: " + permit);
      console.log("thing: " + thing);*/
      var permit = data.data[i];
      var shapeArray = permit[9];
      //var latlng = [shapeArray[1], shapeArray[2]];
      var latlng = L.latLng(shapeArray[1], shapeArray[2]);
//      console.log("permit: " + permit);
//      console.log("shape array: " + shapeArray);
     // console.log("Latlng: " + latlng);
      
      var boolz = bounds.contains(latlng);
      //console.log("We're receiving word from Boolz right now.  Boolz? " + boolz);
       if (boolz) {
        //console.log("That confirms what boolz told us earlier.");
        var description = permit[24];

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


         //marker = L.geoJson(geoJSON, {
          //   pointToLayer: function(feature, latlng) {
         
           //    return L.marker(latlng, {icon: constructionIcon});
           //  }
//           });


      //     //Display info when user clicks on the curb marker
      //     var popup = L.popup().setContent("<b>Construction</b>");
      //     marker.bindPopup(popup);

      //   layerGroup.addLayer(marker);
      }
    }

    console.log("Whshew.  Made it out of that one okay.  I'll see you back in the studio.");
  }
   

 $.when(constructionDataRequest).done(function(data) {
   drawSidewalkClosures(data);
 });
}