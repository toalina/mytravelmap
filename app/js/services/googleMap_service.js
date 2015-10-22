module.exports = function(app) {
  app.factory('Gservice', ['$rootScope','$http', function($rootScope, $http){
    var Gservice = function(locations){
      this.markers = [];
      this.temp;
      this.image = {};
      var initLatLng = {lat: 39.0997265, lng: -94.5785667};

      var styles = [
      {"featureType":"road","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#FFFAF0"}]},{"featureType":"water","stylers":[{"color":"#d9edf7"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"lightness":40}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"visibility":"on","color":"#c5dac6"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#CCAA88"},{"lightness":40}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#EEEEEE"}]},{"featureType":"road","stylers":[{"visibility":"simplified"},{"color":"#FF0000"},{"gamma":9}]},{"featureType":"road.highway","stylers":[{"visibility":"on"},{"color":"#FF0000"},{"gamma":8}]},{"featureType":"road.highway.controlled_access","stylers":[{"visibility":"on"},{"color":"#FF0000"},{"gamma":4}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.government","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#DDDDDD"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#CCCCCC"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#AAAAAA"},{"gamma":4}]}
      ];

      var styledMap = new google.maps.StyledMapType(styles, {named: 'Styled Map'});

      var mapOptions = {
        zoom: 4,
        center: initLatLng,
        mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        }
      };

      this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

      this.map.mapTypes.set('map_style', styledMap);
      this.map.setMapTypeId('map_style');

    };
    Gservice.prototype.initMap = function(locations) {
      for(var i =0; i < locations.length; i++) {
        this.setMarker(locations[i]);
      }
       google.maps.event.addListener(this.map, 'click', function(e){
        var geocoder = new google.maps.Geocoder;
        var infoWindow = new google.maps.InfoWindow;
        this.tempLat = e.latLng.lat();
        this.tempLng = e.latLng.lng();
        var locationData = {lat: this.tempLat, lng: this.tempLng};
        $rootScope.$emit('geocodeLatLng', geocoder, locationData);
       });
    };

    Gservice.prototype.markerImage = function(type) {
      console.log('markerImage: ' + type);

      if(type === 'future') {
        this.image = 'imgs/future.png';
      }
      else if(type === 'past') {
        this.image = 'imgs/past.png';
      }
    };

    Gservice.prototype.setMarker = function(location) {
      var infoWindow = new google.maps.InfoWindow();
      this.markerImage(location.type);
      var marker = new google.maps.Marker({
          map: this.map,
          position: new google.maps.LatLng(location.lat, location.lng),
          title: location.name,
          icon: this.image
          });
      marker.content = '<ul class="article-links infoWindow"><li><a href="#/summary" class="btn-xsmall">Summary</a></li><li><a href="#/delete" class="btn-xsmall">Delete</a></li></ul>';

      marker.addListener('click', function(){
        $rootScope.anchor = location.name;
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
