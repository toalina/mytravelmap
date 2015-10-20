module.exports = function(app) {
  app.factory('Gservice', ['$http', function($http){
    var Gservice = function(locations){
      this.markers = [];
      var initLatLng = {lat: 39.0997265, lng: -94.5785667};
      this.map = new google.maps.Map(document.getElementById('map'), { zoom: 4, center: initLatLng});
    };
    Gservice.prototype.initMap = function(locations) {
      console.log(locations);
      for(var i =0; i < locations.length; i++) {
        this.setMarker(locations[i]);
      }
   
      google.maps.event.addListener(this.map, 'click', function(event){
        //this.addMarker(event.latLng); -> need to create
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
        infoWindow.open(this.map, marker);
      });
      this.markers.push(marker);
    }; 

    return function(locations) {
      return new Gservice(locations);
    };
  }]);
};
