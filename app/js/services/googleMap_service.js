module.exports = function(app) {
  app.factory('Gservice', ['$http', function($http){
    var Gservice = function(locations){
      var markers = [];
      var initLatLng = {lat: locations[0].lat, lng: locations[0].lng};
      var map = new google.maps.Map(document.getElementById('map'), { zoom: 4, center: initLatLng});
    };
    Gservice.prototype.initMap = function(locations) {
      for(var i =0; i < locations.length; i++) {
      setMarker(locations[i], map);
      }
      google.maps.event.addListener(map, 'click', function(event){
        setMarker(event.latLng);
      });
    };
    Gservice.prototype.setMarker = function(location) {
      var infoWindow = new google.maps.InfoWindow();
      var marker = new google.maps.Marker({
          map: this.map,
          position: new google.maps.LatLng(location.lat, location.lng),
          title: location.name,
          });
      marker.content = '<div class="infoWindowContent">' + location.memo + '</div>';
      marker.addListener('click', function(){
        infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
        infoWindow.open(map, marker);
      });
      markers.push(marker);
    }; 
  }]);
};
